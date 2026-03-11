(function(){"use strict";var Bt={env:{NODE_ENV:"production"},emit:function(){}};const ut=`/* ReStyld control panel - injected into page, high specificity */
.restyld-panel {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 13px;
  box-sizing: border-box;
}

/* Selected element in design mode - !important overrides page styles */
.restyld-selected {
  outline: 3px solid #2563eb !important;
  outline-offset: 2px !important;
}

.restyld-panel *,
.restyld-panel *::before,
.restyld-panel *::after {
  box-sizing: border-box;
}

.restyld-panel-card {
  background: #1e1e1e;
  color: #e0e0e0;
  border-radius: 8px;
  padding: 10px 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  min-width: 180px;
}

.restyld-panel-buttons {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.restyld-btn {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  text-align: left;
  transition: background 0.15s ease;
}

.restyld-btn:hover {
  filter: brightness(1.1);
}

.restyld-btn-color {
  background: #3a5a78;
  color: #fff;
}

.restyld-btn-size {
  background: #4a6a4a;
  color: #fff;
}

.restyld-btn-remove {
  background: #8b3a3a;
  color: #fff;
}

.restyld-btn-reposition {
  background: #5a4a7a;
  color: #fff;
}

.restyld-btn-reposition.active {
  background: #6a5a8a;
  outline: 2px solid #9f8fbf;
}

.restyld-btn-deselect {
  background: #4a4a5a;
  color: #e0e0e0;
}

.restyld-btn-deselect:hover {
  background: #5a5a6a;
}

.restyld-panel-section {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #333;
}

.restyld-label {
  display: block;
  margin-bottom: 4px;
  color: #b0b0b0;
  font-size: 11px;
}

.restyld-color-input {
  width: 100%;
  height: 32px;
  padding: 2px;
  border: 1px solid #444;
  border-radius: 4px;
  cursor: pointer;
  background: #2a2a2a;
}

.restyld-slider {
  width: 100%;
  margin-bottom: 8px;
  accent-color: #5a8a9a;
}

.restyld-slider:last-of-type {
  margin-bottom: 0;
}

/* Resize handles - minimal Canva-style */
.restyld-resize-handles {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2147483645;
}

.restyld-resize-handle {
  position: fixed;
  width: 6px;
  height: 6px;
  background: #fff;
  border: 1px solid #2563eb;
  border-radius: 50%;
  pointer-events: auto;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.9), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: transform 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
}

.restyld-resize-handle:hover {
  border-color: #1d4ed8;
  transform: scale(1.25);
  box-shadow: 0 0 0 1px #fff, 0 2px 4px rgba(37, 99, 235, 0.25);
}

.restyld-resize-handle[data-handle="n"],
.restyld-resize-handle[data-handle="s"] {
  cursor: ns-resize;
  width: 10px;
  height: 4px;
  margin-left: -5px;
  border-radius: 2px;
}

.restyld-resize-handle[data-handle="e"],
.restyld-resize-handle[data-handle="w"] {
  cursor: ew-resize;
  width: 4px;
  height: 10px;
  margin-top: -5px;
  border-radius: 2px;
}

.restyld-resize-handle[data-handle="nw"],
.restyld-resize-handle[data-handle="se"] {
  cursor: nwse-resize;
}

.restyld-resize-handle[data-handle="ne"],
.restyld-resize-handle[data-handle="sw"] {
  cursor: nesw-resize;
}

/* Alignment & spacing guides overlay */
.restyld-guides-overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2147483644;
}

.restyld-guide-line {
  position: absolute;
  background: #dc2626;
  opacity: 0.9;
  animation: restyld-guide-in 0.12s ease-out;
}

.restyld-guide-line--dotted {
  background: transparent;
  border: 0 none;
  border-style: dashed;
  border-color: #dc2626;
  opacity: 0.85;
}

.restyld-guide-line--horizontal.restyld-guide-line--dotted {
  border-top-width: 2px;
  height: 0;
}

.restyld-guide-line--vertical.restyld-guide-line--dotted {
  border-left-width: 2px;
  width: 0;
}

.restyld-guide-line--horizontal:not(.restyld-guide-line--dotted) {
  height: 2px;
  left: 0;
  transform: translateY(-50%);
}

.restyld-guide-line--vertical:not(.restyld-guide-line--dotted) {
  width: 2px;
  top: 0;
  transform: translateX(-50%);
}

/* Alignment & spacing guides overlay */
.restyld-guides-overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2147483644;
}

.restyld-guide-line {
  position: absolute;
  background: #dc2626;
  opacity: 0.9;
  animation: restyld-guide-in 0.12s ease-out;
}

.restyld-guide-line--dotted {
  background: transparent;
  border: 0 none;
  border-style: dashed;
  border-color: #dc2626;
  opacity: 0.85;
}

.restyld-guide-line--horizontal.restyld-guide-line--dotted {
  border-top-width: 2px;
  height: 0;
}

.restyld-guide-line--vertical.restyld-guide-line--dotted {
  border-left-width: 2px;
  width: 0;
}

.restyld-guide-line--horizontal:not(.restyld-guide-line--dotted) {
  height: 2px;
  left: 0;
  transform: translateY(-50%);
}

.restyld-guide-line--vertical:not(.restyld-guide-line--dotted) {
  width: 2px;
  top: 0;
  transform: translateX(-50%);
}

.restyld-guide-label {
  position: absolute;
  font: 10px/1.2 system-ui, sans-serif;
  color: #fff;
  background: #dc2626;
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
  animation: restyld-guide-in 0.12s ease-out;
  pointer-events: none;
}

@keyframes restyld-guide-in {
  from { opacity: 0; }
  to { opacity: 0.9; }
}
`;function ct(t){let e=0,n=t.previousElementSibling;for(;n;)e++,n=n.previousElementSibling;return e}function pt(t,e=document.body){if(!t||!e||!e.contains(t))return[];const n=[];let o=t;for(;o&&o!==e;)n.unshift(ct(o)),o=o.parentElement;return n}function B(t,e){if(!t||!Array.isArray(e)||e.length===0)return null;let n=t;for(let o=0;o<e.length;o++){const r=e[o],s=n.children;if(r<0||r>=s.length||(n=s[r],!n))return null}return n}const P=document.body,j=["position","left","top","width","height","backgroundColor","margin","opacity","borderRadius","transform","fontFamily","fontSize","fontWeight","color","textAlign","padding","borderStyle","borderWidth","borderColor","boxShadow","backdropFilter"];function ft(t,e){const n=B(P,t.path);if(!n)return e.missing++,!1;if(t.removed)return n.remove(),e.removed++,!0;if(t.styles&&typeof t.styles=="object"){const o=n.style;for(const r of j)if(Object.prototype.hasOwnProperty.call(t.styles,r)){const s=t.styles[r];o[r]=s!=null?String(s):""}n.setAttribute("data-restyld-modified","1"),e.applied++}return!0}function ht(t){const e={applied:0,removed:0,missing:0};if(!Array.isArray(t))return e;for(const n of t)!n||!Array.isArray(n.path)||ft(n,e);return e}function q(t){const e=t.style;for(const n of j)e[n]="";t.removeAttribute("data-restyld-modified")}function yt(t){const e={cleared:0,restored:0,missing:0};if(!Array.isArray(t))return e;for(const n of t){if(!n||!Array.isArray(n.path))continue;if(n.removed&&n.removedHtml){const r=n.path.slice(0,-1),s=n.path[n.path.length-1],i=r.length===0?P:B(P,r);if(!i){e.missing++;continue}try{const f=document.createElement("div");f.innerHTML=n.removedHtml;const l=f.firstElementChild;if(l){const p=i.children[s]||null;i.insertBefore(l,p),e.restored++}}catch{e.missing++}continue}const o=B(P,n.path);if(!o){e.missing++;continue}q(o),e.cleared++}return e}function gt(){const t=document.querySelectorAll('[data-restyld-modified="1"]');return t.forEach(q),t.length}const Z=5,mt=5,bt=2,xt=80,K=4,Y=100;function Et(t){const e=t.getBoundingClientRect();return{left:e.left,top:e.top,right:e.right,bottom:e.bottom,width:e.width,height:e.height,centerX:e.left+e.width/2,centerY:e.top+e.height/2}}function wt(t,e){return!(t.right<e.left||t.left>e.right||t.bottom<e.top||t.top>e.bottom)}function U(t,e,n){const o={left:-Y,top:-Y,right:(t.documentElement.clientWidth||window.innerWidth)+Y,bottom:(t.documentElement.clientHeight||window.innerHeight)+Y},r=n||t.body,s=[],i=new Set;function f(l){if(!l||l.nodeType!==1)return;if(l===t.body||l===t.documentElement){for(let h=0;h<l.children.length;h++)f(l.children[h]);return}if(l===e||e&&(l===e||e.contains(l))||l.closest&&(l.closest(".restyld-resize-handles")||l.closest(".restyld-guides-overlay"))||i.has(l))return;i.add(l);const p=Et(l);if(!(p.width<K||p.height<K)&&wt(p,o)&&(s.push(p),!(s.length>=xt)))for(let h=0;h<l.children.length;h++)f(l.children[h])}return f(r),s}function J(t,e,n={}){const o=n.threshold??Z,r=n.snapThreshold??mt,s=[];let i=null,f=null,l=r+1,p=r+1;const h=[{key:"top",value:a=>a.top,orient:"h",style:"solid"},{key:"bottom",value:a=>a.bottom,orient:"h",style:"solid"},{key:"left",value:a=>a.left,orient:"v",style:"solid"},{key:"right",value:a=>a.right,orient:"v",style:"solid"}],y=t.top;t.bottom;const C=t.left;t.right;const D=t.centerX,w=t.centerY,g=(a,b,m)=>{let c=a,u=a;for(const E of m)b==="h"?(c=Math.min(c,E.left,t.left),u=Math.max(u,E.right,t.right)):(c=Math.min(c,E.top,t.top),u=Math.max(u,E.bottom,t.bottom));return{min:c,max:u}};for(const a of h){const b=a.value(t),m=new Map;for(const c of e){const u=a.value(c),E=Math.abs(b-u);if(E<=o){const O=Math.round(u);(!m.has(O)||E<Math.abs(b-m.get(O)))&&m.set(O,u)}}for(const[,c]of m){const u=Math.abs(b-c);if(s.push({type:"edge",orientation:a.orient,position:c,extent:g(c,a.orient,e),style:"solid"}),a.key==="left"&&u<l&&(l=u,i=c),a.key==="top"&&u<p&&(p=u,f=c),a.key==="right"&&u<l){const E=c-t.width;Math.abs(C-E)<l&&(l=Math.abs(C-E),i=E)}if(a.key==="bottom"&&u<p){const E=c-t.height;Math.abs(y-E)<p&&(p=Math.abs(y-E),f=E)}}}const x=[{orient:"v",activeVal:D,getVal:a=>a.centerX},{orient:"h",activeVal:w,getVal:a=>a.centerY}];for(const{orient:a,activeVal:b,getVal:m}of x){const c=new Map;for(const u of e){const E=m(u);if(Math.abs(b-E)<=o){const dt=Math.round(E);c.has(dt)||c.set(dt,E)}}for(const[,u]of c)s.push({type:"center",orientation:a,position:u,extent:g(u,a,e),style:"dotted"}),a==="v"&&Math.abs(b-u)<l&&(l=Math.abs(b-u),i=u-t.width/2),a==="h"&&Math.abs(b-u)<p&&(p=Math.abs(b-u),f=u-t.height/2)}const M=Mt(t,e);return s.push(...M.guides),{guides:s,snap:{left:i,top:f}}}function Mt(t,e){const n=[],o=bt,r=[],s=[];for(const i of e)Math.abs(i.right-t.left)<50&&r.push({gap:t.left-i.right,pos:i.right,orient:"v"}),Math.abs(i.left-t.right)<50&&r.push({gap:i.left-t.right,pos:t.right,orient:"v"}),Math.abs(i.bottom-t.top)<50&&s.push({gap:t.top-i.bottom,pos:i.bottom,orient:"h"}),Math.abs(i.top-t.bottom)<50&&s.push({gap:i.top-t.bottom,pos:t.bottom,orient:"h"});for(const i of r){if(i.gap<=0||i.gap>500)continue;if(r.some(l=>l!==i&&Math.abs(l.gap-i.gap)<=o)){const l=i.orient==="v"?{min:Math.min(t.top,t.bottom),max:Math.max(t.top,t.bottom)}:{min:Math.min(t.left,t.right),max:Math.max(t.left,t.right)};n.push({type:"spacing",orientation:i.orient,position:i.pos,extent:l,style:"solid",label:`${Math.round(i.gap)}px`}),i.orient==="v"&&i.pos===t.right&&t.left+i.gap}}for(const i of s){if(i.gap<=0||i.gap>500)continue;if(s.some(l=>l!==i&&Math.abs(l.gap-i.gap)<=o)){const l=i.orient==="h"?{min:Math.min(t.left,t.right),max:Math.max(t.left,t.right)}:{min:Math.min(t.top,t.bottom),max:Math.max(t.top,t.bottom)};n.push({type:"spacing",orientation:i.orient,position:i.pos,extent:l,style:"solid",label:`${Math.round(i.gap)}px`}),i.orient==="h"&&i.pos===t.bottom&&t.top+i.gap}}return{guides:n,snapLeft:null,snapTop:null}}function vt(t,e,n,o={}){const r=o.threshold??Z,i=J(t,n,{...o,snapThreshold:0}).guides,f=r,l=r;for(const p of n)Math.abs(t.width-p.width)<=f&&(e==="e"||e==="w"||e==="ne"||e==="nw"||e==="se"||e==="sw")&&i.push({type:"size",orientation:"v",position:t.left+p.width,extent:{min:Math.min(t.top,t.bottom),max:Math.max(t.top,t.bottom)},style:"dotted",label:`${Math.round(p.width)}px`}),Math.abs(t.height-p.height)<=l&&(e==="n"||e==="s"||e==="ne"||e==="nw"||e==="se"||e==="sw")&&i.push({type:"size",orientation:"h",position:t.top+p.height,extent:{min:Math.min(t.left,t.right),max:Math.max(t.left,t.right)},style:"dotted",label:`${Math.round(p.height)}px`});return{guides:i}}(function(){const e=document.createElement("style");e.textContent=ut,(document.head||document.documentElement).appendChild(e)})();const St="restyld-root",kt="2px solid rgba(255, 0, 0, 0.5)",At="3px solid #2563eb";let k=!1,A=null,d=null,v=null;const Q=4;let L=null;function Ct(){return L||(L=document.createElement("div"),L.className="restyld-guides-overlay",document.body.appendChild(L)),L}function T(){L&&(L.innerHTML="")}function R(t){if(!t||t.length===0){T();return}const e=Ct();e.innerHTML="";for(const n of t){const o=n.orientation==="h",r=document.createElement("div");r.className="restyld-guide-line restyld-guide-line--"+(o?"horizontal":"vertical"),n.style==="dotted"&&r.classList.add("restyld-guide-line--dotted");const s=n.extent||{min:0,max:0};if(o?(r.style.top=n.position+"px",r.style.left=s.min+"px",r.style.width=Math.max(0,s.max-s.min)+"px"):(r.style.left=n.position+"px",r.style.top=s.min+"px",r.style.height=Math.max(0,s.max-s.min)+"px"),e.appendChild(r),n.label){const i=document.createElement("div");i.className="restyld-guide-label",i.textContent=n.label,o?(i.style.left=s.min+"px",i.style.top=n.position+"px",i.style.transform="translateY(-100%) translateY(-4px)"):(i.style.left=n.position+"px",i.style.top=s.min+"px",i.style.transform="translateX(-50%) translateY(-100%)"),e.appendChild(i)}}}let S=null,_=null;const Lt=6,zt=10,Tt=4,tt=["n","ne","e","se","s","sw","w","nw"],z=new Map;let $=[];function et(t){return Array.isArray(t)?t.join(","):""}function H(t,e){if(!t||!document.body.contains(t))return;const n=pt(t);if(n.length===0)return;const o=et(n),r=z.get(o)||{path:n,styles:{}};e.removed!==void 0&&(r.removed=e.removed,r.removedHtml=e.removedHtml),e.styles&&typeof e.styles=="object"&&Object.assign(r.styles,e.styles),z.set(o,r)}function Dt(){return Array.from(z.values())}function F(t){return t.closest(`.${St}`)!=null||t.closest(".restyld-resize-handles")!=null}function N(){A&&A.style&&(A.style.outline="",A.style.outlineOffset="",A=null)}function G(){d&&d.style&&(d.style.outline="",d.style.outlineOffset="",d.classList.remove("restyld-selected"),d=null)}function Ot(t){!t||t===d||(N(),A=t,t.style.outline=kt,t.style.outlineOffset="2px")}function _t(t){G(),d=t,t&&(t.style.outline=At,t.style.outlineOffset="2px",t.classList.add("restyld-selected"))}function nt(t){return t?{tagName:t.tagName||"",id:t.id||"",className:(t.className&&typeof t.className=="string"?t.className:"")||""}:{}}function ot(t){if(!t)return{};const e=getComputedStyle(t),n=t.getBoundingClientRect(),o=r=>r!=null&&r!==""?String(r):void 0;return{backgroundColor:o(t.style.backgroundColor)||e.backgroundColor,opacity:o(t.style.opacity)??e.opacity,width:o(t.style.width)||(n.width?`${n.width}px`:void 0),height:o(t.style.height)||(n.height?`${n.height}px`:void 0),borderRadius:o(t.style.borderRadius)||e.borderRadius,transform:o(t.style.transform)||e.transform,fontFamily:o(t.style.fontFamily)||e.fontFamily,fontSize:o(t.style.fontSize)||e.fontSize,fontWeight:o(t.style.fontWeight)||e.fontWeight,color:o(t.style.color)||e.color,textAlign:o(t.style.textAlign)||e.textAlign,padding:o(t.style.padding)||e.padding,margin:o(t.style.margin)||e.margin,borderStyle:o(t.style.borderStyle)||e.borderStyle,borderWidth:o(t.style.borderWidth)||e.borderWidth,borderColor:o(t.style.borderColor)||e.borderColor,boxShadow:o(t.style.boxShadow)||e.boxShadow,backdropFilter:o(t.style.backdropFilter)||e.backdropFilter,position:o(t.style.position)||void 0,left:o(t.style.left)||void 0,top:o(t.style.top)||void 0}}function it(t){if(!t||!document.body.contains(t))return;const e=t.offsetParent||t.parentElement||document.body;getComputedStyle(e).position==="static"&&(e.style.setProperty("position","relative"),e.dataset.restyldParentPosition="relative");const o=e.getBoundingClientRect(),r=t.getBoundingClientRect(),s=getComputedStyle(t),i=r.left-o.left,f=r.top-o.top,l=s.width&&s.width!=="auto"?s.width:`${r.width}px`,p=s.height&&s.height!=="auto"?s.height:`${r.height}px`;t.style.position="absolute",t.style.left=`${i}px`,t.style.top=`${f}px`,t.style.width=l,t.style.height=p,t.style.margin="0",t.setAttribute("data-restyld-modified","1"),H(t,{styles:{position:"absolute",left:i+"px",top:f+"px",width:l,height:p,margin:"0"}})}function X(){if(!S||!d||!document.body.contains(d))return;const t=d.getBoundingClientRect(),e=Lt/2,n=zt/2,o=Tt/2,r={n:[t.left+t.width/2-n,t.top-o],ne:[t.right-e,t.top-e],e:[t.right-o,t.top+t.height/2-n],se:[t.right-e,t.bottom-e],s:[t.left+t.width/2-n,t.bottom-o],sw:[t.left-e,t.bottom-e],w:[t.left-o,t.top+t.height/2-n],nw:[t.left-e,t.top-e]};tt.forEach(s=>{const i=S.querySelector(`[data-handle="${s}"]`);i&&(i.style.left=`${r[s][0]}px`,i.style.top=`${r[s][1]}px`)})}function Ht(t,e){const n=d;if(!n)return;e.preventDefault(),e.stopPropagation(),it(n);const r=(n.offsetParent||n.parentElement||document.body).getBoundingClientRect(),s=n.getBoundingClientRect();let i=e.clientX,f=e.clientY,l=s.left-r.left,p=s.top-r.top,h=s.width,y=s.height;const C=U(document,n,document.body),D=g=>{v==null&&(v=requestAnimationFrame(()=>{v=null;const x=g.clientX-i,M=g.clientY-f;let a=l,b=p,m=h,c=y;switch(t){case"e":m=Math.max(4,h+x);break;case"w":a=l+x,m=Math.max(4,h-x),i=g.clientX,l=a,h=m;break;case"s":c=Math.max(4,y+M);break;case"n":b=p+M,c=Math.max(4,y-M),f=g.clientY,p=b,y=c;break;case"se":m=Math.max(4,h+x),c=Math.max(4,y+M);break;case"sw":a=l+x,m=Math.max(4,h-x),c=Math.max(4,y+M),i=g.clientX,f=g.clientY,l=a,h=m,y=c;break;case"ne":b=p+M,m=Math.max(4,h+x),c=Math.max(4,y-M),i=g.clientX,f=g.clientY,p=b,h=m,y=c;break;case"nw":a=l+x,b=p+M,m=Math.max(4,h-x),c=Math.max(4,y-M),i=g.clientX,f=g.clientY,l=a,p=b,h=m,y=c;break}if(n.style.left=`${a}px`,n.style.top=`${b}px`,n.style.width=`${m}px`,n.style.height=`${c}px`,H(n,{styles:{left:a+"px",top:b+"px",width:m+"px",height:c+"px"}}),X(),C&&C.length>0){const u=n.getBoundingClientRect(),E={left:u.left,top:u.top,right:u.right,bottom:u.bottom,width:u.width,height:u.height,centerX:u.left+u.width/2,centerY:u.top+u.height/2},{guides:O}=vt(E,t,C);R(O)}else T()}))},w=()=>{document.removeEventListener("mousemove",D),document.removeEventListener("mouseup",w),v!=null&&cancelAnimationFrame(v),T()};document.addEventListener("mousemove",D,{passive:!0}),document.addEventListener("mouseup",w,{once:!0})}function It(){if(V(),!d)return;const t=document.createElement("div");t.className="restyld-resize-handles",S=t,tt.forEach(n=>{const o=document.createElement("div");o.className="restyld-resize-handle",o.setAttribute("data-handle",n),o.addEventListener("mousedown",r=>Ht(n,r)),t.appendChild(o)}),document.body.appendChild(t),X();const e=()=>{S&&d&&document.body.contains(d)&&X(),_=requestAnimationFrame(e)};_=requestAnimationFrame(e)}function V(){_!=null&&(cancelAnimationFrame(_),_=null),S&&S.parentNode&&S.parentNode.removeChild(S),S=null}function I(){try{chrome.runtime.sendMessage({type:"SELECTED_ELEMENT",selected:d?{elementInfo:nt(d),initialStyles:ot(d)}:null,isRepositionMode:!1})}catch{}}function Pt(){d&&(It(),Yt(),I())}function rt(){W(),V(),T(),G(),d=null,I()}function Yt(){const t=d;if(!t||!document.body.contains(t))return;W();const e=n=>{if(n.target!==t&&!t.contains(n.target))return;n.preventDefault(),n.stopPropagation();let o=n.clientX,r=n.clientY,s=!1,i=0,f=0,l=null;const p=y=>{const C=y.clientX-o,D=y.clientY-r;if(!s){if(Math.abs(C)<Q&&Math.abs(D)<Q)return;it(t);const g=(t.offsetParent||t.parentElement||document.body).getBoundingClientRect(),x=t.getBoundingClientRect();i=x.left-g.left,f=x.top-g.top,o=y.clientX,r=y.clientY,s=!0,l=U(document,t,document.body)}v==null&&(v=requestAnimationFrame(()=>{v=null;let w=i+(y.clientX-o),g=f+(y.clientY-r);const x=t.getBoundingClientRect();if(l&&l.length>0){const a=(t.offsetParent||t.parentElement||document.body).getBoundingClientRect(),b={left:a.left+w,top:a.top+g,right:a.left+w+x.width,bottom:a.top+g+x.height,width:x.width,height:x.height,centerX:a.left+w+x.width/2,centerY:a.top+g+x.height/2},{guides:m,snap:c}=J(b,l);R(m),c.left!=null&&(w=c.left-a.left),c.top!=null&&(g=c.top-a.top)}else T();t.style.left=`${w}px`,t.style.top=`${g}px`,H(t,{styles:{left:t.style.left,top:t.style.top}}),X(),i=w,f=g,o=y.clientX,r=y.clientY}))},h=()=>{document.removeEventListener("mousemove",p),document.removeEventListener("mouseup",h),v!=null&&cancelAnimationFrame(v),T(),s&&I()};document.addEventListener("mousemove",p,{passive:!0}),document.addEventListener("mouseup",h,{once:!0})};t.addEventListener("mousedown",e,!0),t._restyldCleanupDrag=()=>{t.removeEventListener("mousedown",e,!0),delete t._restyldCleanupDrag}}function W(){d&&d._restyldCleanupDrag&&d._restyldCleanupDrag()}function st(t){k&&(F(t.target)||d||Ot(t.target))}function lt(t){k&&(F(t.target)||d||A&&!A.contains(t.relatedTarget)&&N())}function at(t){if(k&&!F(t.target)){if(d&&d!==t.target&&!d.contains(t.target)){t.preventDefault(),t.stopPropagation();return}t.preventDefault(),t.stopPropagation(),N(),_t(t.target),Pt()}}function Nt(){k||(k=!0,document.addEventListener("mouseover",st,!0),document.addEventListener("mouseout",lt,!0),document.addEventListener("click",at,!0))}function Xt(){k&&(k=!1,document.removeEventListener("mouseover",st,!0),document.removeEventListener("mouseout",lt,!0),document.removeEventListener("click",at,!0),N(),W(),rt())}chrome.runtime.onMessage.addListener((t,e,n)=>{if(t.type==="ENABLE_DESIGN_MODE")Nt(),n({ok:!0,designMode:!0});else if(t.type==="DISABLE_DESIGN_MODE")Xt(),n({ok:!0,designMode:!1});else if(t.type==="GET_DESIGN_MODE")n({designMode:k});else if(t.type==="GET_SELECTED_ELEMENT")!d||!document.body.contains(d)?n({selected:null}):n({selected:{elementInfo:nt(d),initialStyles:ot(d)},isRepositionMode:!1});else if(t.type==="APPLY_STYLE"){const o=t.styles||{};if(d&&document.body.contains(d)){d.setAttribute("data-restyld-modified","1");const r={};for(const[s,i]of Object.entries(o))i!=null&&i!==""&&(d.style[s]=i,r[s]=i);Object.keys(r).length&&H(d,{styles:r})}n({ok:!0})}else if(t.type==="DESELECT")rt(),n({ok:!0});else if(t.type==="REMOVE_ELEMENT"){if(d){const o=d.outerHTML;H(d,{removed:!0,removedHtml:o}),d.remove(),d=null}V(),G(),I(),n({ok:!0})}else if(t.type==="REPOSITION_START")n({ok:!0});else if(t.type==="REPOSITION_DONE")d&&I(),n({ok:!0});else if(t.type==="GET_MODIFICATIONS")n({ok:!0,modifications:Dt()});else if(t.type==="APPLY_SKIN"){const o=t.modifications||[],r=ht(o);$=o,z.clear(),o.forEach(s=>{s&&Array.isArray(s.path)&&z.set(et(s.path),{...s})}),n({ok:!0,...r})}else if(t.type==="RESET"){const o=t.modifications!=null?t.modifications:$;let r;Array.isArray(o)&&o.length>0?(r=yt(o),$=[],z.clear()):(r={cleared:gt(),restored:0,missing:0},z.clear()),n({ok:!0,...r})}return!0})})();
