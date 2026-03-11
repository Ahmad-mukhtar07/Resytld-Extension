(function(){"use strict";var de={env:{NODE_ENV:"production"},emit:function(){}};const Ht=`/* ReStyld control panel - injected into page, high specificity */
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

/* Floating selection toolbar - Canva-style */
.restyld-toolbar-overlay {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2147483645;
}

.restyld-floating-toolbar {
  position: fixed;
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 4px 6px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06);
  animation: restyld-toolbar-in 0.2s ease-out;
}

@keyframes restyld-toolbar-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.restyld-toolbar-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #374151;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
  position: relative;
}

.restyld-toolbar-btn:hover {
  background: #f3f4f6;
  color: #111827;
}

.restyld-toolbar-btn:active {
  background: #e5e7eb;
}

.restyld-toolbar-btn.restyld-toolbar-btn--active {
  background: #eff6ff;
  color: #2563eb;
}

.restyld-toolbar-btn.restyld-toolbar-btn--danger:hover {
  background: #fef2f2;
  color: #dc2626;
}

.restyld-toolbar-btn svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.restyld-toolbar-btn[data-tooltip]::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-6px);
  padding: 4px 8px;
  font: 11px/1.3 system-ui, sans-serif;
  color: #fff;
  background: #374151;
  border-radius: 6px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.restyld-toolbar-btn:hover[data-tooltip]::after {
  opacity: 1;
  transform: translateX(-50%) translateY(-4px);
}

.restyld-toolbar-btn.restyld-toolbar-confirm[data-tooltip]::after {
  content: attr(data-tooltip-confirm);
  background: #dc2626;
}

.restyld-toolbar-divider {
  width: 1px;
  height: 20px;
  background: #e5e7eb;
  margin: 0 2px;
  flex-shrink: 0;
}

/* Locked element indicator */
.restyld-selected.restyld-locked {
  outline-color: #6b7280 !important;
}
`;function zt(t){let e=0,n=t.previousElementSibling;for(;n;)e++,n=n.previousElementSibling;return e}function _t(t,e=document.body){if(!t||!e||!e.contains(t))return[];const n=[];let o=t;for(;o&&o!==e;)n.unshift(zt(o)),o=o.parentElement;return n}function W(t,e){if(!t||!Array.isArray(e)||e.length===0)return null;let n=t;for(let o=0;o<e.length;o++){const s=e[o],r=n.children;if(s<0||s>=r.length||(n=r[s],!n))return null}return n}const j=document.body,ot=["position","left","top","width","height","backgroundColor","margin","opacity","borderRadius","transform","fontFamily","fontSize","fontWeight","color","textAlign","padding","borderStyle","borderWidth","borderColor","boxShadow","backdropFilter"];function Pt(t,e){const n=W(j,t.path);if(!n)return e.missing++,!1;if(t.removed)return n.remove(),e.removed++,!0;if(t.styles&&typeof t.styles=="object"){const o=n.style;for(const s of ot)if(Object.prototype.hasOwnProperty.call(t.styles,s)){const r=t.styles[s];o[s]=r!=null?String(r):""}n.setAttribute("data-restyld-modified","1"),e.applied++}return!0}function rt(t){const e={applied:0,removed:0,missing:0};if(!Array.isArray(t))return e;for(const n of t)!n||!Array.isArray(n.path)||Pt(n,e);return e}function it(t){const e=t.style;for(const n of ot)e[n]="";t.removeAttribute("data-restyld-modified")}function st(t){const e={cleared:0,restored:0,missing:0};if(!Array.isArray(t))return e;const n=r=>Array.isArray(r)?r.join(","):"",o=t.filter(r=>r&&r.removed&&r.removedHtml&&Array.isArray(r.path)),s=t.filter(r=>!r||!r.removed||!r.removedHtml);o.sort((r,i)=>n(i.path).localeCompare(n(r.path)));for(const r of o){const i=r.path.slice(0,-1),y=r.path[r.path.length-1],a=i.length===0?j:W(j,i);if(!a){e.missing++;continue}try{const d=document.createElement("div");d.innerHTML=r.removedHtml;const p=d.firstElementChild;if(p){p.style.outline="",p.style.outlineOffset="",p.classList.remove("restyld-selected");const u=a.children[y]||null;a.insertBefore(p,u),e.restored++}}catch{e.missing++}}for(const r of s){if(!r||!Array.isArray(r.path)||r.removed&&r.removedHtml)continue;const i=W(j,r.path);if(!i){e.missing++;continue}it(i),e.cleared++}return e}function It(){const t=document.querySelectorAll('[data-restyld-modified="1"]');return t.forEach(it),t.length}const lt=5,Nt=5,Bt=2,Yt=80,at=4,U=100;function Xt(t){const e=t.getBoundingClientRect();return{left:e.left,top:e.top,right:e.right,bottom:e.bottom,width:e.width,height:e.height,centerX:e.left+e.width/2,centerY:e.top+e.height/2}}function $t(t,e){return!(t.right<e.left||t.left>e.right||t.bottom<e.top||t.top>e.bottom)}function dt(t,e,n){const o={left:-U,top:-U,right:(t.documentElement.clientWidth||window.innerWidth)+U,bottom:(t.documentElement.clientHeight||window.innerHeight)+U},s=n||t.body,r=[],i=new Set;function y(a){if(!a||a.nodeType!==1)return;if(a===t.body||a===t.documentElement){for(let p=0;p<a.children.length;p++)y(a.children[p]);return}if(a===e||e&&(a===e||e.contains(a))||a.closest&&(a.closest(".restyld-resize-handles")||a.closest(".restyld-guides-overlay"))||i.has(a))return;i.add(a);const d=Xt(a);if(!(d.width<at||d.height<at)&&$t(d,o)&&(r.push(d),!(r.length>=Yt)))for(let p=0;p<a.children.length;p++)y(a.children[p])}return y(s),r}function ct(t,e,n={}){const o=n.threshold??lt,s=n.snapThreshold??Nt,r=[];let i=null,y=null,a=s+1,d=s+1;const p=[{key:"top",value:c=>c.top,orient:"h",style:"solid"},{key:"bottom",value:c=>c.bottom,orient:"h",style:"solid"},{key:"left",value:c=>c.left,orient:"v",style:"solid"},{key:"right",value:c=>c.right,orient:"v",style:"solid"}],u=t.top;t.bottom;const L=t.left;t.right;const M=t.centerX,w=t.centerY,m=(c,x,b)=>{let h=c,f=c;for(const v of b)x==="h"?(h=Math.min(h,v.left,t.left),f=Math.max(f,v.right,t.right)):(h=Math.min(h,v.top,t.top),f=Math.max(f,v.bottom,t.bottom));return{min:h,max:f}};for(const c of p){const x=c.value(t),b=new Map;for(const h of e){const f=c.value(h),v=Math.abs(x-f);if(v<=o){const F=Math.round(f);(!b.has(F)||v<Math.abs(x-b.get(F)))&&b.set(F,f)}}for(const[,h]of b){const f=Math.abs(x-h);if(r.push({type:"edge",orientation:c.orient,position:h,extent:m(h,c.orient,e),style:"solid"}),c.key==="left"&&f<a&&(a=f,i=h),c.key==="top"&&f<d&&(d=f,y=h),c.key==="right"&&f<a){const v=h-t.width;Math.abs(L-v)<a&&(a=Math.abs(L-v),i=v)}if(c.key==="bottom"&&f<d){const v=h-t.height;Math.abs(u-v)<d&&(d=Math.abs(u-v),y=v)}}}const g=[{orient:"v",activeVal:M,getVal:c=>c.centerX},{orient:"h",activeVal:w,getVal:c=>c.centerY}];for(const{orient:c,activeVal:x,getVal:b}of g){const h=new Map;for(const f of e){const v=b(f);if(Math.abs(x-v)<=o){const Dt=Math.round(v);h.has(Dt)||h.set(Dt,v)}}for(const[,f]of h)r.push({type:"center",orientation:c,position:f,extent:m(f,c,e),style:"dotted"}),c==="v"&&Math.abs(x-f)<a&&(a=Math.abs(x-f),i=f-t.width/2),c==="h"&&Math.abs(x-f)<d&&(d=Math.abs(x-f),y=f-t.height/2)}const E=Ft(t,e);return r.push(...E.guides),{guides:r,snap:{left:i,top:y}}}function Ft(t,e){const n=[],o=Bt,s=[],r=[];for(const i of e)Math.abs(i.right-t.left)<50&&s.push({gap:t.left-i.right,pos:i.right,orient:"v"}),Math.abs(i.left-t.right)<50&&s.push({gap:i.left-t.right,pos:t.right,orient:"v"}),Math.abs(i.bottom-t.top)<50&&r.push({gap:t.top-i.bottom,pos:i.bottom,orient:"h"}),Math.abs(i.top-t.bottom)<50&&r.push({gap:i.top-t.bottom,pos:t.bottom,orient:"h"});for(const i of s){if(i.gap<=0||i.gap>500)continue;if(s.some(a=>a!==i&&Math.abs(a.gap-i.gap)<=o)){const a=i.orient==="v"?{min:Math.min(t.top,t.bottom),max:Math.max(t.top,t.bottom)}:{min:Math.min(t.left,t.right),max:Math.max(t.left,t.right)};n.push({type:"spacing",orientation:i.orient,position:i.pos,extent:a,style:"solid",label:`${Math.round(i.gap)}px`}),i.orient==="v"&&i.pos===t.right&&t.left+i.gap}}for(const i of r){if(i.gap<=0||i.gap>500)continue;if(r.some(a=>a!==i&&Math.abs(a.gap-i.gap)<=o)){const a=i.orient==="h"?{min:Math.min(t.left,t.right),max:Math.max(t.left,t.right)}:{min:Math.min(t.top,t.bottom),max:Math.max(t.top,t.bottom)};n.push({type:"spacing",orientation:i.orient,position:i.pos,extent:a,style:"solid",label:`${Math.round(i.gap)}px`}),i.orient==="h"&&i.pos===t.bottom&&t.top+i.gap}}return{guides:n,snapLeft:null,snapTop:null}}function Gt(t,e,n,o={}){const s=o.threshold??lt,i=ct(t,n,{...o,snapThreshold:0}).guides,y=s,a=s;for(const d of n)Math.abs(t.width-d.width)<=y&&(e==="e"||e==="w"||e==="ne"||e==="nw"||e==="se"||e==="sw")&&i.push({type:"size",orientation:"v",position:t.left+d.width,extent:{min:Math.min(t.top,t.bottom),max:Math.max(t.top,t.bottom)},style:"dotted",label:`${Math.round(d.width)}px`}),Math.abs(t.height-d.height)<=a&&(e==="n"||e==="s"||e==="ne"||e==="nw"||e==="se"||e==="sw")&&i.push({type:"size",orientation:"h",position:t.top+d.height,extent:{min:Math.min(t.left,t.right),max:Math.max(t.left,t.right)},style:"dotted",label:`${Math.round(d.height)}px`});return{guides:i}}(function(){const e=document.createElement("style");e.textContent=Ht,(document.head||document.documentElement).appendChild(e)})();const Vt="restyld-root",Wt="2px solid rgba(255, 0, 0, 0.5)",jt="3px solid #2563eb";let A=!1,T=null,l=null,k=null;const pt=4;let z=null;function Ut(){return z||(z=document.createElement("div"),z.className="restyld-guides-overlay",document.body.appendChild(z)),z}function N(){z&&(z.innerHTML="")}function ut(t){if(!t||t.length===0){N();return}const e=Ut();e.innerHTML="";for(const n of t){const o=n.orientation==="h",s=document.createElement("div");s.className="restyld-guide-line restyld-guide-line--"+(o?"horizontal":"vertical"),n.style==="dotted"&&s.classList.add("restyld-guide-line--dotted");const r=n.extent||{min:0,max:0};if(o?(s.style.top=n.position+"px",s.style.left=r.min+"px",s.style.width=Math.max(0,r.max-r.min)+"px"):(s.style.left=n.position+"px",s.style.top=r.min+"px",s.style.height=Math.max(0,r.max-r.min)+"px"),e.appendChild(s),n.label){const i=document.createElement("div");i.className="restyld-guide-label",i.textContent=n.label,o?(i.style.left=r.min+"px",i.style.top=n.position+"px",i.style.transform="translateY(-100%) translateY(-4px)"):(i.style.left=n.position+"px",i.style.top=r.min+"px",i.style.transform="translateX(-50%) translateY(-100%)"),e.appendChild(i)}}}let S=null,G=null;const Kt=6,qt=10,Zt=4,ft=["n","ne","e","se","s","sw","w","nw"];let O=null;const _=10,ht=10,C=new Map;let B=[],Q=[];const Rt=50;let D=[],Y=[];function tt(){return JSON.parse(JSON.stringify(et()))}function X(){const t=tt();D.push(t),D.length>Rt&&D.shift(),Y.length=0}function yt(t){const e=et();st(e),rt(t||[]);const n=new Set((t||[]).map(s=>s&&Array.isArray(s.path)?P(s.path):"")),o=e.filter(s=>s&&Array.isArray(s.path)&&!s.removed&&!n.has(P(s.path)));o.sort((s,r)=>P(r.path).localeCompare(P(s.path)));for(const s of o){const r=W(document.body,s.path);r&&r.parentNode&&r.remove()}l&&!document.body.contains(l)&&(l=null),C.clear(),B=[],Array.isArray(t)&&t.forEach(s=>{s&&Array.isArray(s.path)&&C.set(P(s.path),{...s})}),V(),H()}function Jt(){if(D.length===0)return;const t=D.pop();Y.push(tt()),yt(t)}function mt(){if(Y.length===0)return;const t=Y.pop();D.push(tt()),yt(t)}function gt(t){if(!A||t.target.closest('input, textarea, [contenteditable="true"]'))return;const n=typeof navigator<"u"&&/Mac|iPod|iPhone|iPad/.test(navigator.platform);if(n?t.metaKey:t.ctrlKey){if(t.key==="z"||t.key==="Z"){t.shiftKey&&n?(t.preventDefault(),mt()):(t.preventDefault(),Jt());return}(t.key==="y"||t.key==="Y")&&!n&&(t.preventDefault(),mt())}}function P(t){return Array.isArray(t)?t.join(","):""}function I(t,e){if(!t||!document.body.contains(t))return;const n=_t(t);if(n.length===0)return;const o=P(n);if(e.removed!==void 0&&e.removed){B.push({path:n.slice(),removedHtml:e.removedHtml}),C.delete(o);return}const s=C.get(o)||{path:n,styles:{}};e.removed!==void 0&&(s.removed=e.removed,s.removedHtml=e.removedHtml),e.styles&&typeof e.styles=="object"&&Object.assign(s.styles,e.styles),C.set(o,s)}function et(){const t=Array.from(C.values()),e=B.map(n=>({path:n.path,removed:!0,removedHtml:n.removedHtml}));return t.concat(e)}function nt(t){return t.closest(`.${Vt}`)!=null||t.closest(".restyld-resize-handles")!=null||t.closest(".restyld-toolbar-overlay")!=null}function K(){T&&T.style&&(T.style.outline="",T.style.outlineOffset="",T=null)}function q(){l&&l.style&&(l.style.outline="",l.style.outlineOffset="",l.classList.remove("restyld-selected"),l=null)}function Qt(t){!t||t===l||(K(),T=t,t.style.outline=Wt,t.style.outlineOffset="2px")}function bt(t){q(),l=t,t&&(t.style.outline=jt,t.style.outlineOffset="2px",t.classList.add("restyld-selected"))}function xt(t){return t?{tagName:t.tagName||"",id:t.id||"",className:(t.className&&typeof t.className=="string"?t.className:"")||""}:{}}function vt(t){if(!t)return{};const e=getComputedStyle(t),n=t.getBoundingClientRect(),o=s=>s!=null&&s!==""?String(s):void 0;return{backgroundColor:o(t.style.backgroundColor)||e.backgroundColor,opacity:o(t.style.opacity)??e.opacity,width:o(t.style.width)||(n.width?`${n.width}px`:void 0),height:o(t.style.height)||(n.height?`${n.height}px`:void 0),borderRadius:o(t.style.borderRadius)||e.borderRadius,transform:o(t.style.transform)||e.transform,fontFamily:o(t.style.fontFamily)||e.fontFamily,fontSize:o(t.style.fontSize)||e.fontSize,fontWeight:o(t.style.fontWeight)||e.fontWeight,color:o(t.style.color)||e.color,textAlign:o(t.style.textAlign)||e.textAlign,padding:o(t.style.padding)||e.padding,margin:o(t.style.margin)||e.margin,borderStyle:o(t.style.borderStyle)||e.borderStyle,borderWidth:o(t.style.borderWidth)||e.borderWidth,borderColor:o(t.style.borderColor)||e.borderColor,boxShadow:o(t.style.boxShadow)||e.boxShadow,backdropFilter:o(t.style.backdropFilter)||e.backdropFilter,position:o(t.style.position)||void 0,left:o(t.style.left)||void 0,top:o(t.style.top)||void 0}}function wt(t){if(!t||!document.body.contains(t))return;const e=t.offsetParent||t.parentElement||document.body;getComputedStyle(e).position==="static"&&(e.style.setProperty("position","relative"),e.dataset.restyldParentPosition="relative");const o=e.getBoundingClientRect(),s=t.getBoundingClientRect(),r=getComputedStyle(t),i=s.left-o.left,y=s.top-o.top,a=r.width&&r.width!=="auto"?r.width:`${s.width}px`,d=r.height&&r.height!=="auto"?r.height:`${s.height}px`;t.style.position="absolute",t.style.left=`${i}px`,t.style.top=`${y}px`,t.style.width=a,t.style.height=d,t.style.margin="0",t.setAttribute("data-restyld-modified","1"),I(t,{styles:{position:"absolute",left:i+"px",top:y+"px",width:a,height:d,margin:"0"}})}function V(){if(!S||!l||!document.body.contains(l))return;const t=l.getBoundingClientRect(),e=Kt/2,n=qt/2,o=Zt/2,s={n:[t.left+t.width/2-n,t.top-o],ne:[t.right-e,t.top-e],e:[t.right-o,t.top+t.height/2-n],se:[t.right-e,t.bottom-e],s:[t.left+t.width/2-n,t.bottom-o],sw:[t.left-e,t.bottom-e],w:[t.left-o,t.top+t.height/2-n],nw:[t.left-e,t.top-e]};ft.forEach(r=>{const i=S.querySelector(`[data-handle="${r}"]`);i&&(i.style.left=`${s[r][0]}px`,i.style.top=`${s[r][1]}px`)})}function te(t,e){const n=l;if(!n||$(n))return;e.preventDefault(),e.stopPropagation(),X(),wt(n);const s=(n.offsetParent||n.parentElement||document.body).getBoundingClientRect(),r=n.getBoundingClientRect();let i=e.clientX,y=e.clientY,a=r.left-s.left,d=r.top-s.top,p=r.width,u=r.height;const L=dt(document,n,document.body),M=m=>{k==null&&(k=requestAnimationFrame(()=>{k=null;const g=m.clientX-i,E=m.clientY-y;let c=a,x=d,b=p,h=u;switch(t){case"e":b=Math.max(4,p+g);break;case"w":c=a+g,b=Math.max(4,p-g),i=m.clientX,a=c,p=b;break;case"s":h=Math.max(4,u+E);break;case"n":x=d+E,h=Math.max(4,u-E),y=m.clientY,d=x,u=h;break;case"se":b=Math.max(4,p+g),h=Math.max(4,u+E);break;case"sw":c=a+g,b=Math.max(4,p-g),h=Math.max(4,u+E),i=m.clientX,y=m.clientY,a=c,p=b,u=h;break;case"ne":x=d+E,b=Math.max(4,p+g),h=Math.max(4,u-E),i=m.clientX,y=m.clientY,d=x,p=b,u=h;break;case"nw":c=a+g,x=d+E,b=Math.max(4,p-g),h=Math.max(4,u-E),i=m.clientX,y=m.clientY,a=c,d=x,p=b,u=h;break}if(n.style.left=`${c}px`,n.style.top=`${x}px`,n.style.width=`${b}px`,n.style.height=`${h}px`,I(n,{styles:{left:c+"px",top:x+"px",width:b+"px",height:h+"px"}}),V(),L&&L.length>0){const f=n.getBoundingClientRect(),v={left:f.left,top:f.top,right:f.right,bottom:f.bottom,width:f.width,height:f.height,centerX:f.left+f.width/2,centerY:f.top+f.height/2},{guides:F}=Gt(v,t,L);ut(F)}else N()}))},w=()=>{document.removeEventListener("mousemove",M),document.removeEventListener("mouseup",w),k!=null&&cancelAnimationFrame(k),N()};document.addEventListener("mousemove",M,{passive:!0}),document.addEventListener("mouseup",w,{once:!0})}function ee(){if(Z(),!l)return;const t=document.createElement("div");t.className="restyld-resize-handles",S=t,ft.forEach(n=>{const o=document.createElement("div");o.className="restyld-resize-handle",o.setAttribute("data-handle",n),o.addEventListener("mousedown",s=>te(n,s)),t.appendChild(o)}),document.body.appendChild(t),V();const e=()=>{S&&l&&document.body.contains(l)&&(V(),Ct()),G=requestAnimationFrame(e)};G=requestAnimationFrame(e)}function Z(){G!=null&&(cancelAnimationFrame(G),G=null),S&&S.parentNode&&S.parentNode.removeChild(S),S=null}function $(t){return t&&t.dataset.restyldLocked==="1"}function ne(t,e){t&&(e?(t.dataset.restyldLocked="1",t.classList.add("restyld-locked")):(delete t.dataset.restyldLocked,t.classList.remove("restyld-locked")))}const Et='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',Mt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>',oe='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',re='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',ie='<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="6" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="18" r="1.5"/></svg>';function kt(){if(R(),!l||!document.body.contains(l))return;const t=document.createElement("div");t.className="restyld-toolbar-overlay";const e=document.createElement("div");e.className="restyld-floating-toolbar";const n=document.createElement("button");n.type="button",n.className="restyld-toolbar-btn"+($(l)?" restyld-toolbar-btn--active":""),n.setAttribute("data-tooltip",$(l)?"Unlock position":"Lock position"),n.innerHTML=$(l)?Et:Mt,n.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation();const p=!$(l);ne(l,p),n.classList.toggle("restyld-toolbar-btn--active",p),n.innerHTML=p?Et:Mt,n.setAttribute("data-tooltip",p?"Unlock position":"Lock position")});const o=document.createElement("button");o.type="button",o.className="restyld-toolbar-btn",o.setAttribute("data-tooltip","Duplicate"),o.innerHTML=oe,o.addEventListener("click",d=>{if(d.preventDefault(),d.stopPropagation(),!l||!document.body.contains(l))return;X();const p=l.parentElement||document.body,u=l.cloneNode(!0);u.removeAttribute("data-restyld-modified"),u.removeAttribute("data-restyld-locked"),u.classList.remove("restyld-selected","restyld-locked");const L=Array.from(p.children).indexOf(l);p.insertBefore(u,p.children[L+1]||null);const M=l.getBoundingClientRect(),w=p.getBoundingClientRect();getComputedStyle(p).position==="static"&&(p.style.setProperty("position","relative"),p.dataset.restyldParentPosition="relative");const g=M.left-w.left+ht,E=M.top-w.top+ht;u.style.position="absolute",u.style.left=`${g}px`,u.style.top=`${E}px`,u.style.width=`${M.width}px`,u.style.height=`${M.height}px`,u.style.margin="0",u.setAttribute("data-restyld-modified","1"),I(u,{styles:{position:"absolute",left:g+"px",top:E+"px",width:M.width+"px",height:M.height+"px",margin:"0"}}),bt(u),R(),kt(),J(),At(),H()});let s=!1,r=null;const i=document.createElement("button");i.type="button",i.className="restyld-toolbar-btn restyld-toolbar-btn--danger",i.setAttribute("data-tooltip","Remove element"),i.innerHTML=re,i.addEventListener("click",d=>{if(d.preventDefault(),d.stopPropagation(),!l)return;if(!s){s=!0,i.classList.add("restyld-toolbar-confirm"),i.setAttribute("data-tooltip-confirm","Click again to delete"),r=setTimeout(()=>{s=!1,i.classList.remove("restyld-toolbar-confirm"),i.removeAttribute("data-tooltip-confirm"),r=null},2e3);return}r&&clearTimeout(r),X();const p=l.outerHTML;I(l,{removed:!0,removedHtml:p}),l.remove(),l=null,R(),Z(),q(),H()});const y=document.createElement("button");y.type="button",y.className="restyld-toolbar-btn",y.setAttribute("data-tooltip","More options"),y.innerHTML=ie,y.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation()});const a=document.createElement("div");a.className="restyld-toolbar-divider",e.appendChild(n),e.appendChild(o),e.appendChild(i),e.appendChild(a),e.appendChild(y),t.appendChild(e),document.body.appendChild(t),O=t,Ct()}function Ct(){if(!O||!l||!document.body.contains(l))return;const t=O.querySelector(".restyld-floating-toolbar");if(!t)return;const e=l.getBoundingClientRect(),n=t.getBoundingClientRect();document.documentElement.clientHeight||window.innerHeight;const o=document.documentElement.clientWidth||window.innerWidth;let s=e.top-_-n.height;s<_&&(s=e.bottom+_);let r=e.left+e.width/2-n.width/2;r<_&&(r=_),r+n.width>o-_&&(r=o-n.width-_),t.style.position="fixed",t.style.left=`${r}px`,t.style.top=`${s}px`}function R(){O&&O.parentNode&&O.parentNode.removeChild(O),O=null}function H(){try{chrome.runtime.sendMessage({type:"SELECTED_ELEMENT",selected:l?{elementInfo:xt(l),initialStyles:vt(l)}:null,isRepositionMode:!1})}catch{}}function se(){l&&(ee(),kt(),At(),H())}function Lt(){J(),Z(),R(),N(),q(),l=null,H()}function At(){const t=l;if(!t||!document.body.contains(t))return;J();const e=n=>{if(n.target!==t&&!t.contains(n.target)||$(t))return;n.preventDefault(),n.stopPropagation();let o=n.clientX,s=n.clientY,r=!1,i=0,y=0,a=null;const d=u=>{const L=u.clientX-o,M=u.clientY-s;if(!r){if(Math.abs(L)<pt&&Math.abs(M)<pt)return;X(),wt(t);const m=(t.offsetParent||t.parentElement||document.body).getBoundingClientRect(),g=t.getBoundingClientRect();i=g.left-m.left,y=g.top-m.top,o=u.clientX,s=u.clientY,r=!0,a=dt(document,t,document.body)}k==null&&(k=requestAnimationFrame(()=>{k=null;let w=i+(u.clientX-o),m=y+(u.clientY-s);const g=t.getBoundingClientRect();if(a&&a.length>0){const c=(t.offsetParent||t.parentElement||document.body).getBoundingClientRect(),x={left:c.left+w,top:c.top+m,right:c.left+w+g.width,bottom:c.top+m+g.height,width:g.width,height:g.height,centerX:c.left+w+g.width/2,centerY:c.top+m+g.height/2},{guides:b,snap:h}=ct(x,a);ut(b),h.left!=null&&(w=h.left-c.left),h.top!=null&&(m=h.top-c.top)}else N();t.style.left=`${w}px`,t.style.top=`${m}px`,I(t,{styles:{left:t.style.left,top:t.style.top}}),V(),i=w,y=m,o=u.clientX,s=u.clientY}))},p=()=>{document.removeEventListener("mousemove",d),document.removeEventListener("mouseup",p),k!=null&&cancelAnimationFrame(k),N(),r&&H()};document.addEventListener("mousemove",d,{passive:!0}),document.addEventListener("mouseup",p,{once:!0})};t.addEventListener("mousedown",e,!0),t._restyldCleanupDrag=()=>{t.removeEventListener("mousedown",e,!0),delete t._restyldCleanupDrag}}function J(){l&&l._restyldCleanupDrag&&l._restyldCleanupDrag()}function St(t){A&&(nt(t.target)||l||Qt(t.target))}function Tt(t){A&&(nt(t.target)||l||T&&!T.contains(t.relatedTarget)&&K())}function Ot(t){if(A&&!nt(t.target)){if(l&&l!==t.target&&!l.contains(t.target)){t.preventDefault(),t.stopPropagation();return}t.preventDefault(),t.stopPropagation(),K(),bt(t.target),se()}}function le(){A||(A=!0,document.addEventListener("mouseover",St,!0),document.addEventListener("mouseout",Tt,!0),document.addEventListener("click",Ot,!0),document.addEventListener("keydown",gt,!0))}function ae(){A&&(A=!1,document.removeEventListener("mouseover",St,!0),document.removeEventListener("mouseout",Tt,!0),document.removeEventListener("click",Ot,!0),document.removeEventListener("keydown",gt,!0),K(),J(),Lt())}chrome.runtime.onMessage.addListener((t,e,n)=>{if(t.type==="ENABLE_DESIGN_MODE")le(),n({ok:!0,designMode:!0});else if(t.type==="DISABLE_DESIGN_MODE")ae(),n({ok:!0,designMode:!1});else if(t.type==="GET_DESIGN_MODE")n({designMode:A});else if(t.type==="GET_SELECTED_ELEMENT")!l||!document.body.contains(l)?n({selected:null}):n({selected:{elementInfo:xt(l),initialStyles:vt(l)},isRepositionMode:!1});else if(t.type==="APPLY_STYLE"){const o=t.styles||{};if(l&&document.body.contains(l)){X(),l.setAttribute("data-restyld-modified","1");const s={};for(const[r,i]of Object.entries(o))i!=null&&i!==""&&(l.style[r]=i,s[r]=i);Object.keys(s).length&&I(l,{styles:s})}n({ok:!0})}else if(t.type==="DESELECT")Lt(),n({ok:!0});else if(t.type==="REMOVE_ELEMENT"){if(l){X();const o=l.outerHTML;I(l,{removed:!0,removedHtml:o}),l.remove(),l=null}Z(),q(),H(),n({ok:!0})}else if(t.type==="REPOSITION_START")n({ok:!0});else if(t.type==="REPOSITION_DONE")l&&H(),n({ok:!0});else if(t.type==="GET_MODIFICATIONS")n({ok:!0,modifications:et()});else if(t.type==="APPLY_SKIN"){const o=t.modifications||[];D.length=0,Y.length=0;const s=rt(o);Q=o,C.clear(),B=[],o.forEach(r=>{r&&Array.isArray(r.path)&&C.set(P(r.path),{...r})}),n({ok:!0,...s})}else if(t.type==="RESET"){D.length=0,Y.length=0;const o=t.modifications!=null?t.modifications:Q;let s;Array.isArray(o)&&o.length>0?(s=st(o),Q=[],C.clear(),B=[]):(s={cleared:It(),restored:0,missing:0},C.clear(),B=[]),n({ok:!0,...s})}return!0})})();
