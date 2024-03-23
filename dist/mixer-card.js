/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;class s{constructor(t,e,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=r.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&r.set(i,t))}return t}toString(){return this.cssText}}const n=(t,...e)=>{const r=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new s(r,t,i)},o=(i,r)=>{e?i.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):r.forEach(e=>{const r=document.createElement("style"),s=t.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=e.cssText,i.appendChild(r)})},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,i))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var l;const d=window,h=d.trustedTypes,c=h?h.emptyScript:"",u=d.reactiveElementPolyfillSupport,p={toAttribute(t,e){switch(e){case Boolean:t=t?c:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},f=(t,e)=>e!==t&&(e==e||t==t),v={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:f},m="finalized";class _ extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const r=this._$Ep(i,e);void 0!==r&&(this._$Ev.set(r,i),t.push(r))}),t}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,r=this.getPropertyDescriptor(t,i,e);void 0!==r&&Object.defineProperty(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(r){const s=this[t];this[e]=r,this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||v}static finalize(){if(this.hasOwnProperty(m))return!1;this[m]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return o(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=v){var r;const s=this.constructor._$Ep(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==(null===(r=i.converter)||void 0===r?void 0:r.toAttribute)?i.converter:p).toAttribute(e,i.type);this._$El=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$El=null}}_$AK(t,e){var i;const r=this.constructor,s=r._$Ev.get(t);if(void 0!==s&&this._$El!==s){const t=r.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:p;this._$El=s,this[s]=n.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let r=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||f)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var g;_[m]=!0,_.elementProperties=new Map,_.elementStyles=[],_.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:_}),(null!==(l=d.reactiveElementVersions)&&void 0!==l?l:d.reactiveElementVersions=[]).push("1.6.3");const $=window,y=$.trustedTypes,b=y?y.createPolicy("lit-html",{createHTML:t=>t}):void 0,A=`lit$${(Math.random()+"").slice(9)}$`,w="?"+A,x=`<${w}>`,E=document,S=()=>E.createComment(""),C=t=>null===t||"object"!=typeof t&&"function"!=typeof t,k=Array.isArray,T="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,U=/>/g,H=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),O=/'/g,M=/"/g,R=/^(?:script|style|textarea|title)$/i,D=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),I=Symbol.for("lit-noChange"),z=Symbol.for("lit-nothing"),L=new WeakMap,j=E.createTreeWalker(E,129,null,!1);function B(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==b?b.createHTML(e):e}const F=(t,e)=>{const i=t.length-1,r=[];let s,n=2===e?"<svg>":"",o=N;for(let e=0;e<i;e++){const i=t[e];let a,l,d=-1,h=0;for(;h<i.length&&(o.lastIndex=h,l=o.exec(i),null!==l);)h=o.lastIndex,o===N?"!--"===l[1]?o=P:void 0!==l[1]?o=U:void 0!==l[2]?(R.test(l[2])&&(s=RegExp("</"+l[2],"g")),o=H):void 0!==l[3]&&(o=H):o===H?">"===l[0]?(o=null!=s?s:N,d=-1):void 0===l[1]?d=-2:(d=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?H:'"'===l[3]?M:O):o===M||o===O?o=H:o===P||o===U?o=N:(o=H,s=void 0);const c=o===H&&t[e+1].startsWith("/>")?" ":"";n+=o===N?i+x:d>=0?(r.push(a),i.slice(0,d)+"$lit$"+i.slice(d)+A+c):i+A+(-2===d?(r.push(void 0),e):c)}return[B(t,n+(t[i]||"<?>")+(2===e?"</svg>":"")),r]};class V{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let s=0,n=0;const o=t.length-1,a=this.parts,[l,d]=F(t,e);if(this.el=V.createElement(l,i),j.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(r=j.nextNode())&&a.length<o;){if(1===r.nodeType){if(r.hasAttributes()){const t=[];for(const e of r.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(A)){const i=d[n++];if(t.push(e),void 0!==i){const t=r.getAttribute(i.toLowerCase()+"$lit$").split(A),e=/([.?@])?(.*)/.exec(i);a.push({type:1,index:s,name:e[2],strings:t,ctor:"."===e[1]?Z:"?"===e[1]?G:"@"===e[1]?Q:K})}else a.push({type:6,index:s})}for(const e of t)r.removeAttribute(e)}if(R.test(r.tagName)){const t=r.textContent.split(A),e=t.length-1;if(e>0){r.textContent=y?y.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],S()),j.nextNode(),a.push({type:2,index:++s});r.append(t[e],S())}}}else if(8===r.nodeType)if(r.data===w)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=r.data.indexOf(A,t+1));)a.push({type:7,index:s}),t+=A.length-1}s++}}static createElement(t,e){const i=E.createElement("template");return i.innerHTML=t,i}}function W(t,e,i=t,r){var s,n,o,a;if(e===I)return e;let l=void 0!==r?null===(s=i._$Co)||void 0===s?void 0:s[r]:i._$Cl;const d=C(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===d?l=void 0:(l=new d(t),l._$AT(t,i,r)),void 0!==r?(null!==(o=(a=i)._$Co)&&void 0!==o?o:a._$Co=[])[r]=l:i._$Cl=l),void 0!==l&&(e=W(t,l._$AS(t,e.values),l,r)),e}class q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:r}=this._$AD,s=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:E).importNode(i,!0);j.currentNode=s;let n=j.nextNode(),o=0,a=0,l=r[0];for(;void 0!==l;){if(o===l.index){let e;2===l.type?e=new J(n,n.nextSibling,this,t):1===l.type?e=new l.ctor(n,l.name,l.strings,this,t):6===l.type&&(e=new X(n,this,t)),this._$AV.push(e),l=r[++a]}o!==(null==l?void 0:l.index)&&(n=j.nextNode(),o++)}return j.currentNode=E,s}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class J{constructor(t,e,i,r){var s;this.type=2,this._$AH=z,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cp=null===(s=null==r?void 0:r.isConnected)||void 0===s||s}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=W(this,t,e),C(t)?t===z||null==t||""===t?(this._$AH!==z&&this._$AR(),this._$AH=z):t!==this._$AH&&t!==I&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>k(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==z&&C(this._$AH)?this._$AA.nextSibling.data=t:this.$(E.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:r}=t,s="number"==typeof r?this._$AC(t):(void 0===r.el&&(r.el=V.createElement(B(r.h,r.h[0]),this.options)),r);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===s)this._$AH.v(i);else{const t=new q(s,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=L.get(t.strings);return void 0===e&&L.set(t.strings,e=new V(t)),e}T(t){k(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const s of t)r===e.length?e.push(i=new J(this.k(S()),this.k(S()),this,this.options)):i=e[r],i._$AI(s),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class K{constructor(t,e,i,r,s){this.type=1,this._$AH=z,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=z}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,r){const s=this.strings;let n=!1;if(void 0===s)t=W(this,t,e,0),n=!C(t)||t!==this._$AH&&t!==I,n&&(this._$AH=t);else{const r=t;let o,a;for(t=s[0],o=0;o<s.length-1;o++)a=W(this,r[i+o],e,o),a===I&&(a=this._$AH[o]),n||(n=!C(a)||a!==this._$AH[o]),a===z?t=z:t!==z&&(t+=(null!=a?a:"")+s[o+1]),this._$AH[o]=a}n&&!r&&this.j(t)}j(t){t===z?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Z extends K{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===z?void 0:t}}const Y=y?y.emptyScript:"";class G extends K{constructor(){super(...arguments),this.type=4}j(t){t&&t!==z?this.element.setAttribute(this.name,Y):this.element.removeAttribute(this.name)}}class Q extends K{constructor(t,e,i,r,s){super(t,e,i,r,s),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=W(this,t,e,0))&&void 0!==i?i:z)===I)return;const r=this._$AH,s=t===z&&r!==z||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,n=t!==z&&(r===z||s);s&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class X{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){W(this,t)}}const tt=$.litHtmlPolyfillSupport;null==tt||tt(V,J),(null!==(g=$.litHtmlVersions)&&void 0!==g?g:$.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var et,it;class rt extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var r,s;const n=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:e;let o=n._$litPart$;if(void 0===o){const t=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:null;n._$litPart$=o=new J(e.insertBefore(S(),t),t,void 0,null!=i?i:{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return I}}rt.finalized=!0,rt._$litElement$=!0,null===(et=globalThis.litElementHydrateSupport)||void 0===et||et.call(globalThis,{LitElement:rt});const st=globalThis.litElementPolyfillSupport;null==st||st({LitElement:rt}),(null!==(it=globalThis.litElementVersions)&&void 0!==it?it:globalThis.litElementVersions=[]).push("3.3.3");var nt,ot,at=function(t,e){return lt(e).format(t)},lt=function(t){return new Intl.DateTimeFormat(t.language,{year:"numeric",month:"long",day:"numeric"})};!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(nt||(nt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(ot||(ot={}));var dt=function(t){if(t.time_format===ot.language||t.time_format===ot.system){var e=t.time_format===ot.language?t.language:void 0,i=(new Date).toLocaleString(e);return i.includes("AM")||i.includes("PM")}return t.time_format===ot.am_pm},ht=function(t,e){return ct(e).format(t)},ct=function(t){return new Intl.DateTimeFormat(t.language,{year:"numeric",month:"long",day:"numeric",hour:dt(t)?"numeric":"2-digit",minute:"2-digit",hour12:dt(t)})},ut=function(t,e){return pt(e).format(t)},pt=function(t){return new Intl.DateTimeFormat(t.language,{hour:"numeric",minute:"2-digit",hour12:dt(t)})};function ft(){return(ft=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r])}return t}).apply(this,arguments)}function vt(t){return t.substr(0,t.indexOf("."))}function mt(t){return vt(t.entity_id)}var _t=function(t,e,i){var r=e?function(t){switch(t.number_format){case nt.comma_decimal:return["en-US","en"];case nt.decimal_comma:return["de","es","it"];case nt.space_comma:return["fr","sv","cs"];case nt.system:return;default:return t.language}}(e):void 0;if(Number.isNaN=Number.isNaN||function t(e){return"number"==typeof e&&t(e)},(null==e?void 0:e.number_format)!==nt.none&&!Number.isNaN(Number(t))&&Intl)try{return new Intl.NumberFormat(r,gt(t,i)).format(Number(t))}catch(e){return console.error(e),new Intl.NumberFormat(void 0,gt(t,i)).format(Number(t))}return"string"==typeof t?t:function(t,e){return void 0===e&&(e=2),Math.round(t*Math.pow(10,e))/Math.pow(10,e)}(t,null==i?void 0:i.maximumFractionDigits).toString()+("currency"===(null==i?void 0:i.style)?" "+i.currency:"")},gt=function(t,e){var i=ft({maximumFractionDigits:2},e);if("string"!=typeof t)return i;if(!e||!e.minimumFractionDigits&&!e.maximumFractionDigits){var r=t.indexOf(".")>-1?t.split(".")[1].length:0;i.minimumFractionDigits=r,i.maximumFractionDigits=r}return i},$t=function(t,e,i,r){var s=void 0!==r?r:e.state;if("unknown"===s||"unavailable"===s)return t("state.default."+s);if(function(t){return!!t.attributes.unit_of_measurement||!!t.attributes.state_class}(e)){if("monetary"===e.attributes.device_class)try{return _t(s,i,{style:"currency",currency:e.attributes.unit_of_measurement})}catch(t){}return _t(s,i)+(e.attributes.unit_of_measurement?" "+e.attributes.unit_of_measurement:"")}var n=mt(e);if("input_datetime"===n){var o;if(void 0===r)return e.attributes.has_date&&e.attributes.has_time?(o=new Date(e.attributes.year,e.attributes.month-1,e.attributes.day,e.attributes.hour,e.attributes.minute),ht(o,i)):e.attributes.has_date?(o=new Date(e.attributes.year,e.attributes.month-1,e.attributes.day),at(o,i)):e.attributes.has_time?((o=new Date).setHours(e.attributes.hour,e.attributes.minute),ut(o,i)):e.state;try{var a=r.split(" ");if(2===a.length)return ht(new Date(a.join("T")),i);if(1===a.length){if(r.includes("-"))return at(new Date(r+"T00:00"),i);if(r.includes(":")){var l=new Date;return ut(new Date(l.toISOString().split("T")[0]+"T"+r),i)}}return r}catch(t){return r}}return"humidifier"===n&&"on"===s&&e.attributes.humidity?e.attributes.humidity+" %":"counter"===n||"number"===n||"input_number"===n?_t(s,i):e.attributes.device_class&&t("component."+n+".state."+e.attributes.device_class+"."+s)||t("component."+n+".state._."+s)||s};customElements.define("custom-mixer-card",class extends rt{constructor(){super()}static get properties(){return{hass:{},config:{},active:{}}}render(){const t=this.config.borderRadius?this.config.borderRadius:"12px",e=this.config.faderWidth?this.config.faderWidth:"150px",i=this.config.faderHeight?this.config.faderHeight:"400px",r="faderThumbColor"in this.config?this.config.faderThumbColor:"#ddd";this.faderTrackColor="faderTrackColor"in this.config?this.config.faderTrackColor:"#ddd",this.faderActiveColor="faderActiveColor"in this.config?this.config.faderActiveColor:"#22ba00";const s="faderInactiveColor"in this.config?this.config.faderInactiveColor:"#f00",n="faderTheme"in this.config?this.config.faderTheme:"modern",o=!("haCard"in this.config)||this.config.haCard,a=this.config?this.config.description:"",l=this.config?this.config.title:"",d=[];for(const n in this.config.faders){let o=this.config.faders[n],a=this.hass.states[o.entity_id],l="unavailable"==a.state,h=mt(a),c=a.attributes.max;if(!["number","media_player"].includes(h))continue;const u=o.name||this._entity_property(o.entity_id,this.hass.states,"-name");let p=0,f=o.active_entity_id?this._entity_property(o.active_entity_id,this.hass.states,"state"):"on";"media_player"==h?(p=this._entity_property(o.entity_id,this.hass.states,"-volume")||0,f=this._entity_property(o.entity_id,this.hass.states,"-muted")?"off":"on"):p=a.state;const v="on"===f?"mdi:volume-high":"mdi:volume-mute",m=Math.round(p/c*100)+"%";let _=o.value_entity_id?this.hass.states[o.value_entity_id]:null;const g=o.active_entity_id||("media_player"==h?o.entity_id:""),$=g?D`
             <div class = "active-button" ${l?" disabled ":""} @click="${t=>this._toggleActive(t)}" data-entity="${g}" data-current-state="${f}">
                <span class="color" style="color:${"on"===f?this.faderActiveColor:s};"><ha-icon icon="${v}" /></span>
             </div>
        `:D`&nbsp;`;d.push(D`
            <div class = "fader" id = "fader_${o.entity_id}">
              <div class="range-holder" style="--fader-height: ${i};--fader-width: ${e};">
                  <input type="range" class = "${"off"===f?"fader-inactive":"fader-active"} ${l?"fader-unavailable":""}" id = "fader_range_${o.entity_id}" style="--fader-width: ${e};--fader-height: ${i}; --fader-border-radius: ${t};--fader-color:${"on"===f?this.faderActiveColor:s};--fader-thumb-color:${r};--fader-track-color:${this.faderTrackColor};--fader-track-inactive-color:${s};" .value="${Math.round(p/c*100)}" @change=${t=>this._setFaderLevel(a,t.target.value)}>
              </div>
              <div class = "fader-name">${u}</div>
              <div class = "fader-value">${"on"===f?_?$t(this.hass.localize,_,this.hass.language):m:D`<br>`}</div>
              <div class = "active-button-holder ${l?"button-disabled":""}">${$}</div>
            </div>
        `)}let h=l?D`<h1 class="card-header"><div class = "name">${l}</div></div>`:"",c=a?D`<p class = "mixer-description">${a}</p>`:"";const u=D`
     ${h}
     ${c}
      <div>
        <div class="mixer-card" >
            <div class="fader-holder fader-theme-${n}" >
                ${d}
            </div>
        </div>
      </div>
    `;return o?D`<ha-card>${u} </ha-card>`:u}_entity_property(t,e,i){return e[t]?"-name"===i?e[t].attributes.friendly_name:"-volume"===i?e[t].attributes.volume_level:"-muted"===i?e[t].attributes.is_volume_muted:e[t][i]:""}_setFaderLevel(t,e){if("media_player"==mt(t))this.hass.callService("media_player","volume_set",{entity_id:t.entity_id,volume_level:e/100});else{let i=t.attributes.max;this.hass.callService("number","set_value",{entity_id:t.entity_id,value:e/100*i})}}_previewLevel(t,e){const i=this.shadowRoot.getElementById(t);i&&!i.className.includes("fader-inactive")&&(i.style.background=`linear-gradient(to right, ${this.faderActiveColor} ${e}%, ${this.faderTrackColor} ${e}%)`)}_toggleActive(t){if(t.target.dataset&&t.target.dataset.entity){if("media_player"==vt(t.target.dataset.entity)){let e="on"==t.target.dataset.currentState;this.hass.callService("media_player","volume_mute",{entity_id:t.target.dataset.entity,is_volume_muted:e})}else this.hass.callService("switch","toggle",{entity_id:t.target.dataset.entity})}this.update_track_color()}async update_track_color(){const t=this.shadowRoot.querySelectorAll('.fader input[type="range"]');await Promise.all(Array.from(t).map(t=>t.updateComplete)),Array.from(t).map(t=>this._previewLevel(t.id,t.value))}async firstUpdated(){await this.update_track_color()}async updated(){await this.update_track_color()}setConfig(t){if(!t.faders)throw new Error("You need to define faders");this.config=t}getCardSize(){return this.config.entities.length+1}static get styles(){return n`

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
