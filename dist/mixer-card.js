/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=window,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;class a{constructor(e,t,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=r.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(i,e))}return e}toString(){return this.cssText}}const n=(i,r)=>{t?i.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):r.forEach(t=>{const r=document.createElement("style"),a=e.litNonce;void 0!==a&&r.setAttribute("nonce",a),r.textContent=t.cssText,i.appendChild(r)})},o=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new a("string"==typeof e?e:e+"",void 0,i))(t)})(e):e
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var s;const l=window,d=l.trustedTypes,h=d?d.emptyScript:"",c=l.reactiveElementPolyfillSupport,u={toAttribute(e,t){switch(t){case Boolean:e=e?h:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},f=(e,t)=>t!==e&&(t==t||e==e),p={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:f},v="finalized";class m extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const r=this._$Ep(i,t);void 0!==r&&(this._$Ev.set(r,i),e.push(r))}),e}static createProperty(e,t=p){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,r=this.getPropertyDescriptor(e,i,t);void 0!==r&&Object.defineProperty(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(r){const a=this[e];this[t]=r,this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||p}static finalize(){if(this.hasOwnProperty(v))return!1;this[v]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(o(e))}else void 0!==e&&t.push(o(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach(e=>e(this))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return n(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)})}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=p){var r;const a=this.constructor._$Ep(e,i);if(void 0!==a&&!0===i.reflect){const n=(void 0!==(null===(r=i.converter)||void 0===r?void 0:r.toAttribute)?i.converter:u).toAttribute(t,i.type);this._$El=e,null==n?this.removeAttribute(a):this.setAttribute(a,n),this._$El=null}}_$AK(e,t){var i;const r=this.constructor,a=r._$Ev.get(e);if(void 0!==a&&this._$El!==a){const e=r.getPropertyOptions(a),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:u;this._$El=a,this[a]=n.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let r=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||f)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((e,t)=>this[t]=e),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)}),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach(e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach((e,t)=>this._$EO(t,this[t],e)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var g;m[v]=!0,m.elementProperties=new Map,m.elementStyles=[],m.shadowRootOptions={mode:"open"},null==c||c({ReactiveElement:m}),(null!==(s=l.reactiveElementVersions)&&void 0!==s?s:l.reactiveElementVersions=[]).push("1.6.3");const b=window,_=b.trustedTypes,w=_?_.createPolicy("lit-html",{createHTML:e=>e}):void 0,y=`lit$${(Math.random()+"").slice(9)}$`,$="?"+y,x=`<${$}>`,A=document,k=()=>A.createComment(""),S=e=>null===e||"object"!=typeof e&&"function"!=typeof e,E=Array.isArray,C="[ \t\n\f\r]",F=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,O=/>/g,R=RegExp(`>|${C}(?:([^\\s"'>=/]+)(${C}*=${C}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,M=/"/g,H=/^(?:script|style|textarea|title)$/i,U=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),N=Symbol.for("lit-noChange"),j=Symbol.for("lit-nothing"),P=new WeakMap,D=A.createTreeWalker(A,129,null,!1);function I(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==w?w.createHTML(t):t}const W=(e,t)=>{const i=e.length-1,r=[];let a,n=2===t?"<svg>":"",o=F;for(let t=0;t<i;t++){const i=e[t];let s,l,d=-1,h=0;for(;h<i.length&&(o.lastIndex=h,l=o.exec(i),null!==l);)h=o.lastIndex,o===F?"!--"===l[1]?o=T:void 0!==l[1]?o=O:void 0!==l[2]?(H.test(l[2])&&(a=RegExp("</"+l[2],"g")),o=R):void 0!==l[3]&&(o=R):o===R?">"===l[0]?(o=null!=a?a:F,d=-1):void 0===l[1]?d=-2:(d=o.lastIndex-l[2].length,s=l[1],o=void 0===l[3]?R:'"'===l[3]?M:z):o===M||o===z?o=R:o===T||o===O?o=F:(o=R,a=void 0);const c=o===R&&e[t+1].startsWith("/>")?" ":"";n+=o===F?i+x:d>=0?(r.push(s),i.slice(0,d)+"$lit$"+i.slice(d)+y+c):i+y+(-2===d?(r.push(void 0),t):c)}return[I(e,n+(e[i]||"<?>")+(2===t?"</svg>":"")),r]};class L{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let a=0,n=0;const o=e.length-1,s=this.parts,[l,d]=W(e,t);if(this.el=L.createElement(l,i),D.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(r=D.nextNode())&&s.length<o;){if(1===r.nodeType){if(r.hasAttributes()){const e=[];for(const t of r.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith(y)){const i=d[n++];if(e.push(t),void 0!==i){const e=r.getAttribute(i.toLowerCase()+"$lit$").split(y),t=/([.?@])?(.*)/.exec(i);s.push({type:1,index:a,name:t[2],strings:e,ctor:"."===t[1]?K:"?"===t[1]?G:"@"===t[1]?J:Y})}else s.push({type:6,index:a})}for(const t of e)r.removeAttribute(t)}if(H.test(r.tagName)){const e=r.textContent.split(y),t=e.length-1;if(t>0){r.textContent=_?_.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],k()),D.nextNode(),s.push({type:2,index:++a});r.append(e[t],k())}}}else if(8===r.nodeType)if(r.data===$)s.push({type:2,index:a});else{let e=-1;for(;-1!==(e=r.data.indexOf(y,e+1));)s.push({type:7,index:a}),e+=y.length-1}a++}}static createElement(e,t){const i=A.createElement("template");return i.innerHTML=e,i}}function B(e,t,i=e,r){var a,n,o,s;if(t===N)return t;let l=void 0!==r?null===(a=i._$Co)||void 0===a?void 0:a[r]:i._$Cl;const d=S(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===d?l=void 0:(l=new d(e),l._$AT(e,i,r)),void 0!==r?(null!==(o=(s=i)._$Co)&&void 0!==o?o:s._$Co=[])[r]=l:i._$Cl=l),void 0!==l&&(t=B(e,l._$AS(e,t.values),l,r)),t}class V{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:r}=this._$AD,a=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:A).importNode(i,!0);D.currentNode=a;let n=D.nextNode(),o=0,s=0,l=r[0];for(;void 0!==l;){if(o===l.index){let t;2===l.type?t=new q(n,n.nextSibling,this,e):1===l.type?t=new l.ctor(n,l.name,l.strings,this,e):6===l.type&&(t=new Z(n,this,e)),this._$AV.push(t),l=r[++s]}o!==(null==l?void 0:l.index)&&(n=D.nextNode(),o++)}return D.currentNode=A,a}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class q{constructor(e,t,i,r){var a;this.type=2,this._$AH=j,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cp=null===(a=null==r?void 0:r.isConnected)||void 0===a||a}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=B(this,e,t),S(e)?e===j||null==e||""===e?(this._$AH!==j&&this._$AR(),this._$AH=j):e!==this._$AH&&e!==N&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>E(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==j&&S(this._$AH)?this._$AA.nextSibling.data=e:this.$(A.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:r}=e,a="number"==typeof r?this._$AC(e):(void 0===r.el&&(r.el=L.createElement(I(r.h,r.h[0]),this.options)),r);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===a)this._$AH.v(i);else{const e=new V(a,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=P.get(e.strings);return void 0===t&&P.set(e.strings,t=new L(e)),t}T(e){E(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const a of e)r===t.length?t.push(i=new q(this.k(k()),this.k(k()),this,this.options)):i=t[r],i._$AI(a),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class Y{constructor(e,t,i,r,a){this.type=1,this._$AH=j,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=j}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,r){const a=this.strings;let n=!1;if(void 0===a)e=B(this,e,t,0),n=!S(e)||e!==this._$AH&&e!==N,n&&(this._$AH=e);else{const r=e;let o,s;for(e=a[0],o=0;o<a.length-1;o++)s=B(this,r[i+o],t,o),s===N&&(s=this._$AH[o]),n||(n=!S(s)||s!==this._$AH[o]),s===j?e=j:e!==j&&(e+=(null!=s?s:"")+a[o+1]),this._$AH[o]=s}n&&!r&&this.j(e)}j(e){e===j?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class K extends Y{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===j?void 0:e}}const X=_?_.emptyScript:"";class G extends Y{constructor(){super(...arguments),this.type=4}j(e){e&&e!==j?this.element.setAttribute(this.name,X):this.element.removeAttribute(this.name)}}class J extends Y{constructor(e,t,i,r,a){super(e,t,i,r,a),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=B(this,e,t,0))&&void 0!==i?i:j)===N)return;const r=this._$AH,a=e===j&&r!==j||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,n=e!==j&&(r===j||a);a&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class Z{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){B(this,e)}}const Q=b.litHtmlPolyfillSupport;null==Q||Q(L,q),(null!==(g=b.litHtmlVersions)&&void 0!==g?g:b.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ee,te;class ie extends m{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var r,a;const n=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:t;let o=n._$litPart$;if(void 0===o){const e=null!==(a=null==i?void 0:i.renderBefore)&&void 0!==a?a:null;n._$litPart$=o=new q(t.insertBefore(k(),e),e,void 0,null!=i?i:{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return N}}ie.finalized=!0,ie._$litElement$=!0,null===(ee=globalThis.litElementHydrateSupport)||void 0===ee||ee.call(globalThis,{LitElement:ie});const re=globalThis.litElementPolyfillSupport;null==re||re({LitElement:ie}),(null!==(te=globalThis.litElementVersions)&&void 0!==te?te:globalThis.litElementVersions=[]).push("3.3.3");var ae,ne,oe=function(e,t){return se(t).format(e)},se=function(e){return new Intl.DateTimeFormat(e.language,{year:"numeric",month:"long",day:"numeric"})};!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(ae||(ae={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(ne||(ne={}));var le=function(e){if(e.time_format===ne.language||e.time_format===ne.system){var t=e.time_format===ne.language?e.language:void 0,i=(new Date).toLocaleString(t);return i.includes("AM")||i.includes("PM")}return e.time_format===ne.am_pm},de=function(e,t){return he(t).format(e)},he=function(e){return new Intl.DateTimeFormat(e.language,{year:"numeric",month:"long",day:"numeric",hour:le(e)?"numeric":"2-digit",minute:"2-digit",hour12:le(e)})},ce=function(e,t){return ue(t).format(e)},ue=function(e){return new Intl.DateTimeFormat(e.language,{hour:"numeric",minute:"2-digit",hour12:le(e)})};function fe(){return(fe=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e}).apply(this,arguments)}function pe(e){return e.substr(0,e.indexOf("."))}function ve(e){return pe(e.entity_id)}var me=function(e,t,i){var r=t?function(e){switch(e.number_format){case ae.comma_decimal:return["en-US","en"];case ae.decimal_comma:return["de","es","it"];case ae.space_comma:return["fr","sv","cs"];case ae.system:return;default:return e.language}}(t):void 0;if(Number.isNaN=Number.isNaN||function e(t){return"number"==typeof t&&e(t)},(null==t?void 0:t.number_format)!==ae.none&&!Number.isNaN(Number(e))&&Intl)try{return new Intl.NumberFormat(r,ge(e,i)).format(Number(e))}catch(t){return console.error(t),new Intl.NumberFormat(void 0,ge(e,i)).format(Number(e))}return"string"==typeof e?e:function(e,t){return void 0===t&&(t=2),Math.round(e*Math.pow(10,t))/Math.pow(10,t)}(e,null==i?void 0:i.maximumFractionDigits).toString()+("currency"===(null==i?void 0:i.style)?" "+i.currency:"")},ge=function(e,t){var i=fe({maximumFractionDigits:2},t);if("string"!=typeof e)return i;if(!t||!t.minimumFractionDigits&&!t.maximumFractionDigits){var r=e.indexOf(".")>-1?e.split(".")[1].length:0;i.minimumFractionDigits=r,i.maximumFractionDigits=r}return i};function be(e){return{borderRadius:e&&e.borderRadius?e.borderRadius:"12px",faderWidth:e&&e.faderWidth?e.faderWidth:null,faderHeight:e&&e.faderHeight?e.faderHeight:null,faderInactiveColor:e&&e.faderInactiveColor?e.faderInactiveColor:"#f00",faderThumbColor:e&&e.faderThumbColor?e.faderThumbColor:"#ddd",faderTrackColor:e&&e.faderTrackColor?e.faderTrackColor:"#ddd",faderActiveColor:e&&e.faderActiveColor?e.faderActiveColor:"#22ba00",faderTheme:e&&e.faderTheme?e.faderTheme:"modern",updateWhileMoving:!(!e||!e.updateWhileMoving)&&e.updateWhileMoving,alwaysShowFaderValue:!(!e||!e.alwaysShowFaderValue)&&e.alwaysShowFaderValue,showActiveButton:!e||void 0===e.showActiveButton||e.showActiveButton,showDbScale:!e||void 0===e.showDbScale||e.showDbScale,haCard:!e||void 0===e.haCard||e.haCard,description:e&&e.description?e.description:"",title:e&&e.title?e.title:"",faderKnobImage:e&&e.faderKnobImage?e.faderKnobImage:"",orientation:e&&e.orientation?e.orientation:"vertical"}}const _e=[{label:"+10",f:1,major:!0},{label:"5",f:.875,major:!1},{label:"0",f:.75,major:!0},{label:"-5",f:.625,major:!1},{label:"-10",f:.5,major:!0},{label:"-15",f:.4375,major:!1},{label:"-20",f:.375,major:!0},{label:"-25",f:.3125,major:!1},{label:"-30",f:.25,major:!0},{label:"-40",f:.1875,major:!0},{label:"-50",f:.125,major:!0},{label:"-60",f:.0625,major:!0},{label:"-∞",f:0,major:!0}];function we(e,t,i){const r="number"==typeof e.max?e.max:t.attributes.max||1,a="number"==typeof e.min?e.min:t.attributes.min||0;let n=0;n="media_player"===ve(t)?t.attributes.volume_level||0:t.state;const o=Math.round((n-a)/(r-a)*100);let s=o+"%";e.value_entity_id&&Object.prototype.hasOwnProperty.call(i.states,e.value_entity_id)?s=function(e,t,i,r){var a=void 0!==r?r:t.state;if("unknown"===a||"unavailable"===a)return e("state.default."+a);if(function(e){return!!e.attributes.unit_of_measurement||!!e.attributes.state_class}(t)){if("monetary"===t.attributes.device_class)try{return me(a,i,{style:"currency",currency:t.attributes.unit_of_measurement})}catch(e){}return me(a,i)+(t.attributes.unit_of_measurement?" "+t.attributes.unit_of_measurement:"")}var n=ve(t);if("input_datetime"===n){var o;if(void 0===r)return t.attributes.has_date&&t.attributes.has_time?(o=new Date(t.attributes.year,t.attributes.month-1,t.attributes.day,t.attributes.hour,t.attributes.minute),de(o,i)):t.attributes.has_date?(o=new Date(t.attributes.year,t.attributes.month-1,t.attributes.day),oe(o,i)):t.attributes.has_time?((o=new Date).setHours(t.attributes.hour,t.attributes.minute),ce(o,i)):t.state;try{var s=r.split(" ");if(2===s.length)return de(new Date(s.join("T")),i);if(1===s.length){if(r.includes("-"))return oe(new Date(r+"T00:00"),i);if(r.includes(":")){var l=new Date;return ce(new Date(l.toISOString().split("T")[0]+"T"+r),i)}}return r}catch(e){return r}}return"humidifier"===n&&"on"===a&&t.attributes.humidity?t.attributes.humidity+" %":"counter"===n||"number"===n||"input_number"===n?me(a,i):t.attributes.device_class&&e("component."+n+".state."+t.attributes.device_class+"."+a)||e("component."+n+".state._."+a)||a}(i.localize,i.states[e.value_entity_id],i.language):e.value_attribute&&Object.prototype.hasOwnProperty.call(t.attributes,e.value_attribute)&&(s=t.attributes[e.value_attribute]);const l=e.value_suffix||"";return l&&(s+=" "+l),{displayValue:s,inputValue:o}}const ye=((e,...t)=>{const r=1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]);return new a(r,e,i)})`
    :host {
        display: block;
        width: 100%;
        box-sizing: border-box;
        /* Fluid fader dimensions: used whenever a fader/card config doesn't
           set an explicit faderWidth/faderHeight (see getConfigDefaults).
           Deliberately fixed, not vw/vh-based: this card can end up in a
           section column far narrower than the browser viewport (HA's
           sections view splits the page into several such columns), and
           viewport units have no way to know that — they size against the
           whole window, not the space actually given to the card, which
           reintroduces the original overflow/wrap bug one level up. A
           modest fixed default plus .fader-holder's flex-wrap is what
           actually makes this responsive: faders wrap onto a new row once
           the card's *own* width runs out, regardless of viewport size. */
        --fader-width: 84px;
        --fader-height: 220px;
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
    .mixer-card {
        /* padding (not margin) matches ha-card's own .card-content
           convention, so this card lines up with sibling cards without
           needing a card_mod offset hack. */
        padding: 16px;
        box-sizing: border-box;
    }
    .fader-holder {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;
      width: 100%;
      overflow-x: auto; /* Fallback if a single row still can't fit */
      -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
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
    .fader-unavailable, .button-disabled {
        opacity: 20%;
        pointer-events: none;
    }

    /* Orientation  - Vertical */

    .fader-orientation-vertical .fader {
        padding: 6px 10px;
        /* Fixed to the slider's own thickness rather than sized from the
           name/value text below it — otherwise a longer fader name (e.g.
           "Office Speaker") silently widens the whole column, and a couple
           of those can be just enough to tip flex-wrap into wrapping faders
           that would otherwise fit side by side. Text wraps within this
           width instead (see .fader-name/.fader-value below). */
        width: var(--fader-width);
        flex: 0 0 auto;
        box-sizing: content-box;
    }
    .fader-orientation-vertical .fader-value {
        margin-top: 10px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .fader-orientation-vertical .fader-name {
        margin-top: 30px;
        text-align: center;
        display: block;
        font-weight: 300;
        text-align: center;
        font-size:14px;
        text-transform: capitalize;
        /* Truncate rather than wrap/grow: a longer name (e.g. "Office
           Speaker") should never widen the fader column — that's the
           slider's job to define (--fader-width), not the label's. This
           matches how HA's own cards handle overflowing text (tile, entity
           rows, etc: ellipsis, not reflow). */
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .fader-orientation-vertical .active-button {
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
    .fader-orientation-vertical .range-holder {
        height: var(--fader-height);
        width: var(--fader-width);
        position:relative;
        display: block;
        margin-right: auto;
        margin-left: auto;
    }

    .fader-orientation-vertical .range-holder input[type="range"] {
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

    /* Orientation  - Horizontal */

    .fader-orientation-horizontal .fader-holder {
        display: contents;
    }
    .fader-orientation-horizontal .fader {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0;
        margin-bottom: 0px;
        gap: 15px;
    }
    .fader-orientation-horizontal .fader-holder,
    .fader-orientation-horizontal .fader-data {
        display: contents;
    }
    .fader-orientation-horizontal .fader-value {
        text-align: center;
        display:inline-block;
        order: 3;
        min-width: 50px;
    }
    .fader-orientation-horizontal .fader-name {
        display:inline-block;
        text-align: center;
        font-weight: 300;
        text-align: left;
        font-size:14px;
        text-transform: capitalize;
        order: 4;
    }
    .fader-orientation-horizontal .active-button-holder {
        display:inline-block;
        order: 1;
    }
    .fader-orientation-horizontal .active-button {
        line-height:20px;
        border: 1px solid #bbb;
        box-shadow: 1px 1px 1px #bbb;
        display: inline-block;
        padding: 5px;
        cursor:pointer;
        vertical-align: center;
        text-align: center;
        border-radius: 5px;
    }

    .fader-orientation-horizontal .range-holder {
        order: 2;
        height: var(--fader-width);
        /* Fill whatever width the row has left, rather than a fixed
           --fader-height, so horizontal faders track the card's actual
           width instead of overflowing/underflowing it. */
        flex: 1 1 auto;
        width: auto;
        min-width: 80px;
        position:relative;
        display: flex;
        align-items: center;
        margin: 0;
    }

    .fader-orientation-horizontal .range-holder input[type="range"] {
        margin: 0;
        outline: 0;
        border: 0;
        top: 50%;
        position: absolute;
        transform: translateY(-50%);
        left: 0;
        width: 100%;
        height: var(--fader-width);
        background-color: var(--fader-track-color);
        transition: box-shadow 0.2s ease-in-out;
        -webkit-appearance: none;
        appearance: none;
        border-radius: var(--fader-border-radius, 12px);
    }

    /* Theme Physical */
    /* The knob-width track extension below (so the knob's center can reach
       the true top/bottom extremes) makes the knob itself overshoot the
       nominal track by half its own along-track size at full travel —
       clipping that with overflow:hidden just cuts the knob in half at the
       extremes, which reads as a rendering bug, not a housing edge. Instead
       give the knob room to be fully visible there: push the range-holder-
       wrap (or bare range-holder when the dB scale is hidden, see
       mixer-card.js) away from the value/name text above and below by
       exactly that overshoot amount, on both sides of the direct-child
       selector since which element is the actual direct child differs
       depending on whether the scale renders. */
    .fader-orientation-vertical .fader-theme-physical .fader > .range-holder,
    .fader-orientation-vertical .fader-theme-physical .fader > .range-holder-wrap {
        margin-top: calc(var(--fader-width) * 0.283335);
        margin-bottom: calc(var(--fader-width) * 0.283335);
    }
    .fader-theme-physical .range-holder input[type="range"] {
        top: 50%;
        /* An unstyled range input always insets its thumb's travel by half
           the thumb's own along-track size from each end of its track —
           so at raw value 0/1 the knob stops short of the true top/bottom
           extremes (and of where the dB scale's +10/-∞ labels sit, see
           renderDbScale in helpers.js). Extending the track by exactly the
           knob's own width (matching the ratio used for the knob itself
           below) and re-centering via the right offset cancels that inset
           out entirely, so the knob's center lines up with the scale's
           edges at full travel -- verified against real X32 reference
           screenshots showing exactly that alignment.
           (Vertical orientation only -- horizontal's own width:100% rule
           further down wins on specificity and is unaffected.) */
        width: calc(var(--fader-height) + (var(--fader-width) * 0.56667));
        right: calc(50% - ((var(--fader-height) + (var(--fader-width) * 0.56667)) / 2));
        height: 5px;
        background-color: var(--fader-track-color);
    }
    .fader-theme-physical .range-holder input[type="range"].fader-inactive {
        background-color: var(--fader-track-inactive-color);
    }
    .fader-theme-physical .range-holder input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        /* Scaled from --fader-width (thickness) rather than a fixed 40x85px,
           so the knob shrinks/grows with the track instead of overflowing
           it at small fluid sizes. Ratio matches the old fixed values
           exactly at the legacy 150px default, so background-size: cover
           crops the SVG the same way as before at any scale. */
        height: calc(var(--fader-width) * 0.26667);
        width: calc(var(--fader-width) * 0.56667);
        cursor: pointer;
        transition: box-shadow 0.2s ease-in-out;
        background-image: var(--fader-knob-image, url("/hacsfiles/mixer-card/fader.svg"));
        background-size: cover;
        border-radius: 7px;
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

    /* Both themes above set an explicit width on the range input (driven
       by --fader-height, meant as the vertical-orientation "length" after
       rotation). In horizontal orientation that same input is never
       rotated, so pin its width back to 100% of the flexed range-holder
       (higher specificity than the theme rules so it wins regardless of
       theme). */
    .fader-orientation-horizontal .fader-theme-modern .range-holder input[type="range"],
    .fader-orientation-horizontal .fader-theme-physical .range-holder input[type="range"] {
        width: 100%;
    }

    /* X32-style layout (physical theme, vertical orientation only — see
       isX32Style in mixer-card.js). Value readout above the fader instead
       of below, plus a printed dB scale to its left. */
    .fader-value-top {
        margin-top: 0;
        margin-bottom: 8px;
    }
    .range-holder-wrap {
        display: flex;
        align-items: stretch;
        /* No gap: the scale's own tick lines (below) bridge the space to
           the slider, so it reads as connected rather than floating. */
        gap: 0;
    }
    /* The scale sits beside the slider, so the fader column needs to be
       wider than just the slider's own thickness to fit both — but only
       when the scale is actually rendered (showDbScale: false drops the
       .has-db-scale class along with the scale markup itself, see
       renderFader in mixer-card.js). */
    .fader-orientation-vertical .fader.has-db-scale {
        width: calc(var(--fader-width) + 26px);
    }
    /* .fader-value-top/.fader-name center themselves across the *whole*
       fader box by default, which now includes the scale's 22px + 4px gap
       to the left — so their centered text skews visibly left of the
       slider itself. Push the centering context right by exactly that
       width so it lines up with the slider, not the scale+slider box. */
    .fader-orientation-vertical .fader.has-db-scale .fader-value-top,
    .fader-orientation-vertical .fader.has-db-scale .fader-name {
        margin-left: 26px;
    }
    .fader-db-scale {
        position: relative;
        /* Was 22px + a 4px gap to the slider; the gap moved to 0 above, so
           this absorbs it — same total footprint, just tighter to the
           fader (see .fader's own +26px width allowance below). */
        width: 26px;
        flex: 0 0 auto;
        font-size: 9px;
        line-height: 1;
        color: var(--secondary-text-color, #888);
    }
    .fader-db-scale .db-tick {
        position: absolute;
        right: 0;
        transform: translateY(-50%);
        white-space: nowrap;
        display: flex;
        align-items: center;
        gap: 3px;
    }
    .fader-db-scale .db-tick-line {
        flex: 0 0 auto;
        height: 1px;
        background: currentColor;
        width: 3px;
    }
    .fader-db-scale .db-tick.major .db-tick-line {
        width: 6px;
    }
`;customElements.define("custom-mixer-card",class extends ie{constructor(){super(),this._relativeFaderActive=!1,this._relativeFaderStates={},this._relativeFaderSensitivity=.2,this._onRelativeFaderMove=this._onRelativeFaderMove.bind(this),this._onRelativeFaderUp=this._onRelativeFaderUp.bind(this)}static get properties(){return{hass:{},config:{},active:{}}}static get styles(){return ye}render(){const e=be(this.config),t=[];if(this.faderColors={},!this.config||!this.config.faders||!Array.isArray(this.config.faders))throw new Error('Invalid configuration: "faders" must be an array.');for(let i=0;i<this.config.faders.length;i++){const r=this.config.faders[i],a=this.hass.states[r.entity_id];a?t.push(this.renderFader(r,a,e)):console.warn(`Entity ${r.entity_id} not found in Home Assistant.`)}const i=function(e){const t=e.title?U`<h1 class='card-header'><div class='name'>${e.title}</div></div>`:"",i=e.description?U`<p class='mixer-description'>${e.description}</p>`:"";return U`${t}${i}`}(e),r=U`
      ${i}
      <div>
        <div class='mixer-card fader-orientation-${e.orientation}'>
          <div class='fader-holder fader-theme-${e.faderTheme}'>          
            ${t}
          </div>
        </div>
      </div>
    `;return e.haCard?U`<ha-card class="mixer-card-ha-card">${r}</ha-card>`:r}renderFader(e,t,i){const r="unavailable"===t.state,a=ve(t),n="number"==typeof e.max?e.max:t.attributes.max||1,o="number"==typeof e.min?e.min:t.attributes.min||0;if(!["number","media_player","input_number"].includes(a))return null;const s=e.name||this._entity_property(e.entity_id,"-name"),l=e.invert_active||!1;let d=e.active_entity_id?this._entity_property(e.active_entity_id,"state"):"on";"media_player"===a&&(d=this._entity_property(e.entity_id,"-muted")?"off":"on"),l&&(d="on"===d?"off":"on");const h=function(e,t,i){return"on"===i?"mdi:volume-high":"mdi:volume-mute"}(0,0,d),{displayValue:c,inputValue:u}=we(e,t,this.hass),f=e.active_entity_id||("media_player"===a?e.entity_id:""),p=function(e,t){return{track:e.track_color||t.faderTrackColor,active:e.active_color||t.faderActiveColor,inactive:e.inactive_color||t.faderInactiveColor,thumb:e.thumb_color||t.faderThumbColor}}(e,i),v=p.track,m=p.active,g=p.inactive,b=p.thumb;this.faderColors["fader_range_"+e.entity_id]={track_color:v,active_color:m,inactive_color:g,thumb_color:b};const _=("boolean"==typeof e.showActiveButton?e.showActiveButton:i.showActiveButton)?this._renderActiveButton(f,d,r,m,g,h):U`&nbsp;`,w=`${"off"===d?"fader-inactive":"fader-active"}${r?" fader-unavailable":""}`,y="fader_range_"+e.entity_id,$=function(e,t,i){let r=`--fader-border-radius: ${t.borderRadius}; `;return t.faderWidth&&(r+=`--fader-width: ${t.faderWidth}; `),t.faderHeight&&(r+=`--fader-height: ${t.faderHeight}; `),r+=`--fader-color: ${"on"===i?e.active:e.inactive}; `,r+=`--fader-thumb-color: ${e.thumb}; --fader-track-color: ${e.track}; --fader-track-inactive-color: ${e.inactive};`,t.faderKnobImage&&(r+=` --fader-knob-image: url("${t.faderKnobImage}");`),r}(p,i,d);let x;if(this.config&&this.config.relativeFader){let e;e="physical"===i.faderTheme?$.replace(/;+\s*$/,"")+"; width:var(--fader-height); height:5px;":$.replace(/;+\s*$/,"")+"; width:var(--fader-height); height:var(--fader-width);",x=U`
        <input type='range'
          class='${w}'
          id='${y}'
          style='${e}'
          .value='${u}'
          @mousedown=${e=>this._onRelativeFaderDown(e,t,o,n)}
          @touchstart=${e=>this._onRelativeFaderDown(e,t,o,n)}>
      `}else x=i.updateWhileMoving?U`<input type='range' class='${w}' id='${y}' style='${$}' .value='${u}' @input=${e=>this._setFaderLevel(t,e.target.value)}>`:U`<input type='range' class='${w}' id='${y}' style='${$}' .value='${u}' @change=${e=>this._setFaderLevel(t,e.target.value)}>`;const A=`${i.faderHeight?`--fader-height: ${i.faderHeight};`:""}${i.faderWidth?`--fader-width: ${i.faderWidth};`:""}`,k="on"===d||i.alwaysShowFaderValue?c:U`<br>`,S="physical"===i.faderTheme&&"horizontal"!==i.orientation,E="boolean"==typeof e.showDbScale?e.showDbScale:i.showDbScale,C=S&&E,F=C?U`
          <div class='range-holder-wrap'>
            ${U`
    <div class="fader-db-scale">
      ${_e.map(e=>{const t=100*(1-e.f)+"%";return U`
          <span class="db-tick ${e.major?"major":"minor"}" style="top: ${t}">
            <span class="db-tick-label">${e.label}</span>
            <span class="db-tick-line"></span>
          </span>
        `})}
    </div>
  `}
            <div class='range-holder' style='${A}'>
              ${x}
            </div>
          </div>
        `:U`
          <div class='range-holder' style='${A}'>
            ${x}
          </div>
        `;return U`
      <div class='fader ${C?"has-db-scale":""}' id='fader_${e.entity_id}'>
        ${S?U`<div class='fader-value fader-value-top'>${k}</div>`:""}
        ${F}
        <div class='fader-data'>
          <div class='fader-name'>${s}</div>
          ${S?"":U`<div class='fader-value'>${k}</div>`}
          <div class='active-button-holder ${r?"button-disabled":""}'>${_}</div>
        </div>
      </div>
    `}get relativeFaderPointerEvents(){return this._relativeFaderActive?"auto":"none"}_onRelativeFaderDown(e,t,i,r){e.preventDefault();const a=e.touches?e.touches[0].clientY:e.clientY;this._relativeFaderActive=!0,this.requestUpdate(),this._relativeFaderStartY=a,this._relativeFaderStateObj=t,this._relativeFaderMin=i,this._relativeFaderMax=r,this._relativeFaderInput=e.target,this._relativeFaderStartValue=Number(e.target.value),window.addEventListener("mousemove",this._onRelativeFaderMove),window.addEventListener("touchmove",this._onRelativeFaderMove),window.addEventListener("mouseup",this._onRelativeFaderUp),window.addEventListener("touchend",this._onRelativeFaderUp)}_onRelativeFaderMove(e){if(!this._relativeFaderActive)return;const t=e.touches?e.touches[0].clientY:e.clientY,i=this._relativeFaderStartY-t;let r=this._relativeFaderStartValue+i*this._relativeFaderSensitivity;r=Math.max(0,Math.min(100,r)),this._relativeFaderInput.value=r,this._setFaderLevel(this._relativeFaderStateObj,r)}_onRelativeFaderUp(e){this._relativeFaderActive&&(this._relativeFaderActive=!1,this._relativeFaderStates={},this.requestUpdate(),window.removeEventListener("mousemove",this._onRelativeFaderMove),window.removeEventListener("touchmove",this._onRelativeFaderMove),window.removeEventListener("mouseup",this._onRelativeFaderUp),window.removeEventListener("touchend",this._onRelativeFaderUp),this._relativeFaderStateObj=null,this._relativeFaderInput=null)}_renderActiveButton(e,t,i,r,a,n){return e?U`
          <div 
              .key="${e}_${t}"
              class="active-button" 
              ?disabled="${i}"
              @click="${e=>this._toggleActive(e)}"
              data-entity="${e}"
              data-current-state="${t}">
            <span class="color" style="color:${"on"===t?r:a};">
              <ha-icon .icon="${n}"></ha-icon>
            </span>
          </div>
        `:U`&nbsp;`}_entity_property(e,t){const i=this.hass.states[e];if(!i)return"";switch(t){case"-name":return i.attributes.friendly_name;case"-volume":return i.attributes.volume_level;case"-muted":return i.attributes.is_volume_muted;default:return i[t]}}_setFaderLevel(e,t){const i=ve(e),r=this.config&&this.config.faders?this.config.faders.find(t=>t.entity_id===e.entity_id):void 0,a=r&&"number"==typeof r.max?r.max:e.attributes.max||1,n=r&&"number"==typeof r.min?r.min:e.attributes.min||0;"media_player"===i?this.hass.callService("media_player","volume_set",{entity_id:e.entity_id,volume_level:t/100*(a-n)+n}):this.hass.callService(i,"set_value",{entity_id:e.entity_id,value:t/100*(a-n)+n})}_previewLevel(e,t){const i=this.shadowRoot.getElementById(e),r=this.faderColors[e];i&&r&&(i.className.includes("fader-inactive")?i.style.background="":i.style.background=`linear-gradient(to right, ${r.active_color} ${t}%, ${r.track_color} ${t}%)`)}_toggleActive(e){const t=e&&e.currentTarget?e.currentTarget:e&&e.target&&e.target.closest?e.target.closest(".active-button"):e&&e.target,i=t?t.dataset:{},{entity:r}=i||{};if(!r)return;const a=pe(r),n={entity_id:r};let o="";if("media_player"===a){const e=!!this._entity_property(r,"-muted");n.is_volume_muted=!e,o="volume_mute"}else o="toggle";this.hass.callService(a,o,n),this.update_track_color()}async update_track_color(){const e=this.shadowRoot.querySelectorAll('.fader input[type="range"]');await Promise.all(Array.from(e).map(e=>e.updateComplete)),Array.from(e).map(e=>this._previewLevel(e.id,e.value))}async firstUpdated(){await this.update_track_color(),this._setupFaderWidthObserver()}async updated(){await this.update_track_color(),this._recomputeFaderWidth()}disconnectedCallback(){super.disconnectedCallback(),this._faderWidthObserver&&(this._faderWidthObserver.disconnect(),this._faderWidthObserver=null)}_setupFaderWidthObserver(){const e=this.shadowRoot.querySelector(".fader-holder");e&&(this._faderWidthObserver=new ResizeObserver(()=>this._recomputeFaderWidth()),this._faderWidthObserver.observe(e),this._recomputeFaderWidth())}_recomputeFaderWidth(){const e=be(this.config);if(e.faderWidth||"horizontal"===e.orientation)return;const t=this.shadowRoot.querySelector(".fader-holder");if(!t)return;const i=this.config.faders&&this.config.faders.length?this.config.faders.length:1,r=20+("physical"===e.faderTheme&&e.showDbScale?26:0),a=(t.clientWidth-8*(i-1))/i,n=Math.floor(a-r),o=Math.max(44,Math.min(150,n));this.style.setProperty("--fader-width",o+"px")}setConfig(e){if(!e||!e.faders||!Array.isArray(e.faders))throw new Error('Invalid configuration: "faders" must be an array.');this.config=e}getCardSize(){const e=be(this.config),t=this.config.faders&&this.config.faders.length?this.config.faders.length:1;if("horizontal"===e.orientation)return t+1;const i=parseInt((e.faderHeight||"").toString().replace("px",""),10);return(Number.isFinite(i)&&i>0?Math.ceil(i/50):5)+1}getGridOptions(){const e=be(this.config);if(!e.faderWidth&&!e.faderHeight)return{columns:"full",rows:"auto",min_columns:6};const t=this.config.faders&&this.config.faders.length?this.config.faders.length:1,i="horizontal"===e.orientation,r=i?e.faderHeight||"150":e.faderWidth||"150";let a=parseInt(r.toString().replace("px",""),10);Number.isFinite(a)||(a=150),i&&(a+=80);const n=t*(a+20);return{columns:Math.max(2,Math.min(48,Math.ceil(n/30))),min_columns:1,max_columns:48}}});
