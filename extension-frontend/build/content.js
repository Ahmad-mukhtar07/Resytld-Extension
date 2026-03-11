(function(){"use strict";var xe={env:{NODE_ENV:"production"},emit:function(){}};const V=`/* ReStyld control panel - injected into page, high specificity */
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
`;function J(e){let t=0,n=e.previousElementSibling;for(;n;)t++,n=n.previousElementSibling;return t}function Q(e,t=document.body){if(!e||!t||!t.contains(e))return[];const n=[];let o=e;for(;o&&o!==t;)n.unshift(J(o)),o=o.parentElement;return n}function _(e,t){if(!e||!Array.isArray(t)||t.length===0)return null;let n=e;for(let o=0;o<t.length;o++){const r=t[o],s=n.children;if(r<0||r>=s.length||(n=s[r],!n))return null}return n}const z=document.body,B=["position","left","top","width","height","backgroundColor","margin","opacity","borderRadius","transform","fontFamily","fontSize","fontWeight","color","textAlign","padding","borderStyle","borderWidth","borderColor","boxShadow","backdropFilter"];function ee(e,t){const n=_(z,e.path);if(!n)return t.missing++,!1;if(e.removed)return n.remove(),t.removed++,!0;if(e.styles&&typeof e.styles=="object"){const o=n.style;for(const r of B)if(Object.prototype.hasOwnProperty.call(e.styles,r)){const s=e.styles[r];o[r]=s!=null?String(s):""}n.setAttribute("data-restyld-modified","1"),t.applied++}return!0}function te(e){const t={applied:0,removed:0,missing:0};if(!Array.isArray(e))return t;for(const n of e)!n||!Array.isArray(n.path)||ee(n,t);return t}function F(e){const t=e.style;for(const n of B)t[n]="";e.removeAttribute("data-restyld-modified")}function ne(e){const t={cleared:0,restored:0,missing:0};if(!Array.isArray(e))return t;for(const n of e){if(!n||!Array.isArray(n.path))continue;if(n.removed&&n.removedHtml){const r=n.path.slice(0,-1),s=n.path[n.path.length-1],l=r.length===0?z:_(z,r);if(!l){t.missing++;continue}try{const f=document.createElement("div");f.innerHTML=n.removedHtml;const c=f.firstElementChild;if(c){const p=l.children[s]||null;l.insertBefore(c,p),t.restored++}}catch{t.missing++}continue}const o=_(z,n.path);if(!o){t.missing++;continue}F(o),t.cleared++}return t}function oe(){const e=document.querySelectorAll('[data-restyld-modified="1"]');return e.forEach(F),e.length}(function(){const t=document.createElement("style");t.textContent=V,(document.head||document.documentElement).appendChild(t)})();const re="restyld-root",ie="2px solid rgba(255, 0, 0, 0.5)",se="3px solid #2563eb";let E=!1,v=null,i=null,g=null;const Y=4;let b=null,A=null;const le=6,ae=10,de=4,$=["n","ne","e","se","s","sw","w","nw"],M=new Map;let T=[];function X(e){return Array.isArray(e)?e.join(","):""}function L(e,t){if(!e||!document.body.contains(e))return;const n=Q(e);if(n.length===0)return;const o=X(n),r=M.get(o)||{path:n,styles:{}};t.removed!==void 0&&(r.removed=t.removed,r.removedHtml=t.removedHtml),t.styles&&typeof t.styles=="object"&&Object.assign(r.styles,t.styles),M.set(o,r)}function ce(){return Array.from(M.values())}function I(e){return e.closest(`.${re}`)!=null||e.closest(".restyld-resize-handles")!=null}function D(){v&&v.style&&(v.style.outline="",v.style.outlineOffset="",v=null)}function N(){i&&i.style&&(i.style.outline="",i.style.outlineOffset="",i.classList.remove("restyld-selected"),i=null)}function ue(e){!e||e===i||(D(),v=e,e.style.outline=ie,e.style.outlineOffset="2px")}function fe(e){N(),i=e,e&&(e.style.outline=se,e.style.outlineOffset="2px",e.classList.add("restyld-selected"))}function W(e){return e?{tagName:e.tagName||"",id:e.id||"",className:(e.className&&typeof e.className=="string"?e.className:"")||""}:{}}function j(e){if(!e)return{};const t=getComputedStyle(e),n=e.getBoundingClientRect(),o=r=>r!=null&&r!==""?String(r):void 0;return{backgroundColor:o(e.style.backgroundColor)||t.backgroundColor,opacity:o(e.style.opacity)??t.opacity,width:o(e.style.width)||(n.width?`${n.width}px`:void 0),height:o(e.style.height)||(n.height?`${n.height}px`:void 0),borderRadius:o(e.style.borderRadius)||t.borderRadius,transform:o(e.style.transform)||t.transform,fontFamily:o(e.style.fontFamily)||t.fontFamily,fontSize:o(e.style.fontSize)||t.fontSize,fontWeight:o(e.style.fontWeight)||t.fontWeight,color:o(e.style.color)||t.color,textAlign:o(e.style.textAlign)||t.textAlign,padding:o(e.style.padding)||t.padding,margin:o(e.style.margin)||t.margin,borderStyle:o(e.style.borderStyle)||t.borderStyle,borderWidth:o(e.style.borderWidth)||t.borderWidth,borderColor:o(e.style.borderColor)||t.borderColor,boxShadow:o(e.style.boxShadow)||t.boxShadow,backdropFilter:o(e.style.backdropFilter)||t.backdropFilter,position:o(e.style.position)||void 0,left:o(e.style.left)||void 0,top:o(e.style.top)||void 0}}function G(e){if(!e||!document.body.contains(e))return;const t=e.offsetParent||e.parentElement||document.body;getComputedStyle(t).position==="static"&&(t.style.setProperty("position","relative"),t.dataset.restyldParentPosition="relative");const o=t.getBoundingClientRect(),r=e.getBoundingClientRect(),s=r.left-o.left,l=r.top-o.top;e.style.position="absolute",e.style.left=`${s}px`,e.style.top=`${l}px`,e.style.width=`${r.width}px`,e.style.height=`${r.height}px`,e.style.margin="0",e.setAttribute("data-restyld-modified","1"),L(e,{styles:{position:"absolute",left:s+"px",top:l+"px",width:r.width+"px",height:r.height+"px",margin:"0"}})}function R(){if(!b||!i||!document.body.contains(i))return;const e=i.getBoundingClientRect(),t=le/2,n=ae/2,o=de/2,r={n:[e.left+e.width/2-n,e.top-o],ne:[e.right-t,e.top-t],e:[e.right-o,e.top+e.height/2-n],se:[e.right-t,e.bottom-t],s:[e.left+e.width/2-n,e.bottom-o],sw:[e.left-t,e.bottom-t],w:[e.left-o,e.top+e.height/2-n],nw:[e.left-t,e.top-t]};$.forEach(s=>{const l=b.querySelector(`[data-handle="${s}"]`);l&&(l.style.left=`${r[s][0]}px`,l.style.top=`${r[s][1]}px`)})}function pe(e,t){const n=i;if(!n)return;t.preventDefault(),t.stopPropagation(),G(n);const r=(n.offsetParent||n.parentElement||document.body).getBoundingClientRect(),s=n.getBoundingClientRect();let l=t.clientX,f=t.clientY,c=s.left-r.left,p=s.top-r.top,a=s.width,u=s.height;const O=d=>{g==null&&(g=requestAnimationFrame(()=>{g=null;const y=d.clientX-l,x=d.clientY-f;let S=c,w=p,m=a,h=u;switch(e){case"e":m=Math.max(4,a+y);break;case"w":S=c+y,m=Math.max(4,a-y),l=d.clientX,c=S,a=m;break;case"s":h=Math.max(4,u+x);break;case"n":w=p+x,h=Math.max(4,u-x),f=d.clientY,p=w,u=h;break;case"se":m=Math.max(4,a+y),h=Math.max(4,u+x);break;case"sw":S=c+y,m=Math.max(4,a-y),h=Math.max(4,u+x),l=d.clientX,f=d.clientY,c=S,a=m,u=h;break;case"ne":w=p+x,m=Math.max(4,a+y),h=Math.max(4,u-x),l=d.clientX,f=d.clientY,p=w,a=m,u=h;break;case"nw":S=c+y,w=p+x,m=Math.max(4,a-y),h=Math.max(4,u-x),l=d.clientX,f=d.clientY,c=S,p=w,a=m,u=h;break}n.style.left=`${S}px`,n.style.top=`${w}px`,n.style.width=`${m}px`,n.style.height=`${h}px`,L(n,{styles:{left:S+"px",top:w+"px",width:m+"px",height:h+"px"}}),R()}))},k=()=>{document.removeEventListener("mousemove",O),document.removeEventListener("mouseup",k),g!=null&&cancelAnimationFrame(g)};document.addEventListener("mousemove",O,{passive:!0}),document.addEventListener("mouseup",k,{once:!0})}function ye(){if(P(),!i)return;const e=document.createElement("div");e.className="restyld-resize-handles",b=e,$.forEach(n=>{const o=document.createElement("div");o.className="restyld-resize-handle",o.setAttribute("data-handle",n),o.addEventListener("mousedown",r=>pe(n,r)),e.appendChild(o)}),document.body.appendChild(e),R();const t=()=>{b&&i&&document.body.contains(i)&&R(),A=requestAnimationFrame(t)};A=requestAnimationFrame(t)}function P(){A!=null&&(cancelAnimationFrame(A),A=null),b&&b.parentNode&&b.parentNode.removeChild(b),b=null}function C(){try{chrome.runtime.sendMessage({type:"SELECTED_ELEMENT",selected:i?{elementInfo:W(i),initialStyles:j(i)}:null,isRepositionMode:!1})}catch{}}function me(){i&&(ye(),he(),C())}function q(){H(),P(),N(),i=null,C()}function he(){const e=i;if(!e||!document.body.contains(e))return;H();const t=n=>{if(n.target!==e&&!e.contains(n.target))return;n.preventDefault(),n.stopPropagation();let o=n.clientX,r=n.clientY,s=!1,l=0,f=0;const c=a=>{const u=a.clientX-o,O=a.clientY-r;if(!s){if(Math.abs(u)<Y&&Math.abs(O)<Y)return;G(e);const d=(e.offsetParent||e.parentElement||document.body).getBoundingClientRect(),y=e.getBoundingClientRect();l=y.left-d.left,f=y.top-d.top,o=a.clientX,r=a.clientY,s=!0}g==null&&(g=requestAnimationFrame(()=>{g=null;const k=l+(a.clientX-o),d=f+(a.clientY-r);e.style.left=`${k}px`,e.style.top=`${d}px`,L(e,{styles:{left:e.style.left,top:e.style.top}}),R(),l=k,f=d,o=a.clientX,r=a.clientY}))},p=()=>{document.removeEventListener("mousemove",c),document.removeEventListener("mouseup",p),g!=null&&cancelAnimationFrame(g),s&&C()};document.addEventListener("mousemove",c,{passive:!0}),document.addEventListener("mouseup",p,{once:!0})};e.addEventListener("mousedown",t,!0),e._restyldCleanupDrag=()=>{e.removeEventListener("mousedown",t,!0),delete e._restyldCleanupDrag}}function H(){i&&i._restyldCleanupDrag&&i._restyldCleanupDrag()}function Z(e){E&&(I(e.target)||i||ue(e.target))}function K(e){E&&(I(e.target)||i||v&&!v.contains(e.relatedTarget)&&D())}function U(e){if(E&&!I(e.target)){if(i&&i!==e.target&&!i.contains(e.target)){e.preventDefault(),e.stopPropagation();return}e.preventDefault(),e.stopPropagation(),D(),fe(e.target),me()}}function ge(){E||(E=!0,document.addEventListener("mouseover",Z,!0),document.addEventListener("mouseout",K,!0),document.addEventListener("click",U,!0))}function be(){E&&(E=!1,document.removeEventListener("mouseover",Z,!0),document.removeEventListener("mouseout",K,!0),document.removeEventListener("click",U,!0),D(),H(),q())}chrome.runtime.onMessage.addListener((e,t,n)=>{if(e.type==="ENABLE_DESIGN_MODE")ge(),n({ok:!0,designMode:!0});else if(e.type==="DISABLE_DESIGN_MODE")be(),n({ok:!0,designMode:!1});else if(e.type==="GET_DESIGN_MODE")n({designMode:E});else if(e.type==="GET_SELECTED_ELEMENT")!i||!document.body.contains(i)?n({selected:null}):n({selected:{elementInfo:W(i),initialStyles:j(i)},isRepositionMode:!1});else if(e.type==="APPLY_STYLE"){const o=e.styles||{};if(i&&document.body.contains(i)){i.setAttribute("data-restyld-modified","1");const r={};for(const[s,l]of Object.entries(o))l!=null&&l!==""&&(i.style[s]=l,r[s]=l);Object.keys(r).length&&L(i,{styles:r})}n({ok:!0})}else if(e.type==="DESELECT")q(),n({ok:!0});else if(e.type==="REMOVE_ELEMENT"){if(i){const o=i.outerHTML;L(i,{removed:!0,removedHtml:o}),i.remove(),i=null}P(),N(),C(),n({ok:!0})}else if(e.type==="REPOSITION_START")n({ok:!0});else if(e.type==="REPOSITION_DONE")i&&C(),n({ok:!0});else if(e.type==="GET_MODIFICATIONS")n({ok:!0,modifications:ce()});else if(e.type==="APPLY_SKIN"){const o=e.modifications||[],r=te(o);T=o,M.clear(),o.forEach(s=>{s&&Array.isArray(s.path)&&M.set(X(s.path),{...s})}),n({ok:!0,...r})}else if(e.type==="RESET"){const o=e.modifications!=null?e.modifications:T;let r;Array.isArray(o)&&o.length>0?(r=ne(o),T=[],M.clear()):(r={cleared:oe(),restored:0,missing:0},M.clear()),n({ok:!0,...r})}return!0})})();
