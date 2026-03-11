(function(){"use strict";var qt={env:{NODE_ENV:"production"},emit:function(){}};const Et=`/* ReStyld control panel - injected into page, high specificity */
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
`;function wt(t){let e=0,n=t.previousElementSibling;for(;n;)e++,n=n.previousElementSibling;return e}function Mt(t,e=document.body){if(!t||!e||!e.contains(t))return[];const n=[];let o=t;for(;o&&o!==e;)n.unshift(wt(o)),o=o.parentElement;return n}function G(t,e){if(!t||!Array.isArray(e)||e.length===0)return null;let n=t;for(let o=0;o<e.length;o++){const r=e[o],s=n.children;if(r<0||r>=s.length||(n=s[r],!n))return null}return n}const X=document.body,Q=["position","left","top","width","height","backgroundColor","margin","opacity","borderRadius","transform","fontFamily","fontSize","fontWeight","color","textAlign","padding","borderStyle","borderWidth","borderColor","boxShadow","backdropFilter"];function vt(t,e){const n=G(X,t.path);if(!n)return e.missing++,!1;if(t.removed)return n.remove(),e.removed++,!0;if(t.styles&&typeof t.styles=="object"){const o=n.style;for(const r of Q)if(Object.prototype.hasOwnProperty.call(t.styles,r)){const s=t.styles[r];o[r]=s!=null?String(s):""}n.setAttribute("data-restyld-modified","1"),e.applied++}return!0}function R(t){const e={applied:0,removed:0,missing:0};if(!Array.isArray(t))return e;for(const n of t)!n||!Array.isArray(n.path)||vt(n,e);return e}function tt(t){const e=t.style;for(const n of Q)e[n]="";t.removeAttribute("data-restyld-modified")}function et(t){const e={cleared:0,restored:0,missing:0};if(!Array.isArray(t))return e;for(const n of t){if(!n||!Array.isArray(n.path))continue;if(n.removed&&n.removedHtml){const r=n.path.slice(0,-1),s=n.path[n.path.length-1],i=r.length===0?X:G(X,r);if(!i){e.missing++;continue}try{const f=document.createElement("div");f.innerHTML=n.removedHtml;const l=f.firstElementChild;if(l){const p=i.children[s]||null;i.insertBefore(l,p),e.restored++}}catch{e.missing++}continue}const o=G(X,n.path);if(!o){e.missing++;continue}tt(o),e.cleared++}return e}function St(){const t=document.querySelectorAll('[data-restyld-modified="1"]');return t.forEach(tt),t.length}const nt=5,kt=5,At=2,Ct=80,ot=4,B=100;function Lt(t){const e=t.getBoundingClientRect();return{left:e.left,top:e.top,right:e.right,bottom:e.bottom,width:e.width,height:e.height,centerX:e.left+e.width/2,centerY:e.top+e.height/2}}function Dt(t,e){return!(t.right<e.left||t.left>e.right||t.bottom<e.top||t.top>e.bottom)}function it(t,e,n){const o={left:-B,top:-B,right:(t.documentElement.clientWidth||window.innerWidth)+B,bottom:(t.documentElement.clientHeight||window.innerHeight)+B},r=n||t.body,s=[],i=new Set;function f(l){if(!l||l.nodeType!==1)return;if(l===t.body||l===t.documentElement){for(let h=0;h<l.children.length;h++)f(l.children[h]);return}if(l===e||e&&(l===e||e.contains(l))||l.closest&&(l.closest(".restyld-resize-handles")||l.closest(".restyld-guides-overlay"))||i.has(l))return;i.add(l);const p=Lt(l);if(!(p.width<ot||p.height<ot)&&Dt(p,o)&&(s.push(p),!(s.length>=Ct)))for(let h=0;h<l.children.length;h++)f(l.children[h])}return f(r),s}function rt(t,e,n={}){const o=n.threshold??nt,r=n.snapThreshold??kt,s=[];let i=null,f=null,l=r+1,p=r+1;const h=[{key:"top",value:a=>a.top,orient:"h",style:"solid"},{key:"bottom",value:a=>a.bottom,orient:"h",style:"solid"},{key:"left",value:a=>a.left,orient:"v",style:"solid"},{key:"right",value:a=>a.right,orient:"v",style:"solid"}],y=t.top;t.bottom;const D=t.left;t.right;const I=t.centerX,w=t.centerY,g=(a,b,m)=>{let c=a,u=a;for(const E of m)b==="h"?(c=Math.min(c,E.left,t.left),u=Math.max(u,E.right,t.right)):(c=Math.min(c,E.top,t.top),u=Math.max(u,E.bottom,t.bottom));return{min:c,max:u}};for(const a of h){const b=a.value(t),m=new Map;for(const c of e){const u=a.value(c),E=Math.abs(b-u);if(E<=o){const H=Math.round(u);(!m.has(H)||E<Math.abs(b-m.get(H)))&&m.set(H,u)}}for(const[,c]of m){const u=Math.abs(b-c);if(s.push({type:"edge",orientation:a.orient,position:c,extent:g(c,a.orient,e),style:"solid"}),a.key==="left"&&u<l&&(l=u,i=c),a.key==="top"&&u<p&&(p=u,f=c),a.key==="right"&&u<l){const E=c-t.width;Math.abs(D-E)<l&&(l=Math.abs(D-E),i=E)}if(a.key==="bottom"&&u<p){const E=c-t.height;Math.abs(y-E)<p&&(p=Math.abs(y-E),f=E)}}}const x=[{orient:"v",activeVal:I,getVal:a=>a.centerX},{orient:"h",activeVal:w,getVal:a=>a.centerY}];for(const{orient:a,activeVal:b,getVal:m}of x){const c=new Map;for(const u of e){const E=m(u);if(Math.abs(b-E)<=o){const xt=Math.round(E);c.has(xt)||c.set(xt,E)}}for(const[,u]of c)s.push({type:"center",orientation:a,position:u,extent:g(u,a,e),style:"dotted"}),a==="v"&&Math.abs(b-u)<l&&(l=Math.abs(b-u),i=u-t.width/2),a==="h"&&Math.abs(b-u)<p&&(p=Math.abs(b-u),f=u-t.height/2)}const M=zt(t,e);return s.push(...M.guides),{guides:s,snap:{left:i,top:f}}}function zt(t,e){const n=[],o=At,r=[],s=[];for(const i of e)Math.abs(i.right-t.left)<50&&r.push({gap:t.left-i.right,pos:i.right,orient:"v"}),Math.abs(i.left-t.right)<50&&r.push({gap:i.left-t.right,pos:t.right,orient:"v"}),Math.abs(i.bottom-t.top)<50&&s.push({gap:t.top-i.bottom,pos:i.bottom,orient:"h"}),Math.abs(i.top-t.bottom)<50&&s.push({gap:i.top-t.bottom,pos:t.bottom,orient:"h"});for(const i of r){if(i.gap<=0||i.gap>500)continue;if(r.some(l=>l!==i&&Math.abs(l.gap-i.gap)<=o)){const l=i.orient==="v"?{min:Math.min(t.top,t.bottom),max:Math.max(t.top,t.bottom)}:{min:Math.min(t.left,t.right),max:Math.max(t.left,t.right)};n.push({type:"spacing",orientation:i.orient,position:i.pos,extent:l,style:"solid",label:`${Math.round(i.gap)}px`}),i.orient==="v"&&i.pos===t.right&&t.left+i.gap}}for(const i of s){if(i.gap<=0||i.gap>500)continue;if(s.some(l=>l!==i&&Math.abs(l.gap-i.gap)<=o)){const l=i.orient==="h"?{min:Math.min(t.left,t.right),max:Math.max(t.left,t.right)}:{min:Math.min(t.top,t.bottom),max:Math.max(t.top,t.bottom)};n.push({type:"spacing",orientation:i.orient,position:i.pos,extent:l,style:"solid",label:`${Math.round(i.gap)}px`}),i.orient==="h"&&i.pos===t.bottom&&t.top+i.gap}}return{guides:n,snapLeft:null,snapTop:null}}function Tt(t,e,n,o={}){const r=o.threshold??nt,i=rt(t,n,{...o,snapThreshold:0}).guides,f=r,l=r;for(const p of n)Math.abs(t.width-p.width)<=f&&(e==="e"||e==="w"||e==="ne"||e==="nw"||e==="se"||e==="sw")&&i.push({type:"size",orientation:"v",position:t.left+p.width,extent:{min:Math.min(t.top,t.bottom),max:Math.max(t.top,t.bottom)},style:"dotted",label:`${Math.round(p.width)}px`}),Math.abs(t.height-p.height)<=l&&(e==="n"||e==="s"||e==="ne"||e==="nw"||e==="se"||e==="sw")&&i.push({type:"size",orientation:"h",position:t.top+p.height,extent:{min:Math.min(t.left,t.right),max:Math.max(t.left,t.right)},style:"dotted",label:`${Math.round(p.height)}px`});return{guides:i}}(function(){const e=document.createElement("style");e.textContent=Et,(document.head||document.documentElement).appendChild(e)})();const Ot="restyld-root",_t="2px solid rgba(255, 0, 0, 0.5)",It="3px solid #2563eb";let S=!1,C=null,d=null,v=null;const st=4;let z=null;function Ht(){return z||(z=document.createElement("div"),z.className="restyld-guides-overlay",document.body.appendChild(z)),z}function T(){z&&(z.innerHTML="")}function lt(t){if(!t||t.length===0){T();return}const e=Ht();e.innerHTML="";for(const n of t){const o=n.orientation==="h",r=document.createElement("div");r.className="restyld-guide-line restyld-guide-line--"+(o?"horizontal":"vertical"),n.style==="dotted"&&r.classList.add("restyld-guide-line--dotted");const s=n.extent||{min:0,max:0};if(o?(r.style.top=n.position+"px",r.style.left=s.min+"px",r.style.width=Math.max(0,s.max-s.min)+"px"):(r.style.left=n.position+"px",r.style.top=s.min+"px",r.style.height=Math.max(0,s.max-s.min)+"px"),e.appendChild(r),n.label){const i=document.createElement("div");i.className="restyld-guide-label",i.textContent=n.label,o?(i.style.left=s.min+"px",i.style.top=n.position+"px",i.style.transform="translateY(-100%) translateY(-4px)"):(i.style.left=n.position+"px",i.style.top=s.min+"px",i.style.transform="translateX(-50%) translateY(-100%)"),e.appendChild(i)}}}let k=null,P=null;const Pt=6,Yt=10,Nt=4,at=["n","ne","e","se","s","sw","w","nw"],A=new Map;let V=[];const Xt=50;let L=[],O=[];function W(){return JSON.parse(JSON.stringify(K()))}function $(){const t=W();L.push(t),L.length>Xt&&L.shift(),O.length=0}function dt(t){const e=K();et(e),R(t||[]),A.clear(),Array.isArray(t)&&t.forEach(n=>{n&&Array.isArray(n.path)&&A.set(j(n.path),{...n})}),N(),_()}function Bt(){if(L.length===0)return;const t=L.pop();O.push(W()),dt(t)}function ut(){if(O.length===0)return;const t=O.pop();L.push(W()),dt(t)}function ct(t){if(!S||t.target.closest('input, textarea, [contenteditable="true"]'))return;const n=typeof navigator<"u"&&/Mac|iPod|iPhone|iPad/.test(navigator.platform);if(n?t.metaKey:t.ctrlKey){if(t.key==="z"||t.key==="Z"){t.shiftKey&&n?(t.preventDefault(),ut()):(t.preventDefault(),Bt());return}(t.key==="y"||t.key==="Y")&&!n&&(t.preventDefault(),ut())}}function j(t){return Array.isArray(t)?t.join(","):""}function Y(t,e){if(!t||!document.body.contains(t))return;const n=Mt(t);if(n.length===0)return;const o=j(n),r=A.get(o)||{path:n,styles:{}};e.removed!==void 0&&(r.removed=e.removed,r.removedHtml=e.removedHtml),e.styles&&typeof e.styles=="object"&&Object.assign(r.styles,e.styles),A.set(o,r)}function K(){return Array.from(A.values())}function U(t){return t.closest(`.${Ot}`)!=null||t.closest(".restyld-resize-handles")!=null}function F(){C&&C.style&&(C.style.outline="",C.style.outlineOffset="",C=null)}function q(){d&&d.style&&(d.style.outline="",d.style.outlineOffset="",d.classList.remove("restyld-selected"),d=null)}function $t(t){!t||t===d||(F(),C=t,t.style.outline=_t,t.style.outlineOffset="2px")}function Ft(t){q(),d=t,t&&(t.style.outline=It,t.style.outlineOffset="2px",t.classList.add("restyld-selected"))}function pt(t){return t?{tagName:t.tagName||"",id:t.id||"",className:(t.className&&typeof t.className=="string"?t.className:"")||""}:{}}function ft(t){if(!t)return{};const e=getComputedStyle(t),n=t.getBoundingClientRect(),o=r=>r!=null&&r!==""?String(r):void 0;return{backgroundColor:o(t.style.backgroundColor)||e.backgroundColor,opacity:o(t.style.opacity)??e.opacity,width:o(t.style.width)||(n.width?`${n.width}px`:void 0),height:o(t.style.height)||(n.height?`${n.height}px`:void 0),borderRadius:o(t.style.borderRadius)||e.borderRadius,transform:o(t.style.transform)||e.transform,fontFamily:o(t.style.fontFamily)||e.fontFamily,fontSize:o(t.style.fontSize)||e.fontSize,fontWeight:o(t.style.fontWeight)||e.fontWeight,color:o(t.style.color)||e.color,textAlign:o(t.style.textAlign)||e.textAlign,padding:o(t.style.padding)||e.padding,margin:o(t.style.margin)||e.margin,borderStyle:o(t.style.borderStyle)||e.borderStyle,borderWidth:o(t.style.borderWidth)||e.borderWidth,borderColor:o(t.style.borderColor)||e.borderColor,boxShadow:o(t.style.boxShadow)||e.boxShadow,backdropFilter:o(t.style.backdropFilter)||e.backdropFilter,position:o(t.style.position)||void 0,left:o(t.style.left)||void 0,top:o(t.style.top)||void 0}}function ht(t){if(!t||!document.body.contains(t))return;const e=t.offsetParent||t.parentElement||document.body;getComputedStyle(e).position==="static"&&(e.style.setProperty("position","relative"),e.dataset.restyldParentPosition="relative");const o=e.getBoundingClientRect(),r=t.getBoundingClientRect(),s=getComputedStyle(t),i=r.left-o.left,f=r.top-o.top,l=s.width&&s.width!=="auto"?s.width:`${r.width}px`,p=s.height&&s.height!=="auto"?s.height:`${r.height}px`;t.style.position="absolute",t.style.left=`${i}px`,t.style.top=`${f}px`,t.style.width=l,t.style.height=p,t.style.margin="0",t.setAttribute("data-restyld-modified","1"),Y(t,{styles:{position:"absolute",left:i+"px",top:f+"px",width:l,height:p,margin:"0"}})}function N(){if(!k||!d||!document.body.contains(d))return;const t=d.getBoundingClientRect(),e=Pt/2,n=Yt/2,o=Nt/2,r={n:[t.left+t.width/2-n,t.top-o],ne:[t.right-e,t.top-e],e:[t.right-o,t.top+t.height/2-n],se:[t.right-e,t.bottom-e],s:[t.left+t.width/2-n,t.bottom-o],sw:[t.left-e,t.bottom-e],w:[t.left-o,t.top+t.height/2-n],nw:[t.left-e,t.top-e]};at.forEach(s=>{const i=k.querySelector(`[data-handle="${s}"]`);i&&(i.style.left=`${r[s][0]}px`,i.style.top=`${r[s][1]}px`)})}function Gt(t,e){const n=d;if(!n)return;e.preventDefault(),e.stopPropagation(),$(),ht(n);const r=(n.offsetParent||n.parentElement||document.body).getBoundingClientRect(),s=n.getBoundingClientRect();let i=e.clientX,f=e.clientY,l=s.left-r.left,p=s.top-r.top,h=s.width,y=s.height;const D=it(document,n,document.body),I=g=>{v==null&&(v=requestAnimationFrame(()=>{v=null;const x=g.clientX-i,M=g.clientY-f;let a=l,b=p,m=h,c=y;switch(t){case"e":m=Math.max(4,h+x);break;case"w":a=l+x,m=Math.max(4,h-x),i=g.clientX,l=a,h=m;break;case"s":c=Math.max(4,y+M);break;case"n":b=p+M,c=Math.max(4,y-M),f=g.clientY,p=b,y=c;break;case"se":m=Math.max(4,h+x),c=Math.max(4,y+M);break;case"sw":a=l+x,m=Math.max(4,h-x),c=Math.max(4,y+M),i=g.clientX,f=g.clientY,l=a,h=m,y=c;break;case"ne":b=p+M,m=Math.max(4,h+x),c=Math.max(4,y-M),i=g.clientX,f=g.clientY,p=b,h=m,y=c;break;case"nw":a=l+x,b=p+M,m=Math.max(4,h-x),c=Math.max(4,y-M),i=g.clientX,f=g.clientY,l=a,p=b,h=m,y=c;break}if(n.style.left=`${a}px`,n.style.top=`${b}px`,n.style.width=`${m}px`,n.style.height=`${c}px`,Y(n,{styles:{left:a+"px",top:b+"px",width:m+"px",height:c+"px"}}),N(),D&&D.length>0){const u=n.getBoundingClientRect(),E={left:u.left,top:u.top,right:u.right,bottom:u.bottom,width:u.width,height:u.height,centerX:u.left+u.width/2,centerY:u.top+u.height/2},{guides:H}=Tt(E,t,D);lt(H)}else T()}))},w=()=>{document.removeEventListener("mousemove",I),document.removeEventListener("mouseup",w),v!=null&&cancelAnimationFrame(v),T()};document.addEventListener("mousemove",I,{passive:!0}),document.addEventListener("mouseup",w,{once:!0})}function Vt(){if(Z(),!d)return;const t=document.createElement("div");t.className="restyld-resize-handles",k=t,at.forEach(n=>{const o=document.createElement("div");o.className="restyld-resize-handle",o.setAttribute("data-handle",n),o.addEventListener("mousedown",r=>Gt(n,r)),t.appendChild(o)}),document.body.appendChild(t),N();const e=()=>{k&&d&&document.body.contains(d)&&N(),P=requestAnimationFrame(e)};P=requestAnimationFrame(e)}function Z(){P!=null&&(cancelAnimationFrame(P),P=null),k&&k.parentNode&&k.parentNode.removeChild(k),k=null}function _(){try{chrome.runtime.sendMessage({type:"SELECTED_ELEMENT",selected:d?{elementInfo:pt(d),initialStyles:ft(d)}:null,isRepositionMode:!1})}catch{}}function Wt(){d&&(Vt(),jt(),_())}function yt(){J(),Z(),T(),q(),d=null,_()}function jt(){const t=d;if(!t||!document.body.contains(t))return;J();const e=n=>{if(n.target!==t&&!t.contains(n.target))return;n.preventDefault(),n.stopPropagation();let o=n.clientX,r=n.clientY,s=!1,i=0,f=0,l=null;const p=y=>{const D=y.clientX-o,I=y.clientY-r;if(!s){if(Math.abs(D)<st&&Math.abs(I)<st)return;$(),ht(t);const g=(t.offsetParent||t.parentElement||document.body).getBoundingClientRect(),x=t.getBoundingClientRect();i=x.left-g.left,f=x.top-g.top,o=y.clientX,r=y.clientY,s=!0,l=it(document,t,document.body)}v==null&&(v=requestAnimationFrame(()=>{v=null;let w=i+(y.clientX-o),g=f+(y.clientY-r);const x=t.getBoundingClientRect();if(l&&l.length>0){const a=(t.offsetParent||t.parentElement||document.body).getBoundingClientRect(),b={left:a.left+w,top:a.top+g,right:a.left+w+x.width,bottom:a.top+g+x.height,width:x.width,height:x.height,centerX:a.left+w+x.width/2,centerY:a.top+g+x.height/2},{guides:m,snap:c}=rt(b,l);lt(m),c.left!=null&&(w=c.left-a.left),c.top!=null&&(g=c.top-a.top)}else T();t.style.left=`${w}px`,t.style.top=`${g}px`,Y(t,{styles:{left:t.style.left,top:t.style.top}}),N(),i=w,f=g,o=y.clientX,r=y.clientY}))},h=()=>{document.removeEventListener("mousemove",p),document.removeEventListener("mouseup",h),v!=null&&cancelAnimationFrame(v),T(),s&&_()};document.addEventListener("mousemove",p,{passive:!0}),document.addEventListener("mouseup",h,{once:!0})};t.addEventListener("mousedown",e,!0),t._restyldCleanupDrag=()=>{t.removeEventListener("mousedown",e,!0),delete t._restyldCleanupDrag}}function J(){d&&d._restyldCleanupDrag&&d._restyldCleanupDrag()}function gt(t){S&&(U(t.target)||d||$t(t.target))}function mt(t){S&&(U(t.target)||d||C&&!C.contains(t.relatedTarget)&&F())}function bt(t){if(S&&!U(t.target)){if(d&&d!==t.target&&!d.contains(t.target)){t.preventDefault(),t.stopPropagation();return}t.preventDefault(),t.stopPropagation(),F(),Ft(t.target),Wt()}}function Kt(){S||(S=!0,document.addEventListener("mouseover",gt,!0),document.addEventListener("mouseout",mt,!0),document.addEventListener("click",bt,!0),document.addEventListener("keydown",ct,!0))}function Ut(){S&&(S=!1,document.removeEventListener("mouseover",gt,!0),document.removeEventListener("mouseout",mt,!0),document.removeEventListener("click",bt,!0),document.removeEventListener("keydown",ct,!0),F(),J(),yt())}chrome.runtime.onMessage.addListener((t,e,n)=>{if(t.type==="ENABLE_DESIGN_MODE")Kt(),n({ok:!0,designMode:!0});else if(t.type==="DISABLE_DESIGN_MODE")Ut(),n({ok:!0,designMode:!1});else if(t.type==="GET_DESIGN_MODE")n({designMode:S});else if(t.type==="GET_SELECTED_ELEMENT")!d||!document.body.contains(d)?n({selected:null}):n({selected:{elementInfo:pt(d),initialStyles:ft(d)},isRepositionMode:!1});else if(t.type==="APPLY_STYLE"){const o=t.styles||{};if(d&&document.body.contains(d)){$(),d.setAttribute("data-restyld-modified","1");const r={};for(const[s,i]of Object.entries(o))i!=null&&i!==""&&(d.style[s]=i,r[s]=i);Object.keys(r).length&&Y(d,{styles:r})}n({ok:!0})}else if(t.type==="DESELECT")yt(),n({ok:!0});else if(t.type==="REMOVE_ELEMENT"){if(d){$();const o=d.outerHTML;Y(d,{removed:!0,removedHtml:o}),d.remove(),d=null}Z(),q(),_(),n({ok:!0})}else if(t.type==="REPOSITION_START")n({ok:!0});else if(t.type==="REPOSITION_DONE")d&&_(),n({ok:!0});else if(t.type==="GET_MODIFICATIONS")n({ok:!0,modifications:K()});else if(t.type==="APPLY_SKIN"){const o=t.modifications||[];L.length=0,O.length=0;const r=R(o);V=o,A.clear(),o.forEach(s=>{s&&Array.isArray(s.path)&&A.set(j(s.path),{...s})}),n({ok:!0,...r})}else if(t.type==="RESET"){L.length=0,O.length=0;const o=t.modifications!=null?t.modifications:V;let r;Array.isArray(o)&&o.length>0?(r=et(o),V=[],A.clear()):(r={cleared:St(),restored:0,missing:0},A.clear()),n({ok:!0,...r})}return!0})})();
