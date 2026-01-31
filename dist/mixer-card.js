/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;class n{constructor(t,e,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=r.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&r.set(i,t))}return t}toString(){return this.cssText}}const a=(i,r)=>{e?i.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):r.forEach(e=>{const r=document.createElement("style"),n=t.litNonce;void 0!==n&&r.setAttribute("nonce",n),r.textContent=e.cssText,i.appendChild(r)})},s=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var o;const l=window,d=l.trustedTypes,h=d?d.emptyScript:"",c=l.reactiveElementPolyfillSupport,u={toAttribute(t,e){switch(e){case Boolean:t=t?h:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>e!==t&&(e==e||t==t),p={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:v},m="finalized";class f extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const r=this._$Ep(i,e);void 0!==r&&(this._$Ev.set(r,i),t.push(r))}),t}static createProperty(t,e=p){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,r=this.getPropertyDescriptor(t,i,e);void 0!==r&&Object.defineProperty(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(r){const n=this[t];this[e]=r,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||p}static finalize(){if(this.hasOwnProperty(m))return!1;this[m]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(s(t))}else void 0!==t&&e.push(s(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return a(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=p){var r;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const a=(void 0!==(null===(r=i.converter)||void 0===r?void 0:r.toAttribute)?i.converter:u).toAttribute(e,i.type);this._$El=t,null==a?this.removeAttribute(n):this.setAttribute(n,a),this._$El=null}}_$AK(t,e){var i;const r=this.constructor,n=r._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=r.getPropertyOptions(n),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:u;this._$El=n,this[n]=a.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let r=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||v)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _;f[m]=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},null==c||c({ReactiveElement:f}),(null!==(o=l.reactiveElementVersions)&&void 0!==o?o:l.reactiveElementVersions=[]).push("1.6.3");const g=window,$=g.trustedTypes,y=$?$.createPolicy("lit-html",{createHTML:t=>t}):void 0,b=`lit$${(Math.random()+"").slice(9)}$`,A="?"+b,w=`<${A}>`,x=document,S=()=>x.createComment(""),E=t=>null===t||"object"!=typeof t&&"function"!=typeof t,C=Array.isArray,k="[ \t\n\f\r]",F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,U=/>/g,R=RegExp(`>|${k}(?:([^\\s"'>=/]+)(${k}*=${k}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),M=/'/g,N=/"/g,P=/^(?:script|style|textarea|title)$/i,O=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),H=Symbol.for("lit-noChange"),D=Symbol.for("lit-nothing"),I=new WeakMap,L=x.createTreeWalker(x,129,null,!1);function j(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==y?y.createHTML(e):e}const B=(t,e)=>{const i=t.length-1,r=[];let n,a=2===e?"<svg>":"",s=F;for(let e=0;e<i;e++){const i=t[e];let o,l,d=-1,h=0;for(;h<i.length&&(s.lastIndex=h,l=s.exec(i),null!==l);)h=s.lastIndex,s===F?"!--"===l[1]?s=T:void 0!==l[1]?s=U:void 0!==l[2]?(P.test(l[2])&&(n=RegExp("</"+l[2],"g")),s=R):void 0!==l[3]&&(s=R):s===R?">"===l[0]?(s=null!=n?n:F,d=-1):void 0===l[1]?d=-2:(d=s.lastIndex-l[2].length,o=l[1],s=void 0===l[3]?R:'"'===l[3]?N:M):s===N||s===M?s=R:s===T||s===U?s=F:(s=R,n=void 0);const c=s===R&&t[e+1].startsWith("/>")?" ":"";a+=s===F?i+w:d>=0?(r.push(o),i.slice(0,d)+"$lit$"+i.slice(d)+b+c):i+b+(-2===d?(r.push(void 0),e):c)}return[j(t,a+(t[i]||"<?>")+(2===e?"</svg>":"")),r]};class V{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let n=0,a=0;const s=t.length-1,o=this.parts,[l,d]=B(t,e);if(this.el=V.createElement(l,i),L.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(r=L.nextNode())&&o.length<s;){if(1===r.nodeType){if(r.hasAttributes()){const t=[];for(const e of r.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(b)){const i=d[a++];if(t.push(e),void 0!==i){const t=r.getAttribute(i.toLowerCase()+"$lit$").split(b),e=/([.?@])?(.*)/.exec(i);o.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?J:"?"===e[1]?Z:"@"===e[1]?G:q})}else o.push({type:6,index:n})}for(const e of t)r.removeAttribute(e)}if(P.test(r.tagName)){const t=r.textContent.split(b),e=t.length-1;if(e>0){r.textContent=$?$.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],S()),L.nextNode(),o.push({type:2,index:++n});r.append(t[e],S())}}}else if(8===r.nodeType)if(r.data===A)o.push({type:2,index:n});else{let t=-1;for(;-1!==(t=r.data.indexOf(b,t+1));)o.push({type:7,index:n}),t+=b.length-1}n++}}static createElement(t,e){const i=x.createElement("template");return i.innerHTML=t,i}}function z(t,e,i=t,r){var n,a,s,o;if(e===H)return e;let l=void 0!==r?null===(n=i._$Co)||void 0===n?void 0:n[r]:i._$Cl;const d=E(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(a=null==l?void 0:l._$AO)||void 0===a||a.call(l,!1),void 0===d?l=void 0:(l=new d(t),l._$AT(t,i,r)),void 0!==r?(null!==(s=(o=i)._$Co)&&void 0!==s?s:o._$Co=[])[r]=l:i._$Cl=l),void 0!==l&&(e=z(t,l._$AS(t,e.values),l,r)),e}class W{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:r}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:x).importNode(i,!0);L.currentNode=n;let a=L.nextNode(),s=0,o=0,l=r[0];for(;void 0!==l;){if(s===l.index){let e;2===l.type?e=new Y(a,a.nextSibling,this,t):1===l.type?e=new l.ctor(a,l.name,l.strings,this,t):6===l.type&&(e=new Q(a,this,t)),this._$AV.push(e),l=r[++o]}s!==(null==l?void 0:l.index)&&(a=L.nextNode(),s++)}return L.currentNode=x,n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Y{constructor(t,e,i,r){var n;this.type=2,this._$AH=D,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cp=null===(n=null==r?void 0:r.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=z(this,t,e),E(t)?t===D||null==t||""===t?(this._$AH!==D&&this._$AR(),this._$AH=D):t!==this._$AH&&t!==H&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>C(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==D&&E(this._$AH)?this._$AA.nextSibling.data=t:this.$(x.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:r}=t,n="number"==typeof r?this._$AC(t):(void 0===r.el&&(r.el=V.createElement(j(r.h,r.h[0]),this.options)),r);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new W(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=I.get(t.strings);return void 0===e&&I.set(t.strings,e=new V(t)),e}T(t){C(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const n of t)r===e.length?e.push(i=new Y(this.k(S()),this.k(S()),this,this.options)):i=e[r],i._$AI(n),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class q{constructor(t,e,i,r,n){this.type=1,this._$AH=D,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=D}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,r){const n=this.strings;let a=!1;if(void 0===n)t=z(this,t,e,0),a=!E(t)||t!==this._$AH&&t!==H,a&&(this._$AH=t);else{const r=t;let s,o;for(t=n[0],s=0;s<n.length-1;s++)o=z(this,r[i+s],e,s),o===H&&(o=this._$AH[s]),a||(a=!E(o)||o!==this._$AH[s]),o===D?t=D:t!==D&&(t+=(null!=o?o:"")+n[s+1]),this._$AH[s]=o}a&&!r&&this.j(t)}j(t){t===D?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class J extends q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===D?void 0:t}}const K=$?$.emptyScript:"";class Z extends q{constructor(){super(...arguments),this.type=4}j(t){t&&t!==D?this.element.setAttribute(this.name,K):this.element.removeAttribute(this.name)}}class G extends q{constructor(t,e,i,r,n){super(t,e,i,r,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=z(this,t,e,0))&&void 0!==i?i:D)===H)return;const r=this._$AH,n=t===D&&r!==D||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,a=t!==D&&(r===D||n);n&&this.element.removeEventListener(this.name,this,r),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class Q{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){z(this,t)}}const X=g.litHtmlPolyfillSupport;null==X||X(V,Y),(null!==(_=g.litHtmlVersions)&&void 0!==_?_:g.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var tt,et;class it extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var r,n;const a=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:e;let s=a._$litPart$;if(void 0===s){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;a._$litPart$=s=new Y(e.insertBefore(S(),t),t,void 0,null!=i?i:{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return H}}it.finalized=!0,it._$litElement$=!0,null===(tt=globalThis.litElementHydrateSupport)||void 0===tt||tt.call(globalThis,{LitElement:it});const rt=globalThis.litElementPolyfillSupport;null==rt||rt({LitElement:it}),(null!==(et=globalThis.litElementVersions)&&void 0!==et?et:globalThis.litElementVersions=[]).push("3.3.3");var nt,at,st=function(t,e){return ot(e).format(t)},ot=function(t){return new Intl.DateTimeFormat(t.language,{year:"numeric",month:"long",day:"numeric"})};!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(nt||(nt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(at||(at={}));var lt=function(t){if(t.time_format===at.language||t.time_format===at.system){var e=t.time_format===at.language?t.language:void 0,i=(new Date).toLocaleString(e);return i.includes("AM")||i.includes("PM")}return t.time_format===at.am_pm},dt=function(t,e){return ht(e).format(t)},ht=function(t){return new Intl.DateTimeFormat(t.language,{year:"numeric",month:"long",day:"numeric",hour:lt(t)?"numeric":"2-digit",minute:"2-digit",hour12:lt(t)})},ct=function(t,e){return ut(e).format(t)},ut=function(t){return new Intl.DateTimeFormat(t.language,{hour:"numeric",minute:"2-digit",hour12:lt(t)})};function vt(){return(vt=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r])}return t}).apply(this,arguments)}function pt(t){return t.substr(0,t.indexOf("."))}function mt(t){return pt(t.entity_id)}var ft=function(t,e,i){var r=e?function(t){switch(t.number_format){case nt.comma_decimal:return["en-US","en"];case nt.decimal_comma:return["de","es","it"];case nt.space_comma:return["fr","sv","cs"];case nt.system:return;default:return t.language}}(e):void 0;if(Number.isNaN=Number.isNaN||function t(e){return"number"==typeof e&&t(e)},(null==e?void 0:e.number_format)!==nt.none&&!Number.isNaN(Number(t))&&Intl)try{return new Intl.NumberFormat(r,_t(t,i)).format(Number(t))}catch(e){return console.error(e),new Intl.NumberFormat(void 0,_t(t,i)).format(Number(t))}return"string"==typeof t?t:function(t,e){return void 0===e&&(e=2),Math.round(t*Math.pow(10,e))/Math.pow(10,e)}(t,null==i?void 0:i.maximumFractionDigits).toString()+("currency"===(null==i?void 0:i.style)?" "+i.currency:"")},_t=function(t,e){var i=vt({maximumFractionDigits:2},e);if("string"!=typeof t)return i;if(!e||!e.minimumFractionDigits&&!e.maximumFractionDigits){var r=t.indexOf(".")>-1?t.split(".")[1].length:0;i.minimumFractionDigits=r,i.maximumFractionDigits=r}return i};function gt(t,e,i){const r="number"==typeof t.max?t.max:e.attributes.max||1,n="number"==typeof t.min?t.min:e.attributes.min||0;let a=0;a="media_player"===mt(e)?e.attributes.volume_level||0:e.state;const s=Math.round((a-n)/(r-n)*100);let o=s+"%";t.value_entity_id&&Object.prototype.hasOwnProperty.call(i.states,t.value_entity_id)?o=function(t,e,i,r){var n=void 0!==r?r:e.state;if("unknown"===n||"unavailable"===n)return t("state.default."+n);if(function(t){return!!t.attributes.unit_of_measurement||!!t.attributes.state_class}(e)){if("monetary"===e.attributes.device_class)try{return ft(n,i,{style:"currency",currency:e.attributes.unit_of_measurement})}catch(t){}return ft(n,i)+(e.attributes.unit_of_measurement?" "+e.attributes.unit_of_measurement:"")}var a=mt(e);if("input_datetime"===a){var s;if(void 0===r)return e.attributes.has_date&&e.attributes.has_time?(s=new Date(e.attributes.year,e.attributes.month-1,e.attributes.day,e.attributes.hour,e.attributes.minute),dt(s,i)):e.attributes.has_date?(s=new Date(e.attributes.year,e.attributes.month-1,e.attributes.day),st(s,i)):e.attributes.has_time?((s=new Date).setHours(e.attributes.hour,e.attributes.minute),ct(s,i)):e.state;try{var o=r.split(" ");if(2===o.length)return dt(new Date(o.join("T")),i);if(1===o.length){if(r.includes("-"))return st(new Date(r+"T00:00"),i);if(r.includes(":")){var l=new Date;return ct(new Date(l.toISOString().split("T")[0]+"T"+r),i)}}return r}catch(t){return r}}return"humidifier"===a&&"on"===n&&e.attributes.humidity?e.attributes.humidity+" %":"counter"===a||"number"===a||"input_number"===a?ft(n,i):e.attributes.device_class&&t("component."+a+".state."+e.attributes.device_class+"."+n)||t("component."+a+".state._."+n)||n}(i.localize,i.states[t.value_entity_id],i.language):t.value_attribute&&Object.prototype.hasOwnProperty.call(e.attributes,t.value_attribute)&&(o=e.attributes[t.value_attribute]);const l=t.value_suffix||"";return l&&(o+=" "+l),{displayValue:o,inputValue:s}}const $t=((t,...e)=>{const r=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new n(r,t,i)})`
    .fader-holder {
        margin: 20px;
    }
    h4 {
        color: #00F;
        display: block;
        font-weight: 300;
        margin-bottom: 30px;
        text-align: center;
        font-size:20px;
        margin-top:0;
        text-transform: capitalize;
    }
    h4.brightness:after {
      content: attr(data-value);
      padding-left: 1px;
    }
    .fader-holder {
      display: flex;
    }
    .fader {
        padding: 6px 10px;
    }
    .fader-value {
        margin-top: 10px;
        text-align: center;
    }
    .fader-name {
        margin-top: 30px;
        text-align: center;
        display: block;
        font-weight: 300;
        text-align: center;
        font-size:14px;
        text-transform: capitalize;
    }
    .range-holder {
        height: var(--fader-height);
        width: var(--fader-width);
        position:relative;
        display: block;
        margin-right: auto;
        margin-left: auto;
    }
    .range-holder input[type="range"] {
        margin: 0;
        outline: 0;
        border: 0;
        -webkit-transform:rotate(270deg);
        -moz-transform:rotate(270deg);
        -o-transform:rotate(270deg);
        -ms-transform:rotate(270deg);
        transform:rotate(270deg);
        position: absolute;
        top: calc(50% - (var(--fader-width) / 2));
        right: calc(50% - (var(--fader-height) / 2));
        background-color: var(--fader-track-color);
        transition: box-shadow 0.2s ease-in-out;
        -webkit-appearance: none;
        appearance: none;
        border-radius: var(--fader-border-radius, 12px);
    }
    /* Theme Physical */
    .fader-theme-physical .range-holder input[type="range"] {
        top: 50%;
        width: var(--fader-height);
        height: 5px;
        background-color: var(--fader-track-color);
    }
    .fader-theme-physical .range-holder input[type="range"].fader-inactive {
        background-color: var(--fader-track-inactive-color);
    }
    .fader-theme-physical .range-holder input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height:40px;
        width:85px;
        cursor: pointer;
        transition: box-shadow 0.2s ease-in-out;
        background-image: url("/hacsfiles/mixer-card/fader.svg");
        background-size: cover;
        border-radius: 7px;
    }
    .fader-unavailable, .button-disabled {
        opacity: 20%;
        pointer-events: none;
    }
    /* Theme Modern */
    .fader-theme-modern .range-holder input[type="range"] {
        width: var(--fader-height);
        height: var(--fader-width);
        -webkit-appearance: none;
        background-color: var(--fader-track-color);
        overflow: hidden;
    }
    .fader-theme-modern .range-holder input[type="range"]::-webkit-slider-runnable-track {
        height: var(--fader-width);
        -webkit-appearance: none;
        background-color: var(--fader-track-color);
        margin-top: -1px;
        transition: box-shadow 0.2s ease-in-out;
    }
    .fader-theme-modern .range-holder input[type="range"]::-webkit-slider-thumb {
        width: 25px;
        border-right:10px solid var(--fader-color);
        border-left:10px solid var(--fader-color);
        border-top:20px solid var(--fader-color);
        border-bottom:20px solid var(--fader-color);
        -webkit-appearance: none;
        height: 80px;
        cursor: pointer;
        background: #fff;
        box-shadow: -350px 0 0 350px var(--fader-color), inset 0 0 0 80px var(--fader-thumb-color);
        border-radius: 0;
        transition: box-shadow 0.2s ease-in-out;
        position: relative;
        top: calc((var(--fader-width) - 80px) / 2);
    }
    .active-button {
        margin:20px;
        margin-top: 30px;
        line-height:20px;
        border: 1px solid #bbb;
        box-shadow: 1px 1px 1px #bbb;
        display:block;
        padding: 5px;
        cursor:pointer;
        vertical-align: center;
        text-align: center;
        border-radius: 5px;
    }
    .active-button span {
      pointer-events: none;
    }
    .active-button ha-icon {
      pointer-events: none;
    }
    p.mixer-description {
        margin: 16px;
        margin-top: 0px;
    }
`;customElements.define("custom-mixer-card",class extends it{constructor(){super(),this._relativeFaderActive=!1,this._relativeFaderStartY=0,this._relativeFaderStartValue=0,this._relativeFaderMin=0,this._relativeFaderMax=100,this._relativeFaderStateObj=null,this._relativeFaderInput=null,this._relativeFaderSensitivity=.2,this._onRelativeFaderMove=this._onRelativeFaderMove.bind(this),this._onRelativeFaderUp=this._onRelativeFaderUp.bind(this)}static get properties(){return{hass:{},config:{},active:{}}}static get styles(){return $t}render(){const t={borderRadius:(e=this.config)&&e.borderRadius?e.borderRadius:"12px",faderWidth:e&&e.faderWidth?e.faderWidth:"150px",faderHeight:e&&e.faderHeight?e.faderHeight:"400px",faderInactiveColor:e&&e.faderInactiveColor?e.faderInactiveColor:"#f00",faderThumbColor:e&&e.faderThumbColor?e.faderThumbColor:"#ddd",faderTrackColor:e&&e.faderTrackColor?e.faderTrackColor:"#ddd",faderActiveColor:e&&e.faderActiveColor?e.faderActiveColor:"#22ba00",faderTheme:e&&e.faderTheme?e.faderTheme:"modern",updateWhileMoving:!(!e||!e.updateWhileMoving)&&e.updateWhileMoving,alwaysShowFaderValue:!(!e||!e.alwaysShowFaderValue)&&e.alwaysShowFaderValue,showActiveButton:!e||void 0===e.showActiveButton||e.showActiveButton,haCard:!e||void 0===e.haCard||e.haCard,description:e&&e.description?e.description:"",title:e&&e.title?e.title:""};var e;const i=[];if(this.faderColors={},!this.config||!this.config.faders||!Array.isArray(this.config.faders))throw new Error('Invalid configuration: "faders" must be an array.');for(let e=0;e<this.config.faders.length;e++){const r=this.config.faders[e],n=this.hass.states[r.entity_id];n?i.push(this.renderFader(r,n,t)):console.warn(`Entity ${r.entity_id} not found in Home Assistant.`)}const r=function(t){const e=t.title?O`<h1 class='card-header'><div class='name'>${t.title}</div></div>`:"",i=t.description?O`<p class='mixer-description'>${t.description}</p>`:"";return O`${e}${i}`}(t),n=O`
      ${r}
      <div>
        <div class='mixer-card'>
          <div class='fader-holder fader-theme-${t.faderTheme}'>
            ${i}
          </div>
        </div>
      </div>
    `;return t.haCard?O`<ha-card>${n}</ha-card>`:n}renderFader(t,e,i){const r="unavailable"===e.state,n=mt(e),a="number"==typeof t.max?t.max:e.attributes.max||1,s="number"==typeof t.min?t.min:e.attributes.min||0;if(!["number","media_player","input_number"].includes(n))return null;const o=t.name||this._entity_property(t.entity_id,"-name"),l=t.invert_active||!1;let d=t.active_entity_id?this._entity_property(t.active_entity_id,"state"):"on";"media_player"===n&&(d=this._entity_property(t.entity_id,"-muted")?"off":"on"),l&&(d="on"===d?"off":"on");const h=function(t,e,i){return"on"===i?"mdi:volume-high":"mdi:volume-mute"}(0,0,d),{displayValue:c,inputValue:u}=gt(t,e,this.hass),v=t.active_entity_id||("media_player"===n?t.entity_id:""),p=function(t,e){return{track:t.track_color||e.faderTrackColor,active:t.active_color||e.faderActiveColor,inactive:t.inactive_color||e.faderInactiveColor,thumb:t.thumb_color||e.faderThumbColor}}(t,i),m=p.track,f=p.active,_=p.inactive,g=p.thumb;this.faderColors["fader_range_"+t.entity_id]={track_color:m,active_color:f,inactive_color:_,thumb_color:g};const $=("boolean"==typeof t.showActiveButton?t.showActiveButton:i.showActiveButton)?this._renderActiveButton(v,d,r,f,_,h):O`&nbsp;`,y=`${"off"===d?"fader-inactive":"fader-active"}${r?" fader-unavailable":""}`,b="fader_range_"+t.entity_id,A=function(t,e,i){let r=`--fader-width: ${e.faderWidth}; --fader-height: ${e.faderHeight}; --fader-border-radius: ${e.borderRadius}; `;return r+=`--fader-color: ${"on"===i?t.active:t.inactive}; `,r+=`--fader-thumb-color: ${t.thumb}; --fader-track-color: ${t.track}; --fader-track-inactive-color: ${t.inactive};`,r}(p,i,d);let w;if(this.config&&this.config.relativeFader){let t;t="physical"===i.faderTheme?A.replace(/;+\s*$/,"")+"; width:var(--fader-height); height:5px;":A.replace(/;+\s*$/,"")+"; width:var(--fader-height); height:var(--fader-width);",w=O`
        <input type='range'
          class='${y}'
          id='${b}'
          style='${t}'
          value='${u}'
          @mousedown=${t=>this._onRelativeFaderDown(t,e,s,a)}
          @touchstart=${t=>this._onRelativeFaderDown(t,e,s,a)}>
      `}else w=i.updateWhileMoving?O`<input type='range' class='${y}' id='${b}' style='${A}' value='${u}' @input=${t=>this._setFaderLevel(e,t.target.value)}>`:O`<input type='range' class='${y}' id='${b}' style='${A}' .value='${u}' @change=${t=>this._setFaderLevel(e,t.target.value)}>`;return O`
      <div class='fader' id='fader_${t.entity_id}'>
        <div class='range-holder' style='--fader-height: ${i.faderHeight};--fader-width: ${i.faderWidth};'>
          ${w}
        </div>
        <div class='fader-name'>${o}</div>
        <div class='fader-value'>${"on"===d||i.alwaysShowFaderValue?c:O`<br>`}</div>
        <div class='active-button-holder ${r?"button-disabled":""}'>${$}</div>
      </div>
    `}get relativeFaderPointerEvents(){return this._relativeFaderActive?"auto":"none"}_onRelativeFaderDown(t,e,i,r){t.preventDefault();const n=t.touches?t.touches[0].clientY:t.clientY;this._relativeFaderActive=!0,this.requestUpdate(),this._relativeFaderStartY=n,this._relativeFaderStateObj=e,this._relativeFaderMin=i,this._relativeFaderMax=r,this._relativeFaderInput=t.target,this._relativeFaderStartValue=Number(t.target.value),window.addEventListener("mousemove",this._onRelativeFaderMove),window.addEventListener("touchmove",this._onRelativeFaderMove),window.addEventListener("mouseup",this._onRelativeFaderUp),window.addEventListener("touchend",this._onRelativeFaderUp)}_onRelativeFaderMove(t){if(!this._relativeFaderActive)return;const e=t.touches?t.touches[0].clientY:t.clientY,i=this._relativeFaderStartY-e;let r=this._relativeFaderStartValue+i*this._relativeFaderSensitivity;r=Math.max(0,Math.min(100,r)),this._relativeFaderInput.value=r,this._setFaderLevel(this._relativeFaderStateObj,r)}_onRelativeFaderUp(t){this._relativeFaderActive&&(this._relativeFaderActive=!1,this.requestUpdate(),window.removeEventListener("mousemove",this._onRelativeFaderMove),window.removeEventListener("touchmove",this._onRelativeFaderMove),window.removeEventListener("mouseup",this._onRelativeFaderUp),window.removeEventListener("touchend",this._onRelativeFaderUp),this._relativeFaderStateObj=null,this._relativeFaderInput=null)}_renderActiveButton(t,e,i,r,n,a){return t?O`
          <div class="active-button" ${i?"disabled":""}
               @click="${t=>this._toggleActive(t)}"
               data-entity="${t}"
               data-current-state="${e}">
            <span class="color" style="color:${"on"===e?r:n};">
              <ha-icon icon="${a}" />
            </span>
          </div>
        `:O`&nbsp;`}_entity_property(t,e){const i=this.hass.states[t];if(!i)return"";switch(e){case"-name":return i.attributes.friendly_name;case"-volume":return i.attributes.volume_level;case"-muted":return i.attributes.is_volume_muted;default:return i[e]}}_setFaderLevel(t,e){const i=mt(t),r=this.config&&this.config.faders?this.config.faders.find(e=>e.entity_id===t.entity_id):void 0,n=r&&"number"==typeof r.max?r.max:t.attributes.max||1,a=r&&"number"==typeof r.min?r.min:t.attributes.min||0;"media_player"===i?this.hass.callService("media_player","volume_set",{entity_id:t.entity_id,volume_level:e/100*(n-a)+a}):this.hass.callService(i,"set_value",{entity_id:t.entity_id,value:e/100*(n-a)+a})}_previewLevel(t,e){const i=this.shadowRoot.getElementById(t),r=this.faderColors[t];i&&r&&!i.className.includes("fader-inactive")&&(i.style.background=`linear-gradient(to right, ${r.active_color} ${e}%, ${r.track_color} ${e}%)`)}_toggleActive(t){const e=t&&t.currentTarget?t.currentTarget:t&&t.target&&t.target.closest?t.target.closest(".active-button"):t&&t.target,i=e?e.dataset:{},{entity:r}=i||{};if(!r)return;const n=pt(r),a={entity_id:r};let s="";if("media_player"===n){const t=!!this._entity_property(r,"-muted");a.is_volume_muted=!t,s="volume_mute"}else s="toggle";this.hass.callService(n,s,a),this.update_track_color()}async update_track_color(){const t=this.shadowRoot.querySelectorAll('.fader input[type="range"]');await Promise.all(Array.from(t).map(t=>t.updateComplete)),Array.from(t).map(t=>this._previewLevel(t.id,t.value))}async firstUpdated(){await this.update_track_color()}async updated(){await this.update_track_color()}setConfig(t){if(!t||!t.faders||!Array.isArray(t.faders))throw new Error('Invalid configuration: "faders" must be an array.');this.config=t}getCardSize(){return this.config.entities.length+1}});
