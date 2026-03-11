(function(){"use strict";var ae={env:{NODE_ENV:"production"},emit:function(){}};const Ot=`/* ReStyld control panel - injected into page, high specificity */
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
`;function zt(t){let e=0,n=t.previousElementSibling;for(;n;)e++,n=n.previousElementSibling;return e}function _t(t,e=document.body){if(!t||!e||!e.contains(t))return[];const n=[];let o=t;for(;o&&o!==e;)n.unshift(zt(o)),o=o.parentElement;return n}function Z(t,e){if(!t||!Array.isArray(e)||e.length===0)return null;let n=t;for(let o=0;o<e.length;o++){const i=e[o],s=n.children;if(i<0||i>=s.length||(n=s[i],!n))return null}return n}const G=document.body,nt=["position","left","top","width","height","backgroundColor","margin","opacity","borderRadius","transform","fontFamily","fontSize","fontWeight","color","textAlign","padding","borderStyle","borderWidth","borderColor","boxShadow","backdropFilter"];function Ht(t,e){const n=Z(G,t.path);if(!n)return e.missing++,!1;if(t.removed)return n.remove(),e.removed++,!0;if(t.styles&&typeof t.styles=="object"){const o=n.style;for(const i of nt)if(Object.prototype.hasOwnProperty.call(t.styles,i)){const s=t.styles[i];o[i]=s!=null?String(s):""}n.setAttribute("data-restyld-modified","1"),e.applied++}return!0}function ot(t){const e={applied:0,removed:0,missing:0};if(!Array.isArray(t))return e;for(const n of t)!n||!Array.isArray(n.path)||Ht(n,e);return e}function rt(t){const e=t.style;for(const n of nt)e[n]="";t.removeAttribute("data-restyld-modified")}function it(t){const e={cleared:0,restored:0,missing:0};if(!Array.isArray(t))return e;for(const n of t){if(!n||!Array.isArray(n.path))continue;if(n.removed&&n.removedHtml){const i=n.path.slice(0,-1),s=n.path[n.path.length-1],r=i.length===0?G:Z(G,i);if(!r){e.missing++;continue}try{const y=document.createElement("div");y.innerHTML=n.removedHtml;const a=y.firstElementChild;if(a){const d=r.children[s]||null;r.insertBefore(a,d),e.restored++}}catch{e.missing++}continue}const o=Z(G,n.path);if(!o){e.missing++;continue}rt(o),e.cleared++}return e}function Pt(){const t=document.querySelectorAll('[data-restyld-modified="1"]');return t.forEach(rt),t.length}const st=5,It=5,Nt=2,Bt=80,lt=4,V=100;function Yt(t){const e=t.getBoundingClientRect();return{left:e.left,top:e.top,right:e.right,bottom:e.bottom,width:e.width,height:e.height,centerX:e.left+e.width/2,centerY:e.top+e.height/2}}function Xt(t,e){return!(t.right<e.left||t.left>e.right||t.bottom<e.top||t.top>e.bottom)}function at(t,e,n){const o={left:-V,top:-V,right:(t.documentElement.clientWidth||window.innerWidth)+V,bottom:(t.documentElement.clientHeight||window.innerHeight)+V},i=n||t.body,s=[],r=new Set;function y(a){if(!a||a.nodeType!==1)return;if(a===t.body||a===t.documentElement){for(let p=0;p<a.children.length;p++)y(a.children[p]);return}if(a===e||e&&(a===e||e.contains(a))||a.closest&&(a.closest(".restyld-resize-handles")||a.closest(".restyld-guides-overlay"))||r.has(a))return;r.add(a);const d=Yt(a);if(!(d.width<lt||d.height<lt)&&Xt(d,o)&&(s.push(d),!(s.length>=Bt)))for(let p=0;p<a.children.length;p++)y(a.children[p])}return y(i),s}function dt(t,e,n={}){const o=n.threshold??st,i=n.snapThreshold??It,s=[];let r=null,y=null,a=i+1,d=i+1;const p=[{key:"top",value:c=>c.top,orient:"h",style:"solid"},{key:"bottom",value:c=>c.bottom,orient:"h",style:"solid"},{key:"left",value:c=>c.left,orient:"v",style:"solid"},{key:"right",value:c=>c.right,orient:"v",style:"solid"}],f=t.top;t.bottom;const C=t.left;t.right;const M=t.centerX,w=t.centerY,g=(c,x,b)=>{let h=c,u=c;for(const v of b)x==="h"?(h=Math.min(h,v.left,t.left),u=Math.max(u,v.right,t.right)):(h=Math.min(h,v.top,t.top),u=Math.max(u,v.bottom,t.bottom));return{min:h,max:u}};for(const c of p){const x=c.value(t),b=new Map;for(const h of e){const u=c.value(h),v=Math.abs(x-u);if(v<=o){const X=Math.round(u);(!b.has(X)||v<Math.abs(x-b.get(X)))&&b.set(X,u)}}for(const[,h]of b){const u=Math.abs(x-h);if(s.push({type:"edge",orientation:c.orient,position:h,extent:g(h,c.orient,e),style:"solid"}),c.key==="left"&&u<a&&(a=u,r=h),c.key==="top"&&u<d&&(d=u,y=h),c.key==="right"&&u<a){const v=h-t.width;Math.abs(C-v)<a&&(a=Math.abs(C-v),r=v)}if(c.key==="bottom"&&u<d){const v=h-t.height;Math.abs(f-v)<d&&(d=Math.abs(f-v),y=v)}}}const m=[{orient:"v",activeVal:M,getVal:c=>c.centerX},{orient:"h",activeVal:w,getVal:c=>c.centerY}];for(const{orient:c,activeVal:x,getVal:b}of m){const h=new Map;for(const u of e){const v=b(u);if(Math.abs(x-v)<=o){const Dt=Math.round(v);h.has(Dt)||h.set(Dt,v)}}for(const[,u]of h)s.push({type:"center",orientation:c,position:u,extent:g(u,c,e),style:"dotted"}),c==="v"&&Math.abs(x-u)<a&&(a=Math.abs(x-u),r=u-t.width/2),c==="h"&&Math.abs(x-u)<d&&(d=Math.abs(x-u),y=u-t.height/2)}const E=$t(t,e);return s.push(...E.guides),{guides:s,snap:{left:r,top:y}}}function $t(t,e){const n=[],o=Nt,i=[],s=[];for(const r of e)Math.abs(r.right-t.left)<50&&i.push({gap:t.left-r.right,pos:r.right,orient:"v"}),Math.abs(r.left-t.right)<50&&i.push({gap:r.left-t.right,pos:t.right,orient:"v"}),Math.abs(r.bottom-t.top)<50&&s.push({gap:t.top-r.bottom,pos:r.bottom,orient:"h"}),Math.abs(r.top-t.bottom)<50&&s.push({gap:r.top-t.bottom,pos:t.bottom,orient:"h"});for(const r of i){if(r.gap<=0||r.gap>500)continue;if(i.some(a=>a!==r&&Math.abs(a.gap-r.gap)<=o)){const a=r.orient==="v"?{min:Math.min(t.top,t.bottom),max:Math.max(t.top,t.bottom)}:{min:Math.min(t.left,t.right),max:Math.max(t.left,t.right)};n.push({type:"spacing",orientation:r.orient,position:r.pos,extent:a,style:"solid",label:`${Math.round(r.gap)}px`}),r.orient==="v"&&r.pos===t.right&&t.left+r.gap}}for(const r of s){if(r.gap<=0||r.gap>500)continue;if(s.some(a=>a!==r&&Math.abs(a.gap-r.gap)<=o)){const a=r.orient==="h"?{min:Math.min(t.left,t.right),max:Math.max(t.left,t.right)}:{min:Math.min(t.top,t.bottom),max:Math.max(t.top,t.bottom)};n.push({type:"spacing",orientation:r.orient,position:r.pos,extent:a,style:"solid",label:`${Math.round(r.gap)}px`}),r.orient==="h"&&r.pos===t.bottom&&t.top+r.gap}}return{guides:n,snapLeft:null,snapTop:null}}function Ft(t,e,n,o={}){const i=o.threshold??st,r=dt(t,n,{...o,snapThreshold:0}).guides,y=i,a=i;for(const d of n)Math.abs(t.width-d.width)<=y&&(e==="e"||e==="w"||e==="ne"||e==="nw"||e==="se"||e==="sw")&&r.push({type:"size",orientation:"v",position:t.left+d.width,extent:{min:Math.min(t.top,t.bottom),max:Math.max(t.top,t.bottom)},style:"dotted",label:`${Math.round(d.width)}px`}),Math.abs(t.height-d.height)<=a&&(e==="n"||e==="s"||e==="ne"||e==="nw"||e==="se"||e==="sw")&&r.push({type:"size",orientation:"h",position:t.top+d.height,extent:{min:Math.min(t.left,t.right),max:Math.max(t.left,t.right)},style:"dotted",label:`${Math.round(d.height)}px`});return{guides:r}}(function(){const e=document.createElement("style");e.textContent=Ot,(document.head||document.documentElement).appendChild(e)})();const Gt="restyld-root",Vt="2px solid rgba(255, 0, 0, 0.5)",Wt="3px solid #2563eb";let L=!1,T=null,l=null,k=null;const ct=4;let _=null;function Ut(){return _||(_=document.createElement("div"),_.className="restyld-guides-overlay",document.body.appendChild(_)),_}function I(){_&&(_.innerHTML="")}function pt(t){if(!t||t.length===0){I();return}const e=Ut();e.innerHTML="";for(const n of t){const o=n.orientation==="h",i=document.createElement("div");i.className="restyld-guide-line restyld-guide-line--"+(o?"horizontal":"vertical"),n.style==="dotted"&&i.classList.add("restyld-guide-line--dotted");const s=n.extent||{min:0,max:0};if(o?(i.style.top=n.position+"px",i.style.left=s.min+"px",i.style.width=Math.max(0,s.max-s.min)+"px"):(i.style.left=n.position+"px",i.style.top=s.min+"px",i.style.height=Math.max(0,s.max-s.min)+"px"),e.appendChild(i),n.label){const r=document.createElement("div");r.className="restyld-guide-label",r.textContent=n.label,o?(r.style.left=s.min+"px",r.style.top=n.position+"px",r.style.transform="translateY(-100%) translateY(-4px)"):(r.style.left=n.position+"px",r.style.top=s.min+"px",r.style.transform="translateX(-50%) translateY(-100%)"),e.appendChild(r)}}}let S=null,$=null;const jt=6,Kt=10,qt=4,ut=["n","ne","e","se","s","sw","w","nw"];let D=null;const H=10,ft=10,A=new Map;let J=[];const Zt=50;let O=[],N=[];function R(){return JSON.parse(JSON.stringify(tt()))}function B(){const t=R();O.push(t),O.length>Zt&&O.shift(),N.length=0}function ht(t){const e=tt();it(e),ot(t||[]),A.clear(),Array.isArray(t)&&t.forEach(n=>{n&&Array.isArray(n.path)&&A.set(Q(n.path),{...n})}),F(),z()}function Jt(){if(O.length===0)return;const t=O.pop();N.push(R()),ht(t)}function yt(){if(N.length===0)return;const t=N.pop();O.push(R()),ht(t)}function gt(t){if(!L||t.target.closest('input, textarea, [contenteditable="true"]'))return;const n=typeof navigator<"u"&&/Mac|iPod|iPhone|iPad/.test(navigator.platform);if(n?t.metaKey:t.ctrlKey){if(t.key==="z"||t.key==="Z"){t.shiftKey&&n?(t.preventDefault(),yt()):(t.preventDefault(),Jt());return}(t.key==="y"||t.key==="Y")&&!n&&(t.preventDefault(),yt())}}function Q(t){return Array.isArray(t)?t.join(","):""}function P(t,e){if(!t||!document.body.contains(t))return;const n=_t(t);if(n.length===0)return;const o=Q(n),i=A.get(o)||{path:n,styles:{}};e.removed!==void 0&&(i.removed=e.removed,i.removedHtml=e.removedHtml),e.styles&&typeof e.styles=="object"&&Object.assign(i.styles,e.styles),A.set(o,i)}function tt(){return Array.from(A.values())}function et(t){return t.closest(`.${Gt}`)!=null||t.closest(".restyld-resize-handles")!=null||t.closest(".restyld-toolbar-overlay")!=null}function W(){T&&T.style&&(T.style.outline="",T.style.outlineOffset="",T=null)}function U(){l&&l.style&&(l.style.outline="",l.style.outlineOffset="",l.classList.remove("restyld-selected"),l=null)}function Rt(t){!t||t===l||(W(),T=t,t.style.outline=Vt,t.style.outlineOffset="2px")}function mt(t){U(),l=t,t&&(t.style.outline=Wt,t.style.outlineOffset="2px",t.classList.add("restyld-selected"))}function bt(t){return t?{tagName:t.tagName||"",id:t.id||"",className:(t.className&&typeof t.className=="string"?t.className:"")||""}:{}}function xt(t){if(!t)return{};const e=getComputedStyle(t),n=t.getBoundingClientRect(),o=i=>i!=null&&i!==""?String(i):void 0;return{backgroundColor:o(t.style.backgroundColor)||e.backgroundColor,opacity:o(t.style.opacity)??e.opacity,width:o(t.style.width)||(n.width?`${n.width}px`:void 0),height:o(t.style.height)||(n.height?`${n.height}px`:void 0),borderRadius:o(t.style.borderRadius)||e.borderRadius,transform:o(t.style.transform)||e.transform,fontFamily:o(t.style.fontFamily)||e.fontFamily,fontSize:o(t.style.fontSize)||e.fontSize,fontWeight:o(t.style.fontWeight)||e.fontWeight,color:o(t.style.color)||e.color,textAlign:o(t.style.textAlign)||e.textAlign,padding:o(t.style.padding)||e.padding,margin:o(t.style.margin)||e.margin,borderStyle:o(t.style.borderStyle)||e.borderStyle,borderWidth:o(t.style.borderWidth)||e.borderWidth,borderColor:o(t.style.borderColor)||e.borderColor,boxShadow:o(t.style.boxShadow)||e.boxShadow,backdropFilter:o(t.style.backdropFilter)||e.backdropFilter,position:o(t.style.position)||void 0,left:o(t.style.left)||void 0,top:o(t.style.top)||void 0}}function vt(t){if(!t||!document.body.contains(t))return;const e=t.offsetParent||t.parentElement||document.body;getComputedStyle(e).position==="static"&&(e.style.setProperty("position","relative"),e.dataset.restyldParentPosition="relative");const o=e.getBoundingClientRect(),i=t.getBoundingClientRect(),s=getComputedStyle(t),r=i.left-o.left,y=i.top-o.top,a=s.width&&s.width!=="auto"?s.width:`${i.width}px`,d=s.height&&s.height!=="auto"?s.height:`${i.height}px`;t.style.position="absolute",t.style.left=`${r}px`,t.style.top=`${y}px`,t.style.width=a,t.style.height=d,t.style.margin="0",t.setAttribute("data-restyld-modified","1"),P(t,{styles:{position:"absolute",left:r+"px",top:y+"px",width:a,height:d,margin:"0"}})}function F(){if(!S||!l||!document.body.contains(l))return;const t=l.getBoundingClientRect(),e=jt/2,n=Kt/2,o=qt/2,i={n:[t.left+t.width/2-n,t.top-o],ne:[t.right-e,t.top-e],e:[t.right-o,t.top+t.height/2-n],se:[t.right-e,t.bottom-e],s:[t.left+t.width/2-n,t.bottom-o],sw:[t.left-e,t.bottom-e],w:[t.left-o,t.top+t.height/2-n],nw:[t.left-e,t.top-e]};ut.forEach(s=>{const r=S.querySelector(`[data-handle="${s}"]`);r&&(r.style.left=`${i[s][0]}px`,r.style.top=`${i[s][1]}px`)})}function Qt(t,e){const n=l;if(!n||Y(n))return;e.preventDefault(),e.stopPropagation(),B(),vt(n);const i=(n.offsetParent||n.parentElement||document.body).getBoundingClientRect(),s=n.getBoundingClientRect();let r=e.clientX,y=e.clientY,a=s.left-i.left,d=s.top-i.top,p=s.width,f=s.height;const C=at(document,n,document.body),M=g=>{k==null&&(k=requestAnimationFrame(()=>{k=null;const m=g.clientX-r,E=g.clientY-y;let c=a,x=d,b=p,h=f;switch(t){case"e":b=Math.max(4,p+m);break;case"w":c=a+m,b=Math.max(4,p-m),r=g.clientX,a=c,p=b;break;case"s":h=Math.max(4,f+E);break;case"n":x=d+E,h=Math.max(4,f-E),y=g.clientY,d=x,f=h;break;case"se":b=Math.max(4,p+m),h=Math.max(4,f+E);break;case"sw":c=a+m,b=Math.max(4,p-m),h=Math.max(4,f+E),r=g.clientX,y=g.clientY,a=c,p=b,f=h;break;case"ne":x=d+E,b=Math.max(4,p+m),h=Math.max(4,f-E),r=g.clientX,y=g.clientY,d=x,p=b,f=h;break;case"nw":c=a+m,x=d+E,b=Math.max(4,p-m),h=Math.max(4,f-E),r=g.clientX,y=g.clientY,a=c,d=x,p=b,f=h;break}if(n.style.left=`${c}px`,n.style.top=`${x}px`,n.style.width=`${b}px`,n.style.height=`${h}px`,P(n,{styles:{left:c+"px",top:x+"px",width:b+"px",height:h+"px"}}),F(),C&&C.length>0){const u=n.getBoundingClientRect(),v={left:u.left,top:u.top,right:u.right,bottom:u.bottom,width:u.width,height:u.height,centerX:u.left+u.width/2,centerY:u.top+u.height/2},{guides:X}=Ft(v,t,C);pt(X)}else I()}))},w=()=>{document.removeEventListener("mousemove",M),document.removeEventListener("mouseup",w),k!=null&&cancelAnimationFrame(k),I()};document.addEventListener("mousemove",M,{passive:!0}),document.addEventListener("mouseup",w,{once:!0})}function te(){if(j(),!l)return;const t=document.createElement("div");t.className="restyld-resize-handles",S=t,ut.forEach(n=>{const o=document.createElement("div");o.className="restyld-resize-handle",o.setAttribute("data-handle",n),o.addEventListener("mousedown",i=>Qt(n,i)),t.appendChild(o)}),document.body.appendChild(t),F();const e=()=>{S&&l&&document.body.contains(l)&&(F(),kt()),$=requestAnimationFrame(e)};$=requestAnimationFrame(e)}function j(){$!=null&&(cancelAnimationFrame($),$=null),S&&S.parentNode&&S.parentNode.removeChild(S),S=null}function Y(t){return t&&t.dataset.restyldLocked==="1"}function ee(t,e){t&&(e?(t.dataset.restyldLocked="1",t.classList.add("restyld-locked")):(delete t.dataset.restyldLocked,t.classList.remove("restyld-locked")))}const wt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',Et='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>',ne='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',oe='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',re='<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="6" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="18" r="1.5"/></svg>';function Mt(){if(K(),!l||!document.body.contains(l))return;const t=document.createElement("div");t.className="restyld-toolbar-overlay";const e=document.createElement("div");e.className="restyld-floating-toolbar";const n=document.createElement("button");n.type="button",n.className="restyld-toolbar-btn"+(Y(l)?" restyld-toolbar-btn--active":""),n.setAttribute("data-tooltip",Y(l)?"Unlock position":"Lock position"),n.innerHTML=Y(l)?Et:wt,n.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation();const p=!Y(l);ee(l,p),n.classList.toggle("restyld-toolbar-btn--active",p),n.innerHTML=p?Et:wt,n.setAttribute("data-tooltip",p?"Unlock position":"Lock position")});const o=document.createElement("button");o.type="button",o.className="restyld-toolbar-btn",o.setAttribute("data-tooltip","Duplicate"),o.innerHTML=ne,o.addEventListener("click",d=>{if(d.preventDefault(),d.stopPropagation(),!l||!document.body.contains(l))return;B();const p=l.parentElement||document.body,f=l.cloneNode(!0);f.removeAttribute("data-restyld-modified"),f.removeAttribute("data-restyld-locked"),f.classList.remove("restyld-selected","restyld-locked");const C=Array.from(p.children).indexOf(l);p.insertBefore(f,p.children[C+1]||null);const M=l.getBoundingClientRect(),w=p.getBoundingClientRect();getComputedStyle(p).position==="static"&&(p.style.setProperty("position","relative"),p.dataset.restyldParentPosition="relative");const m=M.left-w.left+ft,E=M.top-w.top+ft;f.style.position="absolute",f.style.left=`${m}px`,f.style.top=`${E}px`,f.style.width=`${M.width}px`,f.style.height=`${M.height}px`,f.style.margin="0",f.setAttribute("data-restyld-modified","1"),P(f,{styles:{position:"absolute",left:m+"px",top:E+"px",width:M.width+"px",height:M.height+"px",margin:"0"}}),mt(f),K(),Mt(),q(),Lt(),z()});let i=!1,s=null;const r=document.createElement("button");r.type="button",r.className="restyld-toolbar-btn restyld-toolbar-btn--danger",r.setAttribute("data-tooltip","Remove element"),r.innerHTML=oe,r.addEventListener("click",d=>{if(d.preventDefault(),d.stopPropagation(),!l)return;if(!i){i=!0,r.classList.add("restyld-toolbar-confirm"),r.setAttribute("data-tooltip-confirm","Click again to delete"),s=setTimeout(()=>{i=!1,r.classList.remove("restyld-toolbar-confirm"),r.removeAttribute("data-tooltip-confirm"),s=null},2e3);return}s&&clearTimeout(s),B();const p=l.outerHTML;P(l,{removed:!0,removedHtml:p}),l.remove(),l=null,K(),j(),U(),z()});const y=document.createElement("button");y.type="button",y.className="restyld-toolbar-btn",y.setAttribute("data-tooltip","More options"),y.innerHTML=re,y.addEventListener("click",d=>{d.preventDefault(),d.stopPropagation()});const a=document.createElement("div");a.className="restyld-toolbar-divider",e.appendChild(n),e.appendChild(o),e.appendChild(r),e.appendChild(a),e.appendChild(y),t.appendChild(e),document.body.appendChild(t),D=t,kt()}function kt(){if(!D||!l||!document.body.contains(l))return;const t=D.querySelector(".restyld-floating-toolbar");if(!t)return;const e=l.getBoundingClientRect(),n=t.getBoundingClientRect();document.documentElement.clientHeight||window.innerHeight;const o=document.documentElement.clientWidth||window.innerWidth;let i=e.top-H-n.height;i<H&&(i=e.bottom+H);let s=e.left+e.width/2-n.width/2;s<H&&(s=H),s+n.width>o-H&&(s=o-n.width-H),t.style.position="fixed",t.style.left=`${s}px`,t.style.top=`${i}px`}function K(){D&&D.parentNode&&D.parentNode.removeChild(D),D=null}function z(){try{chrome.runtime.sendMessage({type:"SELECTED_ELEMENT",selected:l?{elementInfo:bt(l),initialStyles:xt(l)}:null,isRepositionMode:!1})}catch{}}function ie(){l&&(te(),Mt(),Lt(),z())}function Ct(){q(),j(),K(),I(),U(),l=null,z()}function Lt(){const t=l;if(!t||!document.body.contains(t))return;q();const e=n=>{if(n.target!==t&&!t.contains(n.target)||Y(t))return;n.preventDefault(),n.stopPropagation();let o=n.clientX,i=n.clientY,s=!1,r=0,y=0,a=null;const d=f=>{const C=f.clientX-o,M=f.clientY-i;if(!s){if(Math.abs(C)<ct&&Math.abs(M)<ct)return;B(),vt(t);const g=(t.offsetParent||t.parentElement||document.body).getBoundingClientRect(),m=t.getBoundingClientRect();r=m.left-g.left,y=m.top-g.top,o=f.clientX,i=f.clientY,s=!0,a=at(document,t,document.body)}k==null&&(k=requestAnimationFrame(()=>{k=null;let w=r+(f.clientX-o),g=y+(f.clientY-i);const m=t.getBoundingClientRect();if(a&&a.length>0){const c=(t.offsetParent||t.parentElement||document.body).getBoundingClientRect(),x={left:c.left+w,top:c.top+g,right:c.left+w+m.width,bottom:c.top+g+m.height,width:m.width,height:m.height,centerX:c.left+w+m.width/2,centerY:c.top+g+m.height/2},{guides:b,snap:h}=dt(x,a);pt(b),h.left!=null&&(w=h.left-c.left),h.top!=null&&(g=h.top-c.top)}else I();t.style.left=`${w}px`,t.style.top=`${g}px`,P(t,{styles:{left:t.style.left,top:t.style.top}}),F(),r=w,y=g,o=f.clientX,i=f.clientY}))},p=()=>{document.removeEventListener("mousemove",d),document.removeEventListener("mouseup",p),k!=null&&cancelAnimationFrame(k),I(),s&&z()};document.addEventListener("mousemove",d,{passive:!0}),document.addEventListener("mouseup",p,{once:!0})};t.addEventListener("mousedown",e,!0),t._restyldCleanupDrag=()=>{t.removeEventListener("mousedown",e,!0),delete t._restyldCleanupDrag}}function q(){l&&l._restyldCleanupDrag&&l._restyldCleanupDrag()}function St(t){L&&(et(t.target)||l||Rt(t.target))}function At(t){L&&(et(t.target)||l||T&&!T.contains(t.relatedTarget)&&W())}function Tt(t){if(L&&!et(t.target)){if(l&&l!==t.target&&!l.contains(t.target)){t.preventDefault(),t.stopPropagation();return}t.preventDefault(),t.stopPropagation(),W(),mt(t.target),ie()}}function se(){L||(L=!0,document.addEventListener("mouseover",St,!0),document.addEventListener("mouseout",At,!0),document.addEventListener("click",Tt,!0),document.addEventListener("keydown",gt,!0))}function le(){L&&(L=!1,document.removeEventListener("mouseover",St,!0),document.removeEventListener("mouseout",At,!0),document.removeEventListener("click",Tt,!0),document.removeEventListener("keydown",gt,!0),W(),q(),Ct())}chrome.runtime.onMessage.addListener((t,e,n)=>{if(t.type==="ENABLE_DESIGN_MODE")se(),n({ok:!0,designMode:!0});else if(t.type==="DISABLE_DESIGN_MODE")le(),n({ok:!0,designMode:!1});else if(t.type==="GET_DESIGN_MODE")n({designMode:L});else if(t.type==="GET_SELECTED_ELEMENT")!l||!document.body.contains(l)?n({selected:null}):n({selected:{elementInfo:bt(l),initialStyles:xt(l)},isRepositionMode:!1});else if(t.type==="APPLY_STYLE"){const o=t.styles||{};if(l&&document.body.contains(l)){B(),l.setAttribute("data-restyld-modified","1");const i={};for(const[s,r]of Object.entries(o))r!=null&&r!==""&&(l.style[s]=r,i[s]=r);Object.keys(i).length&&P(l,{styles:i})}n({ok:!0})}else if(t.type==="DESELECT")Ct(),n({ok:!0});else if(t.type==="REMOVE_ELEMENT"){if(l){B();const o=l.outerHTML;P(l,{removed:!0,removedHtml:o}),l.remove(),l=null}j(),U(),z(),n({ok:!0})}else if(t.type==="REPOSITION_START")n({ok:!0});else if(t.type==="REPOSITION_DONE")l&&z(),n({ok:!0});else if(t.type==="GET_MODIFICATIONS")n({ok:!0,modifications:tt()});else if(t.type==="APPLY_SKIN"){const o=t.modifications||[];O.length=0,N.length=0;const i=ot(o);J=o,A.clear(),o.forEach(s=>{s&&Array.isArray(s.path)&&A.set(Q(s.path),{...s})}),n({ok:!0,...i})}else if(t.type==="RESET"){O.length=0,N.length=0;const o=t.modifications!=null?t.modifications:J;let i;Array.isArray(o)&&o.length>0?(i=it(o),J=[],A.clear()):(i={cleared:Pt(),restored:0,missing:0},A.clear()),n({ok:!0,...i})}return!0})})();
