// Replaced by tools/build.js. All URLs resolve inside this app's own scope.
const VERSION='ed3b0fe701-web-41b9f83bc3';
const SHELL=["index.html","install.html","manifest.webmanifest","icon-192.png","icon-512.png","src/install.css","src/install.js","src/pwa-client.js","assets/fonts/outfit.woff2","version.json"];
const ART=["assets/rush/car-sprites.webp","assets/rush/charles-cameo-atlas-v1.png","assets/rush/fans.webp","assets/rush/gmk-garage.jpg","assets/rush/gmk-identity-atlas-v2.png","assets/rush/gmk-photo-2.webp","assets/rush/gmk-photo.webp","assets/rush/gmk-reference-atlas.png","assets/rush/gmk-sprites.webp","assets/rush/gmk-verified-master-v5.png","assets/rush/monaco-casino-pixel-v1.png","assets/rush/monaco-casino.webp","assets/rush/monaco-corniche-pixel-v1.png","assets/rush/monaco-cover.webp","assets/rush/monaco-garage-pixel-v1.png","assets/rush/monaco-grand-prix-preview-v1.png","assets/rush/monaco-harbor.webp","assets/rush/monaco-harbour-pixel-v1.png","assets/rush/monaco-marina-map-pixel-v1.png","assets/rush/monaco-night-pixel-v1.png","assets/rush/monaco-parking-pixel-v1.png","assets/rush/monaco-rocher-pixel-v1.png","assets/rush/monaco-tunnel-pixel-v1.png","assets/rush/npc-friends-pixel-v2.png","assets/rush/npc-rivals-pixel-v2.png","assets/rush/pixel-cars/gmk-sideview-atlas-v2.png","assets/rush/pixel-cars/gmk-topdown-atlas-v1.png"];
const BASE=self.registration.scope;
const PREFIX='gmk-app:'+BASE+':';
const CACHE=PREFIX+VERSION;
const url=path=>new URL(path,BASE).href;
const ALL=[...new Set([...SHELL,...ART].map(url))];
const known=new Set(ALL);
let downloadTask=null;
async function storeFile(cache,address){
 if(await cache.match(address))return;
 const response=await fetch(new Request(address,{cache:'reload'}));
 if(!response.ok||response.type==='opaque')throw new Error('Téléchargement interrompu. Réessaie avec une connexion.');
 await cache.put(address,response);
}
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(CACHE);
 for(const file of SHELL)await storeFile(cache,url(file));
 // Updates wait for an explicit user action. Never reload a running game.
})()));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
async function status(){const cache=await caches.open(CACHE),present=await Promise.all(ALL.map(address=>cache.match(address)));return{version:VERSION,completed:present.filter(Boolean).length,total:ALL.length,offlineReady:present.every(Boolean)};}
async function download(notify){
 if(downloadTask)return downloadTask;
 downloadTask=(async()=>{const cache=await caches.open(CACHE);let cursor=0;let completed=(await status()).completed;
 notify({type:'progress',completed,total:ALL.length});
 const outcomes=await Promise.allSettled(Array.from({length:3},async()=>{while(cursor<ALL.length){const address=ALL[cursor++];if(!(await cache.match(address))){await storeFile(cache,address);completed++;notify({type:'progress',completed,total:ALL.length});}}}));
 const failed=outcomes.find(result=>result.status==='rejected');if(failed)throw failed.reason;const result=await status();if(!result.offlineReady)throw new Error('Le téléchargement est incomplet. Réessaie.');return result;
 })().finally(()=>{downloadTask=null;});return downloadTask;
}
self.addEventListener('message',event=>{
 if(event.data?.type==='SKIP_WAITING'){event.waitUntil(self.skipWaiting());return;}
 const port=event.ports?.[0];if(!port)return;
 const reply=value=>port.postMessage(value);
 if(event.data?.type==='OFFLINE_STATUS')event.waitUntil(status().then(value=>reply({type:'done',...value})).catch(()=>reply({type:'error',error:'Le stockage hors connexion est indisponible.'})));
 if(event.data?.type==='CLEAN_OLD')event.waitUntil((async()=>{const windows=(await self.clients.matchAll({type:'window'})).filter(client=>client.url.startsWith(BASE));if(windows.length<=1&&(await status()).offlineReady){for(const name of await caches.keys())if(name.startsWith(PREFIX)&&name!==CACHE)await caches.delete(name);}reply({type:'done'});})());
 if(event.data?.type==='OFFLINE_DOWNLOAD')event.waitUntil(download(reply).then(value=>reply({type:'done',...value})).catch(error=>reply({type:'error',error:error.message||'Téléchargement interrompu.'})));
});
self.addEventListener('fetch',event=>{
 const request=event.request,address=new URL(request.url);if(request.method!=='GET'||address.origin!==self.location.origin||!request.url.startsWith(BASE))return;
 const clean=address.origin+address.pathname;
 if(request.mode==='navigate'){
  const file=/\/install(?:\.html)?\/?$/.test(address.pathname)?'install.html':'index.html';
  event.respondWith(caches.open(CACHE).then(async cache=>(await cache.match(url(file)))||fetch(request)));return;
 }
 if(!known.has(clean))return;
 event.respondWith(caches.open(CACHE).then(async cache=>{const cached=await cache.match(clean);if(cached)return cached;const response=await fetch(request);if(response.ok){const copy=response.clone();event.waitUntil(cache.put(clean,copy).catch(()=>{}));}return response;}));
});
