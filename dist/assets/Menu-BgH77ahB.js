import{r as v,j as t,u as le,L as E,a as ae}from"./index-DXsTSGgU.js";import{S as se,N as ce,F as ue}from"./SEO-CYPdXN6y.js";import{d as g,S as fe,O as de,W as me,c as b,l as ve,o as xe,p as he,e as pe}from"./three.module-If0lsiDo.js";import{A as U}from"./arrow-right-Vj-H6w_M.js";const ge=`
precision highp float;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,be=`
precision highp float;

uniform float iTime;
uniform vec3  iResolution;
uniform float animationSpeed;

uniform bool enableTop;
uniform bool enableMiddle;
uniform bool enableBottom;

uniform int topLineCount;
uniform int middleLineCount;
uniform int bottomLineCount;

uniform float topLineDistance;
uniform float middleLineDistance;
uniform float bottomLineDistance;

uniform vec3 topWavePosition;
uniform vec3 middleWavePosition;
uniform vec3 bottomWavePosition;

uniform vec2 iMouse;
uniform bool interactive;
uniform float bendRadius;
uniform float bendStrength;
uniform float bendInfluence;

uniform bool parallax;
uniform float parallaxStrength;
uniform vec2 parallaxOffset;

uniform vec3 lineGradient[8];
uniform int lineGradientCount;

const vec3 BLACK = vec3(0.0);
const vec3 PINK  = vec3(233.0, 71.0, 245.0) / 255.0;
const vec3 BLUE  = vec3(47.0,  75.0, 162.0) / 255.0;

mat2 rotate(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

vec3 background_color(vec2 uv) {
  vec3 col = vec3(0.0);

  float y = sin(uv.x - 0.2) * 0.3 - 0.1;
  float m = uv.y - y;

  col += mix(BLUE, BLACK, smoothstep(0.0, 1.0, abs(m)));
  col += mix(PINK, BLACK, smoothstep(0.0, 1.0, abs(m - 0.8)));
  return col * 0.5;
}

vec3 getLineColor(float t, vec3 baseColor) {
  if (lineGradientCount <= 0) {
    return baseColor;
  }

  vec3 gradientColor;
  
  if (lineGradientCount == 1) {
    gradientColor = lineGradient[0];
  } else {
    float clampedT = clamp(t, 0.0, 0.9999);
    float scaled = clampedT * float(lineGradientCount - 1);
    int idx = int(floor(scaled));
    float f = fract(scaled);
    int idx2 = min(idx + 1, lineGradientCount - 1);

    vec3 c1 = lineGradient[idx];
    vec3 c2 = lineGradient[idx2];
    
    gradientColor = mix(c1, c2, f);
  }
  
  return gradientColor * 0.5;
}

  float wave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv, bool shouldBend) {
  float time = iTime * animationSpeed;

  float x_offset   = offset;
  float x_movement = time * 0.1;
  float amp        = sin(offset + time * 0.2) * 0.3;
  float y          = sin(uv.x + x_offset + x_movement) * amp;

  if (shouldBend) {
    vec2 d = screenUv - mouseUv;
    float influence = exp(-dot(d, d) * bendRadius); // radial falloff around cursor
    float bendOffset = (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
    y += bendOffset;
  }

  float m = uv.y - y;
  return 0.0175 / max(abs(m) + 0.01, 1e-3) + 0.01;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  baseUv.y *= -1.0;
  
  if (parallax) {
    baseUv += parallaxOffset;
  }

  vec3 col = vec3(0.0);

  vec3 b = lineGradientCount > 0 ? vec3(0.0) : background_color(baseUv);

  vec2 mouseUv = vec2(0.0);
  if (interactive) {
    mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;
    mouseUv.y *= -1.0;
  }
  
  if (enableBottom) {
    for (int i = 0; i < bottomLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(bottomLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = bottomWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(bottomLineDistance * fi + bottomWavePosition.x, bottomWavePosition.y),
        1.5 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.2;
    }
  }

  if (enableMiddle) {
    for (int i = 0; i < middleLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(middleLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = middleWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(middleLineDistance * fi + middleWavePosition.x, middleWavePosition.y),
        2.0 + 0.15 * fi,
        baseUv,
        mouseUv,
        interactive
      );
    }
  }

  if (enableTop) {
    for (int i = 0; i < topLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(topLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = topWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      ruv.x *= -1.0;
      col += lineCol * wave(
        ruv + vec2(topLineDistance * fi + topWavePosition.x, topWavePosition.y),
        1.0 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.1;
    }
  }

  fragColor = vec4(col, 1.0);
}

void main() {
  vec4 color = vec4(0.0);
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}
`,H=8;function we(i){let e=i.trim();e.startsWith("#")&&(e=e.slice(1));let a=255,r=255,o=255;return e.length===3?(a=parseInt(e[0]+e[0],16),r=parseInt(e[1]+e[1],16),o=parseInt(e[2]+e[2],16)):e.length===6&&(a=parseInt(e.slice(0,2),16),r=parseInt(e.slice(2,4),16),o=parseInt(e.slice(4,6),16)),new b(a/255,r/255,o/255)}function ye({linesGradient:i,enabledWaves:e=["top","middle","bottom"],lineCount:a=[6],lineDistance:r=[5],topWavePosition:o,middleWavePosition:s,bottomWavePosition:c={x:2,y:-.7,rotate:-1},animationSpeed:G=1,interactive:w=!0,bendRadius:O=5,bendStrength:B=-.5,mouseDamping:y=.05,parallax:C=!0,parallaxStrength:L=.2,mixBlendMode:q="screen"}){const x=v.useRef(null),A=v.useRef(new g(-1e3,-1e3)),T=v.useRef(new g(-1e3,-1e3)),N=v.useRef(0),I=v.useRef(0),_=v.useRef(new g(0,0)),z=v.useRef(new g(0,0)),M=u=>{if(typeof a=="number")return a;if(!e.includes(u))return 0;const h=e.indexOf(u);return a[h]??6},S=u=>{if(typeof r=="number")return r;if(!e.includes(u))return .1;const h=e.indexOf(u);return r[h]??.1},$=e.includes("top")?M("top"):0,J=e.includes("middle")?M("middle"):0,Q=e.includes("bottom")?M("bottom"):0,Z=e.includes("top")?S("top")*.01:.01,P=e.includes("middle")?S("middle")*.01:.01,W=e.includes("bottom")?S("bottom")*.01:.01;return v.useEffect(()=>{if(!x.current)return;const u=new fe,h=new de(-1,1,1,-1,0,1);h.position.z=1;const n=new me({antialias:!0,alpha:!1});n.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),n.domElement.style.width="100%",n.domElement.style.height="100%",x.current.appendChild(n.domElement);const f={iTime:{value:0},iResolution:{value:new b(1,1,1)},animationSpeed:{value:G},enableTop:{value:e.includes("top")},enableMiddle:{value:e.includes("middle")},enableBottom:{value:e.includes("bottom")},topLineCount:{value:$},middleLineCount:{value:J},bottomLineCount:{value:Q},topLineDistance:{value:Z},middleLineDistance:{value:P},bottomLineDistance:{value:W},topWavePosition:{value:new b((o==null?void 0:o.x)??10,(o==null?void 0:o.y)??.5,(o==null?void 0:o.rotate)??-.4)},middleWavePosition:{value:new b((s==null?void 0:s.x)??5,(s==null?void 0:s.y)??0,(s==null?void 0:s.rotate)??.2)},bottomWavePosition:{value:new b((c==null?void 0:c.x)??2,(c==null?void 0:c.y)??-.7,(c==null?void 0:c.rotate)??.4)},iMouse:{value:new g(-1e3,-1e3)},interactive:{value:w},bendRadius:{value:O},bendStrength:{value:B},bendInfluence:{value:0},parallax:{value:C},parallaxStrength:{value:L},parallaxOffset:{value:new g(0,0)},lineGradient:{value:Array.from({length:H},()=>new b(1,1,1))},lineGradientCount:{value:0}};if(i&&i.length>0){const d=i.slice(0,H);f.lineGradientCount.value=d.length,d.forEach((l,p)=>{const m=we(l);f.lineGradient.value[p].set(m.x,m.y,m.z)})}const D=new ve({uniforms:f,vertexShader:ge,fragmentShader:be}),F=new xe(2,2),ee=new he(F,D);u.add(ee);const te=new pe,k=()=>{const d=x.current,l=d.clientWidth||1,p=d.clientHeight||1;n.setSize(l,p,!1);const m=n.domElement.width,R=n.domElement.height;f.iResolution.value.set(m,R,1)};k();const j=typeof ResizeObserver<"u"?new ResizeObserver(k):null;j&&x.current&&j.observe(x.current);const K=d=>{const l=n.domElement.getBoundingClientRect(),p=d.clientX-l.left,m=d.clientY-l.top,R=n.getPixelRatio();if(A.current.set(p*R,(l.height-m)*R),N.current=1,C){const ne=l.width/2,oe=l.height/2,re=(p-ne)/l.width,ie=-(m-oe)/l.height;_.current.set(re*L,ie*L)}},V=()=>{N.current=0};w&&(n.domElement.addEventListener("pointermove",K),n.domElement.addEventListener("pointerleave",V));let X=0;const Y=()=>{f.iTime.value=te.getElapsedTime(),w&&(T.current.lerp(A.current,y),f.iMouse.value.copy(T.current),I.current+=(N.current-I.current)*y,f.bendInfluence.value=I.current),C&&(z.current.lerp(_.current,y),f.parallaxOffset.value.copy(z.current)),n.render(u,h),X=requestAnimationFrame(Y)};return Y(),()=>{cancelAnimationFrame(X),j&&x.current&&j.disconnect(),w&&(n.domElement.removeEventListener("pointermove",K),n.domElement.removeEventListener("pointerleave",V)),F.dispose(),D.dispose(),n.dispose(),n.domElement.parentElement&&n.domElement.parentElement.removeChild(n.domElement)}},[i,e,a,r,o,s,c,G,w,O,B,y,C,L]),t.jsx("div",{ref:x,className:"floating-lines-container",style:{mixBlendMode:q}})}const Ee=()=>{const{t:i,lang:e,setLang:a}=le();return t.jsxs("div",{className:"min-h-screen flex flex-col",children:[t.jsx(se,{path:"/menu",title:"",description:""}),t.jsx(ce,{}),t.jsxs("main",{className:"container mx-auto w-full max-w-4xl py-10 relative overflow-hidden",children:[t.jsx("div",{className:"absolute inset-0 -z-10 pointer-events-none",children:t.jsx(ye,{linesGradient:["#0A84FF","#7c3aed","#00E0B8"],enabledWaves:["top","middle","bottom"],lineCount:[6,8,5],lineDistance:[5,6,4],topWavePosition:{x:10,y:.5,rotate:-.4},middleWavePosition:{x:5,y:0,rotate:.2},bottomWavePosition:{x:2,y:-.7,rotate:-1},animationSpeed:1,interactive:!1,parallax:!0,parallaxStrength:.12,mixBlendMode:"screen"})}),t.jsxs("div",{className:"rounded-2xl border border-white/10 bg-primary/10 supports-[backdrop-filter]:bg-primary/10 backdrop-blur-xl p-6 shadow-2xl",children:[t.jsx("h1",{className:"text-2xl font-semibold text-white mb-6",children:"Menu"}),t.jsxs("div",{className:"grid gap-3",children:[t.jsxs(E,{to:"/",className:"group relative flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white hover:bg-white/10",children:[t.jsx("span",{children:i("nav.home")}),t.jsx(U,{className:"h-4 w-4 opacity-70 group-hover:translate-x-0.5 transition-transform"})]}),t.jsxs(E,{to:"/projects",className:"group relative flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white hover:bg-white/10",children:[t.jsx("span",{children:i("nav.projects")}),t.jsx(U,{className:"h-4 w-4 opacity-70 group-hover:translate-x-0.5 transition-transform"})]}),t.jsxs(E,{to:"/contact",className:"group relative flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white hover:bg-white/10",children:[t.jsx("span",{children:i("nav.contact")}),t.jsx(U,{className:"h-4 w-4 opacity-70 group-hover:translate-x-0.5 transition-transform"})]}),t.jsxs(E,{to:"/policy",className:"group relative flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white hover:bg-white/10",children:[t.jsx("span",{children:i("nav.policy")}),t.jsx(U,{className:"h-4 w-4 opacity-70 group-hover:translate-x-0.5 transition-transform"})]})]}),t.jsxs("div",{className:"mt-8",children:[t.jsx("h2",{className:"text-white font-semibold mb-3",children:"Language"}),t.jsx("div",{className:"grid grid-cols-2 gap-2 sm:grid-cols-4",children:ae.map(r=>t.jsx("button",{type:"button",onClick:()=>a(r.code),className:`px-3 py-2 rounded-md text-sm border ${e===r.code?"border-primary/60 bg-white/10 text-white":"border-white/10 text-gray-200 hover:bg-white/10"}`,children:r.label},r.code))})]})]})]}),t.jsx(ue,{})]})};export{Ee as MenuPage};
