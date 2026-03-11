(function(){"use strict";var Ee={env:{NODE_ENV:"production"},emit:function(){}};const U=`/* ReStyld control panel - injected into page, high specificity */
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
`;function V(e){let t=0,n=e.previousElementSibling;for(;n;)t++,n=n.previousElementSibling;return t}function J(e,t=document.body){if(!e||!t||!t.contains(e))return[];const n=[];let o=e;for(;o&&o!==t;)n.unshift(V(o)),o=o.parentElement;return n}function D(e,t){if(!e||!Array.isArray(t)||t.length===0)return null;let n=e;for(let o=0;o<t.length;o++){const r=t[o],s=n.children;if(r<0||r>=s.length||(n=s[r],!n))return null}return n}const R=document.body,H=["position","left","top","width","height","backgroundColor","margin","opacity","borderRadius","transform","fontFamily","fontSize","fontWeight","color","textAlign","padding","borderStyle","borderWidth","borderColor","boxShadow","backdropFilter"];function Q(e,t){const n=D(R,e.path);if(!n)return t.missing++,!1;if(e.removed)return n.remove(),t.removed++,!0;if(e.styles&&typeof e.styles=="object"){const o=n.style;for(const r of H)if(Object.prototype.hasOwnProperty.call(e.styles,r)){const s=e.styles[r];o[r]=s!=null?String(s):""}n.setAttribute("data-restyld-modified","1"),t.applied++}return!0}function ee(e){const t={applied:0,removed:0,missing:0};if(!Array.isArray(e))return t;for(const n of e)!n||!Array.isArray(n.path)||Q(n,t);return t}function B(e){const t=e.style;for(const n of H)t[n]="";e.removeAttribute("data-restyld-modified")}function te(e){const t={cleared:0,restored:0,missing:0};if(!Array.isArray(e))return t;for(const n of e){if(!n||!Array.isArray(n.path))continue;if(n.removed&&n.removedHtml){const r=n.path.slice(0,-1),s=n.path[n.path.length-1],l=r.length===0?R:D(R,r);if(!l){t.missing++;continue}try{const h=document.createElement("div");h.innerHTML=n.removedHtml;const a=h.firstElementChild;if(a){const m=l.children[s]||null;l.insertBefore(a,m),t.restored++}}catch{t.missing++}continue}const o=D(R,n.path);if(!o){t.missing++;continue}B(o),t.cleared++}return t}function ne(){const e=document.querySelectorAll('[data-restyld-modified="1"]');return e.forEach(B),e.length}(function(){const t=document.createElement("style");t.textContent=U,(document.head||document.documentElement).appendChild(t)})();const oe="restyld-root",re="2px solid rgba(255, 0, 0, 0.5)",ie="3px solid #2563eb";let w=!1,S=null,i=null,z=!1,b=null,v=null,A=null;const se=6,le=10,ae=4,Y=["n","ne","e","se","s","sw","w","nw"],M=new Map;let T=[];function W(e){return Array.isArray(e)?e.join(","):""}function k(e,t){if(!e||!document.body.contains(e))return;const n=J(e);if(n.length===0)return;const o=W(n),r=M.get(o)||{path:n,styles:{}};t.removed!==void 0&&(r.removed=t.removed,r.removedHtml=t.removedHtml),t.styles&&typeof t.styles=="object"&&Object.assign(r.styles,t.styles),M.set(o,r)}function de(){return Array.from(M.values())}function P(e){return e.closest(`.${oe}`)!=null||e.closest(".restyld-resize-handles")!=null}function O(){S&&S.style&&(S.style.outline="",S.style.outlineOffset="",S=null)}function I(){i&&i.style&&(i.style.outline="",i.style.outlineOffset="",i.classList.remove("restyld-selected"),i=null)}function ce(e){!e||e===i||(O(),S=e,e.style.outline=re,e.style.outlineOffset="2px")}function ue(e){I(),i=e,e&&(e.style.outline=ie,e.style.outlineOffset="2px",e.classList.add("restyld-selected"))}function X(e){return e?{tagName:e.tagName||"",id:e.id||"",className:(e.className&&typeof e.className=="string"?e.className:"")||""}:{}}function j(e){if(!e)return{};const t=getComputedStyle(e),n=e.getBoundingClientRect(),o=r=>r!=null&&r!==""?String(r):void 0;return{backgroundColor:o(e.style.backgroundColor)||t.backgroundColor,opacity:o(e.style.opacity)??t.opacity,width:o(e.style.width)||(n.width?`${n.width}px`:void 0),height:o(e.style.height)||(n.height?`${n.height}px`:void 0),borderRadius:o(e.style.borderRadius)||t.borderRadius,transform:o(e.style.transform)||t.transform,fontFamily:o(e.style.fontFamily)||t.fontFamily,fontSize:o(e.style.fontSize)||t.fontSize,fontWeight:o(e.style.fontWeight)||t.fontWeight,color:o(e.style.color)||t.color,textAlign:o(e.style.textAlign)||t.textAlign,padding:o(e.style.padding)||t.padding,margin:o(e.style.margin)||t.margin,borderStyle:o(e.style.borderStyle)||t.borderStyle,borderWidth:o(e.style.borderWidth)||t.borderWidth,borderColor:o(e.style.borderColor)||t.borderColor,boxShadow:o(e.style.boxShadow)||t.boxShadow,backdropFilter:o(e.style.backdropFilter)||t.backdropFilter,position:o(e.style.position)||void 0,left:o(e.style.left)||void 0,top:o(e.style.top)||void 0}}function fe(e){if(!e||!document.body.contains(e))return;const t=e.offsetParent||e.parentElement||document.body;getComputedStyle(t).position==="static"&&(t.style.setProperty("position","relative"),t.dataset.restyldParentPosition="relative");const o=t.getBoundingClientRect(),r=e.getBoundingClientRect(),s=r.left-o.left,l=r.top-o.top;e.style.position="absolute",e.style.left=`${s}px`,e.style.top=`${l}px`,e.style.width=`${r.width}px`,e.style.height=`${r.height}px`,e.style.margin="0",e.setAttribute("data-restyld-modified","1"),k(e,{styles:{position:"absolute",left:s+"px",top:l+"px",width:r.width+"px",height:r.height+"px",margin:"0"}})}function N(){if(!v||!i||!document.body.contains(i))return;const e=i.getBoundingClientRect(),t=se/2,n=le/2,o=ae/2,r={n:[e.left+e.width/2-n,e.top-o],ne:[e.right-t,e.top-t],e:[e.right-o,e.top+e.height/2-n],se:[e.right-t,e.bottom-t],s:[e.left+e.width/2-n,e.bottom-o],sw:[e.left-t,e.bottom-t],w:[e.left-o,e.top+e.height/2-n],nw:[e.left-t,e.top-t]};Y.forEach(s=>{const l=v.querySelector(`[data-handle="${s}"]`);l&&(l.style.left=`${r[s][0]}px`,l.style.top=`${r[s][1]}px`)})}function pe(e,t){const n=i;if(!n)return;t.preventDefault(),t.stopPropagation(),fe(n);const r=(n.offsetParent||n.parentElement||document.body).getBoundingClientRect(),s=n.getBoundingClientRect();let l=t.clientX,h=t.clientY,a=s.left-r.left,m=s.top-r.top,c=s.width,u=s.height;const _=f=>{b==null&&(b=requestAnimationFrame(()=>{b=null;const p=f.clientX-l,g=f.clientY-h;let x=a,E=m,d=c,y=u;switch(e){case"e":d=Math.max(4,c+p);break;case"w":x=a+p,d=Math.max(4,c-p),l=f.clientX,a=x,c=d;break;case"s":y=Math.max(4,u+g);break;case"n":E=m+g,y=Math.max(4,u-g),h=f.clientY,m=E,u=y;break;case"se":d=Math.max(4,c+p),y=Math.max(4,u+g);break;case"sw":x=a+p,d=Math.max(4,c-p),y=Math.max(4,u+g),l=f.clientX,h=f.clientY,a=x,c=d,u=y;break;case"ne":E=m+g,d=Math.max(4,c+p),y=Math.max(4,u-g),l=f.clientX,h=f.clientY,m=E,c=d,u=y;break;case"nw":x=a+p,E=m+g,d=Math.max(4,c-p),y=Math.max(4,u-g),l=f.clientX,h=f.clientY,a=x,m=E,c=d,u=y;break}n.style.left=`${x}px`,n.style.top=`${E}px`,n.style.width=`${d}px`,n.style.height=`${y}px`,k(n,{styles:{left:x+"px",top:E+"px",width:d+"px",height:y+"px"}}),N()}))},C=()=>{document.removeEventListener("mousemove",_),document.removeEventListener("mouseup",C),b!=null&&cancelAnimationFrame(b)};document.addEventListener("mousemove",_,{passive:!0}),document.addEventListener("mouseup",C,{once:!0})}function ye(){if($(),!i)return;const e=document.createElement("div");e.className="restyld-resize-handles",v=e,Y.forEach(n=>{const o=document.createElement("div");o.className="restyld-resize-handle",o.setAttribute("data-handle",n),o.addEventListener("mousedown",r=>pe(n,r)),e.appendChild(o)}),document.body.appendChild(e),N();const t=()=>{v&&i&&document.body.contains(i)&&N(),A=requestAnimationFrame(t)};A=requestAnimationFrame(t)}function $(){A!=null&&(cancelAnimationFrame(A),A=null),v&&v.parentNode&&v.parentNode.removeChild(v),v=null}function L(){try{chrome.runtime.sendMessage({type:"SELECTED_ELEMENT",selected:i?{elementInfo:X(i),initialStyles:j(i)}:null,isRepositionMode:i?z:!1})}catch{}}function he(){i&&L()}function me(){i&&(ye(),L())}function G(){$(),I(),i=null,L()}function ge(){if(!i)return;z=!0;const e=i,t=e.offsetParent||e.parentElement||document.body;getComputedStyle(t).position==="static"&&(t.style.setProperty("position","relative"),t.dataset.restyldParentPosition="relative");const o=t.getBoundingClientRect(),r=e.getBoundingClientRect(),s=r.left-o.left,l=r.top-o.top;e.style.position="absolute",e.style.left=`${s}px`,e.style.top=`${l}px`,e.style.width=`${r.width}px`,e.style.height=`${r.height}px`,e.style.margin="0",e.setAttribute("data-restyld-modified","1"),k(e,{styles:{position:"absolute",left:s+"px",top:l+"px",width:r.width+"px",height:r.height+"px",margin:"0"}}),he();const h=a=>{if(a.target!==e&&!e.contains(a.target))return;a.preventDefault(),a.stopPropagation();const m=a.clientX,c=a.clientY,u=parseFloat(e.style.left)||0,_=parseFloat(e.style.top)||0,C=p=>{b==null&&(b=requestAnimationFrame(()=>{b=null;const g=p.clientX-m,x=p.clientY-c,E=u+g,d=_+x;e.style.left=`${E}px`,e.style.top=`${d}px`,k(e,{styles:{left:e.style.left,top:e.style.top}})}))},f=()=>{document.removeEventListener("mousemove",C),document.removeEventListener("mouseup",f),b!=null&&cancelAnimationFrame(b)};document.addEventListener("mousemove",C,{passive:!0}),document.addEventListener("mouseup",f,{once:!0})};e.addEventListener("mousedown",h),e.dataset.restyldRepositionListener="1",e._restyldCleanupReposition=()=>{e.removeEventListener("mousedown",h),delete e._restyldCleanupReposition,delete e.dataset.restyldRepositionListener}}function F(){z=!1,i&&i._restyldCleanupReposition&&i._restyldCleanupReposition(),i&&L()}function q(e){w&&(P(e.target)||i||ce(e.target))}function Z(e){w&&(P(e.target)||i||S&&!S.contains(e.relatedTarget)&&O())}function K(e){if(w&&!P(e.target)){if(i&&i!==e.target&&!i.contains(e.target)){e.preventDefault(),e.stopPropagation();return}e.preventDefault(),e.stopPropagation(),O(),ue(e.target),me()}}function be(){w||(w=!0,document.addEventListener("mouseover",q,!0),document.addEventListener("mouseout",Z,!0),document.addEventListener("click",K,!0))}function xe(){w&&(w=!1,document.removeEventListener("mouseover",q,!0),document.removeEventListener("mouseout",Z,!0),document.removeEventListener("click",K,!0),O(),F(),G())}chrome.runtime.onMessage.addListener((e,t,n)=>{if(e.type==="ENABLE_DESIGN_MODE")be(),n({ok:!0,designMode:!0});else if(e.type==="DISABLE_DESIGN_MODE")xe(),n({ok:!0,designMode:!1});else if(e.type==="GET_DESIGN_MODE")n({designMode:w});else if(e.type==="GET_SELECTED_ELEMENT")!i||!document.body.contains(i)?n({selected:null}):n({selected:{elementInfo:X(i),initialStyles:j(i)},isRepositionMode:z});else if(e.type==="APPLY_STYLE"){const o=e.styles||{};if(i&&document.body.contains(i)){i.setAttribute("data-restyld-modified","1");const r={};for(const[s,l]of Object.entries(o))l!=null&&l!==""&&(i.style[s]=l,r[s]=l);Object.keys(r).length&&k(i,{styles:r})}n({ok:!0})}else if(e.type==="DESELECT")F(),G(),n({ok:!0});else if(e.type==="REMOVE_ELEMENT"){if(i){const o=i.outerHTML;k(i,{removed:!0,removedHtml:o}),i.remove(),i=null}$(),I(),L(),n({ok:!0})}else if(e.type==="REPOSITION_START")ge(),n({ok:!0});else if(e.type==="REPOSITION_DONE")F(),n({ok:!0});else if(e.type==="GET_MODIFICATIONS")n({ok:!0,modifications:de()});else if(e.type==="APPLY_SKIN"){const o=e.modifications||[],r=ee(o);T=o,M.clear(),o.forEach(s=>{s&&Array.isArray(s.path)&&M.set(W(s.path),{...s})}),n({ok:!0,...r})}else if(e.type==="RESET"){const o=e.modifications!=null?e.modifications:T;let r;Array.isArray(o)&&o.length>0?(r=te(o),T=[],M.clear()):(r={cleared:ne(),restored:0,missing:0},M.clear()),n({ok:!0,...r})}return!0})})();
