// Browser-owned installation. No prompt, download or tracking runs on arrival.
(() => {
  'use strict';
  const byId=id=>document.getElementById(id),button=byId('install-button'),guideLink=byId('install-guide-link'),stateBox=byId('install-state'),stateLabel=byId('install-state-label'),status=byId('install-status'),note=byId('browser-note');
  if(!button||!status)return;
  const media=['standalone','minimal-ui','window-controls-overlay'].map(mode=>matchMedia('(display-mode: '+mode+')'));
  const standalone=()=>navigator.standalone===true||media.some(query=>query.matches);
  const ua=navigator.userAgent||'',isIOS=/iPad|iPhone|iPod/i.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1),isAndroid=/Android/i.test(ua),embedded=/FBAN|FBAV|Instagram|MicroMessenger|TikTok|Line\//i.test(ua);
  let deferredPrompt=null,phase='browser',installed=false,prompting=false,offlineBusy=false,offlineState=null;
  const messages={browser:['À toi de jouer','Installe le jeu avec ton navigateur, ou lance une partie ici.'],ready:['Prêt à ajouter','Ton navigateur peut ajouter GMK Rush à ton appareil.'],prompting:['À toi de confirmer','Choisis dans la fenêtre d’installation de ton navigateur.'],accepted:['Demande acceptée','Ton appareil termine l’installation. Retrouve ensuite l’icône GMK Rush.'],dismissed:['Tu gardes la main','Tu peux jouer ici et installer le jeu plus tard depuis le navigateur.'],installed:['Le jeu est installé','Retrouve GMK Rush sur ton appareil. La Riviera t’attend !'],standalone:['Mode application actif','Tu utilises déjà le jeu dans sa fenêtre dédiée.'],error:['Le guide reste disponible','L’installation ne s’est pas ouverte. Utilise le menu du navigateur ou joue ici.']};
  function renderInstall(){
    const current=standalone()?'standalone':installed?'installed':phase,done=current==='standalone'||current==='installed',copy=messages[current]||messages.browser;
    document.documentElement.dataset.installState=current;document.body.dataset.installed=String(done);stateBox.dataset.state=current;stateLabel.textContent=copy[0];status.textContent=copy[1];document.querySelector('.install-footnote').textContent=done?'Lance une partie quand tu veux.':phase==='accepted'?'L’ajout se termine sur ton appareil.':'Le navigateur te demandera de confirmer l’ajout.';
    button.hidden=done||prompting||phase==='accepted'||!deferredPrompt;button.disabled=prompting;guideLink.hidden=done||prompting||phase==='accepted';
    if(done||prompting||phase==='accepted'){note.hidden=true;return;}
    if(location.protocol==='file:'||!window.isSecureContext){note.textContent=location.protocol==='file:'?'Ouvre la version hébergée du jeu pour l’ajouter à ton appareil.':'Pour installer le jeu, ouvre sa version HTTPS.';note.hidden=false;}
    else if(embedded){note.textContent='Ouvre ce lien dans '+(isIOS?'Safari':isAndroid?'Chrome':'ton navigateur')+' pour accéder aux options d’installation.';note.hidden=false;}
    else if(isIOS&&!deferredPrompt){note.textContent='Sur iPhone ou iPad, l’ajout se fait avec Partager dans Safari. Le guide est juste en dessous.';note.hidden=false;}
    else{note.hidden=true;}
  }
  window.addEventListener('beforeinstallprompt',event=>{
    if(typeof event.prompt!=='function')return;event.preventDefault();if(installed||standalone())return;
    deferredPrompt=event;if(!prompting)phase='ready';renderInstall();
  });
  window.addEventListener('appinstalled',()=>{installed=true;deferredPrompt=null;prompting=false;phase='installed';renderInstall();});
  button.addEventListener('click',async()=>{
    if(!deferredPrompt||prompting||installed||standalone())return;
    const event=deferredPrompt;deferredPrompt=null;prompting=true;phase='prompting';renderInstall();
    try{
      const result=await event.prompt(),choice=event.userChoice?await event.userChoice:result;
      if(!installed)phase=choice?.outcome==='accepted'?'accepted':'dismissed';
    }catch{if(!installed)phase='error';}
    finally{prompting=false;renderInstall();}
  });
  for(const query of media){if(query.addEventListener)query.addEventListener('change',renderInstall);else query.addListener?.(renderInstall);}
  window.addEventListener('pageshow',renderInstall);

  // The anchors remain ordinary document links without JavaScript.
  const tabs=[...document.querySelectorAll('[data-platform]')],guides=[...document.querySelectorAll('[data-guide]')],tablist=byId('platform-tabs');
  tablist.setAttribute('role','tablist');
  function choosePlatform(platform,focus=false){
    document.body.dataset.platform=platform;
    for(const tab of tabs){const active=tab.dataset.platform===platform;tab.setAttribute('role','tab');tab.setAttribute('aria-controls','guide-'+tab.dataset.platform);tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;if(active&&focus)tab.focus();}
    for(const guide of guides){guide.hidden=guide.dataset.guide!==platform;guide.setAttribute('role','tabpanel');guide.tabIndex=guide.hidden?-1:0;}
  }
  for(const tab of tabs){tab.addEventListener('click',event=>{event.preventDefault();choosePlatform(tab.dataset.platform);});tab.addEventListener('keydown',event=>{const i=tabs.indexOf(tab);let next;if(event.key===' '||event.key==='Enter'){event.preventDefault();choosePlatform(tab.dataset.platform,true);return;}if(event.key==='ArrowRight')next=(i+1)%tabs.length;else if(event.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;if(next!==undefined){event.preventDefault();choosePlatform(tabs[next].dataset.platform,true);}});}
  choosePlatform(isIOS?'ios':isAndroid?'android':'desktop');

  const offlineCard=byId('offline-pack'),offlineButton=byId('offline-button'),offlineStatus=byId('offline-status'),meter=byId('offline-meter'),progress=byId('offline-progress'),progressLabel=byId('offline-progress-label');
  const app=()=>window.GMKApp&&typeof window.GMKApp.getState==='function'&&typeof window.GMKApp.prepareOffline==='function'?window.GMKApp:null;
  function readOffline(){try{return app()?.getState()||null;}catch{return null;}}
  function renderOffline(next=readOffline()){
    if(!app()||!next){offlineCard.hidden=true;return;}offlineState={...next};offlineCard.hidden=false;
    const complete=next.offlineReady===true,busy=!complete&&(next.downloading===true||offlineBusy),total=Math.max(0,Number(next.total)||0),completed=Math.max(0,Math.min(total,Number(next.completed)||0));
    offlineCard.dataset.state=complete?'complete':busy?'downloading':next.error?'error':'idle';offlineButton.hidden=complete;offlineButton.disabled=busy||next.supported===false||(!next.ready&&!next.error);meter.hidden=!busy;
    offlineButton.querySelector('span').textContent=busy?'PRÉPARATION EN COURS…':next.error?'RÉESSAYER LE PACK':'PRÉPARER HORS LIGNE';
    if(total>0){progress.max=total;progress.value=completed;progressLabel.textContent=completed+' / '+total+' fichiers préparés';}else{progress.removeAttribute('value');progressLabel.textContent='Préparation du pack…';}
    if(complete)offlineStatus.textContent='Les 9 jeux sont prêts hors ligne sur cet appareil.';
    else if(busy)offlineStatus.textContent='Garde cette page ouverte pendant la préparation des décors et du jeu.';
    else if(next.error)offlineStatus.textContent='La préparation a été interrompue. Réessaie avec une connexion stable.';
    else if(next.supported===false)offlineStatus.textContent='Le mode hors ligne n’est pas disponible dans ce navigateur. Tu peux jouer en ligne.';
    else if(!next.ready)offlineStatus.textContent='Le navigateur prépare le mode hors ligne. Le bouton sera disponible dans un instant.';
    else offlineStatus.textContent='Env. 50 Mo seront enregistrés sur cet appareil, uniquement si tu choisis de préparer le pack.';
  }
  offlineButton.addEventListener('click',async()=>{
    const api=app();if(!api||offlineBusy||offlineState?.offlineReady)return;
    offlineBusy=true;renderOffline({...readOffline(),downloading:true,error:null});
    try{const result=await api.prepareOffline();offlineState=result||readOffline();}
    catch{offlineState={...(readOffline()||offlineState),downloading:false,error:true};}
    finally{offlineBusy=false;renderOffline(offlineState);}
  });
  window.addEventListener('gmk-app-state',event=>renderOffline(event.detail||readOffline()));
  renderInstall();renderOffline();
})();
