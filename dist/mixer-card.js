/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;class n{constructor(t,e,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=r.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&r.set(i,t))}return t}toString(){return this.cssText}}const s=(t,...e)=>{const r=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new n(r,t,i)},o=(i,r)=>{e?i.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):r.forEach(e=>{const r=document.createElement("style"),n=t.litNonce;void 0!==n&&r.setAttribute("nonce",n),r.textContent=e.cssText,i.appendChild(r)})},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var l;const d=window,h=d.trustedTypes,c=h?h.emptyScript:"",u=d.reactiveElementPolyfillSupport,p={toAttribute(t,e){switch(e){case Boolean:t=t?c:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},f=(t,e)=>e!==t&&(e==e||t==t),v={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:f},m="finalized";class _ extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const r=this._$Ep(i,e);void 0!==r&&(this._$Ev.set(r,i),t.push(r))}),t}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,r=this.getPropertyDescriptor(t,i,e);void 0!==r&&Object.defineProperty(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(r){const n=this[t];this[e]=r,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||v}static finalize(){if(this.hasOwnProperty(m))return!1;this[m]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return o(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=v){var r;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==(null===(r=i.converter)||void 0===r?void 0:r.toAttribute)?i.converter:p).toAttribute(e,i.type);this._$El=t,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$El=null}}_$AK(t,e){var i;const r=this.constructor,n=r._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=r.getPropertyOptions(n),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:p;this._$El=n,this[n]=s.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let r=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||f)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var g;_[m]=!0,_.elementProperties=new Map,_.elementStyles=[],_.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:_}),(null!==(l=d.reactiveElementVersions)&&void 0!==l?l:d.reactiveElementVersions=[]).push("1.6.3");const $=window,y=$.trustedTypes,b=y?y.createPolicy("lit-html",{createHTML:t=>t}):void 0,A=`lit$${(Math.random()+"").slice(9)}$`,w="?"+A,x=`<${w}>`,S=document,E=()=>S.createComment(""),C=t=>null===t||"object"!=typeof t&&"function"!=typeof t,k=Array.isArray,N="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,U=/>/g,H=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),M=/'/g,O=/"/g,R=/^(?:script|style|textarea|title)$/i,D=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),I=Symbol.for("lit-noChange"),z=Symbol.for("lit-nothing"),L=new WeakMap,j=S.createTreeWalker(S,129,null,!1);function F(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==b?b.createHTML(e):e}const B=(t,e)=>{const i=t.length-1,r=[];let n,s=2===e?"<svg>":"",o=T;for(let e=0;e<i;e++){const i=t[e];let a,l,d=-1,h=0;for(;h<i.length&&(o.lastIndex=h,l=o.exec(i),null!==l);)h=o.lastIndex,o===T?"!--"===l[1]?o=P:void 0!==l[1]?o=U:void 0!==l[2]?(R.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=H):void 0!==l[3]&&(o=H):o===H?">"===l[0]?(o=null!=n?n:T,d=-1):void 0===l[1]?d=-2:(d=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?H:'"'===l[3]?O:M):o===O||o===M?o=H:o===P||o===U?o=T:(o=H,n=void 0);const c=o===H&&t[e+1].startsWith("/>")?" ":"";s+=o===T?i+x:d>=0?(r.push(a),i.slice(0,d)+"$lit$"+i.slice(d)+A+c):i+A+(-2===d?(r.push(void 0),e):c)}return[F(t,s+(t[i]||"<?>")+(2===e?"</svg>":"")),r]};class V{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let n=0,s=0;const o=t.length-1,a=this.parts,[l,d]=B(t,e);if(this.el=V.createElement(l,i),j.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(r=j.nextNode())&&a.length<o;){if(1===r.nodeType){if(r.hasAttributes()){const t=[];for(const e of r.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(A)){const i=d[s++];if(t.push(e),void 0!==i){const t=r.getAttribute(i.toLowerCase()+"$lit$").split(A),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?Z:"?"===e[1]?G:"@"===e[1]?Q:K})}else a.push({type:6,index:n})}for(const e of t)r.removeAttribute(e)}if(R.test(r.tagName)){const t=r.textContent.split(A),e=t.length-1;if(e>0){r.textContent=y?y.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],E()),j.nextNode(),a.push({type:2,index:++n});r.append(t[e],E())}}}else if(8===r.nodeType)if(r.data===w)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=r.data.indexOf(A,t+1));)a.push({type:7,index:n}),t+=A.length-1}n++}}static createElement(t,e){const i=S.createElement("template");return i.innerHTML=t,i}}function W(t,e,i=t,r){var n,s,o,a;if(e===I)return e;let l=void 0!==r?null===(n=i._$Co)||void 0===n?void 0:n[r]:i._$Cl;const d=C(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(s=null==l?void 0:l._$AO)||void 0===s||s.call(l,!1),void 0===d?l=void 0:(l=new d(t),l._$AT(t,i,r)),void 0!==r?(null!==(o=(a=i)._$Co)&&void 0!==o?o:a._$Co=[])[r]=l:i._$Cl=l),void 0!==l&&(e=W(t,l._$AS(t,e.values),l,r)),e}class q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:r}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:S).importNode(i,!0);j.currentNode=n;let s=j.nextNode(),o=0,a=0,l=r[0];for(;void 0!==l;){if(o===l.index){let e;2===l.type?e=new J(s,s.nextSibling,this,t):1===l.type?e=new l.ctor(s,l.name,l.strings,this,t):6===l.type&&(e=new X(s,this,t)),this._$AV.push(e),l=r[++a]}o!==(null==l?void 0:l.index)&&(s=j.nextNode(),o++)}return j.currentNode=S,n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class J{constructor(t,e,i,r){var n;this.type=2,this._$AH=z,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cp=null===(n=null==r?void 0:r.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=W(this,t,e),C(t)?t===z||null==t||""===t?(this._$AH!==z&&this._$AR(),this._$AH=z):t!==this._$AH&&t!==I&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>k(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==z&&C(this._$AH)?this._$AA.nextSibling.data=t:this.$(S.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:r}=t,n="number"==typeof r?this._$AC(t):(void 0===r.el&&(r.el=V.createElement(F(r.h,r.h[0]),this.options)),r);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new q(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=L.get(t.strings);return void 0===e&&L.set(t.strings,e=new V(t)),e}T(t){k(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const n of t)r===e.length?e.push(i=new J(this.k(E()),this.k(E()),this,this.options)):i=e[r],i._$AI(n),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class K{constructor(t,e,i,r,n){this.type=1,this._$AH=z,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=z}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,r){const n=this.strings;let s=!1;if(void 0===n)t=W(this,t,e,0),s=!C(t)||t!==this._$AH&&t!==I,s&&(this._$AH=t);else{const r=t;let o,a;for(t=n[0],o=0;o<n.length-1;o++)a=W(this,r[i+o],e,o),a===I&&(a=this._$AH[o]),s||(s=!C(a)||a!==this._$AH[o]),a===z?t=z:t!==z&&(t+=(null!=a?a:"")+n[o+1]),this._$AH[o]=a}s&&!r&&this.j(t)}j(t){t===z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Z extends K{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===z?void 0:t}}const Y=y?y.emptyScript:"";class G extends K{constructor(){super(...arguments),this.type=4}j(t){t&&t!==z?this.element.setAttribute(this.name,Y):this.element.removeAttribute(this.name)}}class Q extends K{constructor(t,e,i,r,n){super(t,e,i,r,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=W(this,t,e,0))&&void 0!==i?i:z)===I)return;const r=this._$AH,n=t===z&&r!==z||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==z&&(r===z||n);n&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class X{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){W(this,t)}}const tt=$.litHtmlPolyfillSupport;null==tt||tt(V,J),(null!==(g=$.litHtmlVersions)&&void 0!==g?g:$.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var et,it;class rt extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var r,n;const s=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:e;let o=s._$litPart$;if(void 0===o){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;s._$litPart$=o=new J(e.insertBefore(E(),t),t,void 0,null!=i?i:{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return I}}rt.finalized=!0,rt._$litElement$=!0,null===(et=globalThis.litElementHydrateSupport)||void 0===et||et.call(globalThis,{LitElement:rt});const nt=globalThis.litElementPolyfillSupport;null==nt||nt({LitElement:rt}),(null!==(it=globalThis.litElementVersions)&&void 0!==it?it:globalThis.litElementVersions=[]).push("3.3.3");var st,ot,at=function(t,e){return lt(e).format(t)},lt=function(t){return new Intl.DateTimeFormat(t.language,{year:"numeric",month:"long",day:"numeric"})};!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(st||(st={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(ot||(ot={}));var dt=function(t){if(t.time_format===ot.language||t.time_format===ot.system){var e=t.time_format===ot.language?t.language:void 0,i=(new Date).toLocaleString(e);return i.includes("AM")||i.includes("PM")}return t.time_format===ot.am_pm},ht=function(t,e){return ct(e).format(t)},ct=function(t){return new Intl.DateTimeFormat(t.language,{year:"numeric",month:"long",day:"numeric",hour:dt(t)?"numeric":"2-digit",minute:"2-digit",hour12:dt(t)})},ut=function(t,e){return pt(e).format(t)},pt=function(t){return new Intl.DateTimeFormat(t.language,{hour:"numeric",minute:"2-digit",hour12:dt(t)})};function ft(){return(ft=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r])}return t}).apply(this,arguments)}function vt(t){return t.substr(0,t.indexOf("."))}function mt(t){return vt(t.entity_id)}var _t=function(t,e,i){var r=e?function(t){switch(t.number_format){case st.comma_decimal:return["en-US","en"];case st.decimal_comma:return["de","es","it"];case st.space_comma:return["fr","sv","cs"];case st.system:return;default:return t.language}}(e):void 0;if(Number.isNaN=Number.isNaN||function t(e){return"number"==typeof e&&t(e)},(null==e?void 0:e.number_format)!==st.none&&!Number.isNaN(Number(t))&&Intl)try{return new Intl.NumberFormat(r,gt(t,i)).format(Number(t))}catch(e){return console.error(e),new Intl.NumberFormat(void 0,gt(t,i)).format(Number(t))}return"string"==typeof t?t:function(t,e){return void 0===e&&(e=2),Math.round(t*Math.pow(10,e))/Math.pow(10,e)}(t,null==i?void 0:i.maximumFractionDigits).toString()+("currency"===(null==i?void 0:i.style)?" "+i.currency:"")},gt=function(t,e){var i=ft({maximumFractionDigits:2},e);if("string"!=typeof t)return i;if(!e||!e.minimumFractionDigits&&!e.maximumFractionDigits){var r=t.indexOf(".")>-1?t.split(".")[1].length:0;i.minimumFractionDigits=r,i.maximumFractionDigits=r}return i},$t=function(t,e,i,r){var n=void 0!==r?r:e.state;if("unknown"===n||"unavailable"===n)return t("state.default."+n);if(function(t){return!!t.attributes.unit_of_measurement||!!t.attributes.state_class}(e)){if("monetary"===e.attributes.device_class)try{return _t(n,i,{style:"currency",currency:e.attributes.unit_of_measurement})}catch(t){}return _t(n,i)+(e.attributes.unit_of_measurement?" "+e.attributes.unit_of_measurement:"")}var s=mt(e);if("input_datetime"===s){var o;if(void 0===r)return e.attributes.has_date&&e.attributes.has_time?(o=new Date(e.attributes.year,e.attributes.month-1,e.attributes.day,e.attributes.hour,e.attributes.minute),ht(o,i)):e.attributes.has_date?(o=new Date(e.attributes.year,e.attributes.month-1,e.attributes.day),at(o,i)):e.attributes.has_time?((o=new Date).setHours(e.attributes.hour,e.attributes.minute),ut(o,i)):e.state;try{var a=r.split(" ");if(2===a.length)return ht(new Date(a.join("T")),i);if(1===a.length){if(r.includes("-"))return at(new Date(r+"T00:00"),i);if(r.includes(":")){var l=new Date;return ut(new Date(l.toISOString().split("T")[0]+"T"+r),i)}}return r}catch(t){return r}}return"humidifier"===s&&"on"===n&&e.attributes.humidity?e.attributes.humidity+" %":"counter"===s||"number"===s||"input_number"===s?_t(n,i):e.attributes.device_class&&t("component."+s+".state."+e.attributes.device_class+"."+n)||t("component."+s+".state._."+n)||n};customElements.define("custom-mixer-card",class extends rt{constructor(){super()}static get properties(){return{hass:{},config:{},active:{}}}render(){const t=this.config.borderRadius?this.config.borderRadius:"12px",e=this.config.faderWidth?this.config.faderWidth:"150px",i=this.config.faderHeight?this.config.faderHeight:"400px",r="faderThumbColor"in this.config?this.config.faderThumbColor:"#ddd";this.faderTrackColor="faderTrackColor"in this.config?this.config.faderTrackColor:"#ddd",this.faderActiveColor="faderActiveColor"in this.config?this.config.faderActiveColor:"#22ba00";const n="faderInactiveColor"in this.config?this.config.faderInactiveColor:"#f00",s="faderTheme"in this.config?this.config.faderTheme:"modern",o="updateWhileMoving"in this.config&&this.config.updateWhileMoving,a="alwaysShowFaderValue"in this.config&&this.config.alwaysShowFaderValue,l=!("haCard"in this.config)||this.config.haCard,d=this.config?this.config.description:"",h=this.config?this.config.title:"",c=[];this.faderColors={};for(let s=0;s<this.config.faders.length;s++){let l=this.config.faders[s];const d=this.hass.states[l.entity_id];if(!d)return null;const h="unavailable"===d.state,u=mt(d),p=d.attributes.max,f=d.attributes.min;if(!["number","media_player","input_number"].includes(u))continue;const v=l.name||this._entity_property(l.entity_id,"-name"),m=l.invert_active||!1;let _=0,g=l.active_entity_id?this._entity_property(l.active_entity_id,"state"):"on";m&&(g="on"===g?"off":"on"),"media_player"===u?(_=this._entity_property(l.entity_id,"-volume")||0,g=this._entity_property(l.entity_id,"-muted")?"off":"on"):_=d.state;const $="on"===g?"mdi:volume-high":"mdi:volume-mute",y=Math.round((_-f)/(p-f)*100)+"%";let b=l.value_entity_id?this.hass.states[l.value_entity_id]:null;const A=l.active_entity_id||("media_player"===u?l.entity_id:""),w=l.track_color||this.faderTrackColor,x=l.active_color||this.faderActiveColor,S=l.inactive_color||n,E=l.thumb_color||r;this.faderColors["fader_range_"+l.entity_id]={track_color:w,active_color:x,inactive_color:S,thumb_color:E};const C=A?D`
             <div class = "active-button" ${h?" disabled ":""} @click="${t=>this._toggleActive(t)}" data-entity="${A}" data-current-state="${g}">
                <span class="color" style="color:${"on"===g?x:S};"><ha-icon icon="${$}" /></span>
             </div>
        `:D`&nbsp;`;o?c.push(D`
                <div class = "fader" id = "fader_${l.entity_id}">
                  <div class="range-holder" style="--fader-height: ${i};--fader-width: ${e};">
                      <input type="range" class = "${"off"===g?"fader-inactive":"fader-active"} ${h?"fader-unavailable":""}" id = "fader_range_${l.entity_id}" style="--fader-width: ${e};--fader-height: ${i}; --fader-border-radius: ${t};--fader-color:${"on"===g?x:S};--fader-thumb-color:${E};--fader-track-color:${w};--fader-track-inactive-color:${S};" .value="${Math.round((_-f)/(p-f)*100)}" @input=${t=>this._setFaderLevel(d,t.target.value)}>
                  </div>
                  <div class = "fader-name">${v}</div>
                  <div class = "fader-value">${"on"===g||a?b?$t(this.hass.localize,b,this.hass.language):y:D`<br>`}</div>
                  <div class = "active-button-holder ${h?"button-disabled":""}">${C}</div>
                </div>
            `):c.push(D`
                <div class = "fader" id = "fader_${l.entity_id}">
                  <div class="range-holder" style="--fader-height: ${i};--fader-width: ${e};">
                      <input type="range" class = "${"off"===g?"fader-inactive":"fader-active"} ${h?"fader-unavailable":""}" id = "fader_range_${l.entity_id}" style="--fader-width: ${e};--fader-height: ${i}; --fader-border-radius: ${t};--fader-color:${"on"===g?x:S};--fader-thumb-color:${E};--fader-track-color:${w};--fader-track-inactive-color:${S};" .value="${Math.round((_-f)/(p-f)*100)}" @change=${t=>this._setFaderLevel(d,t.target.value)}>
                  </div>
                  <div class = "fader-name">${v}</div>
                  <div class = "fader-value">${"on"===g||a?b?$t(this.hass.localize,b,this.hass.language):y:D`<br>`} dB</div>
                  <div class = "active-button-holder ${h?"button-disabled":""}">${C}</div>
                </div>
            `)}let u=h?D`<h1 class="card-header"><div class = "name">${h}</div></div>`:"",p=d?D`<p class = "mixer-description">${d}</p>`:"";const f=D`
     ${u}
     ${p}
      <div>
        <div class="mixer-card" >
            <div class="fader-holder fader-theme-${s}" >
                ${c}
            </div>
        </div>
      </div>
    `;return l?D`<ha-card>${f} </ha-card>`:f}_entity_property(t,e){const i=this.hass.states[t];if(!i)return"";switch(e){case"-name":return i.attributes.friendly_name;case"-volume":return i.attributes.volume_level;case"-muted":return i.attributes.is_volume_muted;default:return i[e]}}_setFaderLevel(t,e){let i=mt(t);if("media_player"===i)this.hass.callService("media_player","volume_set",{entity_id:t.entity_id,volume_level:e/100});else{let r=t.attributes.max,n=t.attributes.min||0;this.hass.callService(i,"set_value",{entity_id:t.entity_id,value:e/100*(r-n)+n})}}_previewLevel(t,e){const i=this.shadowRoot.getElementById(t);i&&!i.className.includes("fader-inactive")&&(i.style.background=`linear-gradient(to right, ${this.faderColors[t].active_color} ${e}%, ${this.faderColors[t].track_color} ${e}%)`)}_toggleActive(t){const{entity:e,currentState:i}=t.target.dataset;if(!e)return;const r={entity_id:e};"media_player"===vt(e)?(r.is_volume_muted="on"===i,this.hass.callService("media_player","volume_mute",r)):this.hass.callService("switch","toggle",r),this.update_track_color()}async update_track_color(){const t=this.shadowRoot.querySelectorAll('.fader input[type="range"]');await Promise.all(Array.from(t).map(t=>t.updateComplete)),Array.from(t).map(t=>this._previewLevel(t.id,t.value))}async firstUpdated(){await this.update_track_color()}async updated(){await this.update_track_color()}setConfig(t){if(!t.faders)throw new Error("You need to define faders");this.config=t}getCardSize(){return this.config.entities.length+1}static get styles(){return s`

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
    `}});
