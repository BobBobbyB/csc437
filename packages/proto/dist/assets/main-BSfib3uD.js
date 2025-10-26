/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const N=globalThis,z=N.ShadowRoot&&(N.ShadyCSS===void 0||N.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,j=Symbol(),V=new WeakMap;let Y=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==j)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(z&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=V.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&V.set(e,t))}return t}toString(){return this.cssText}};const ot=i=>new Y(typeof i=="string"?i:i+"",void 0,j),D=(i,...t)=>{const e=i.length===1?i[0]:t.reduce(((s,r,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[o+1]),i[0]);return new Y(e,i,j)},nt=(i,t)=>{if(z)i.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(const e of t){const s=document.createElement("style"),r=N.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}},W=z?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return ot(e)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:at,defineProperty:lt,getOwnPropertyDescriptor:ht,getOwnPropertyNames:ct,getOwnPropertySymbols:dt,getPrototypeOf:pt}=Object,H=globalThis,q=H.trustedTypes,ut=q?q.emptyScript:"",$t=H.reactiveElementPolyfillSupport,w=(i,t)=>i,R={toAttribute(i,t){switch(t){case Boolean:i=i?ut:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},tt=(i,t)=>!at(i,t),G={attribute:!0,type:String,converter:R,reflect:!1,useDefault:!1,hasChanged:tt};Symbol.metadata??=Symbol("metadata"),H.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=G){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),r=this.getPropertyDescriptor(t,s,e);r!==void 0&&lt(this.prototype,t,r)}}static getPropertyDescriptor(t,e,s){const{get:r,set:o}=ht(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:r,set(n){const h=r?.call(this);o?.call(this,n),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??G}static _$Ei(){if(this.hasOwnProperty(w("elementProperties")))return;const t=pt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(w("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(w("properties"))){const e=this.properties,s=[...ct(e),...dt(e)];for(const r of s)this.createProperty(r,e[r])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,r]of e)this.elementProperties.set(s,r)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const r=this._$Eu(e,s);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const r of s)e.unshift(W(r))}else t!==void 0&&e.push(W(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return nt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,s);if(r!==void 0&&s.reflect===!0){const o=(s.converter?.toAttribute!==void 0?s.converter:R).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(t,e){const s=this.constructor,r=s._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const o=s.getPropertyOptions(r),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:R;this._$Em=r;const h=n.fromAttribute(e,o.type);this[r]=h??this._$Ej?.get(r)??h,this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){const r=this.constructor,o=this[t];if(s??=r.getPropertyOptions(t),!((s.hasChanged??tt)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:r,wrapped:o},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[r,o]of s){const{wrapped:n}=o,h=this[r];n!==!0||this._$AL.has(r)||h===void 0||this.C(r,void 0,o,h)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((s=>s.hostUpdate?.())),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach((e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[w("elementProperties")]=new Map,A[w("finalized")]=new Map,$t?.({ReactiveElement:A}),(H.reactiveElementVersions??=[]).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const L=globalThis,O=L.trustedTypes,K=O?O.createPolicy("lit-html",{createHTML:i=>i}):void 0,et="$lit$",m=`lit$${Math.random().toFixed(9).slice(2)}$`,st="?"+m,mt=`<${st}>`,_=document,x=()=>_.createComment(""),C=i=>i===null||typeof i!="object"&&typeof i!="function",B=Array.isArray,ft=i=>B(i)||typeof i?.[Symbol.iterator]=="function",k=`[ 	
\f\r]`,E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,J=/-->/g,Z=/>/g,f=RegExp(`>|${k}(?:([^\\s"'>=/]+)(${k}*=${k}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),F=/'/g,Q=/"/g,rt=/^(?:script|style|textarea|title)$/i,yt=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),g=yt(1),b=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),X=new WeakMap,y=_.createTreeWalker(_,129);function it(i,t){if(!B(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return K!==void 0?K.createHTML(t):t}const gt=(i,t)=>{const e=i.length-1,s=[];let r,o=t===2?"<svg>":t===3?"<math>":"",n=E;for(let h=0;h<e;h++){const a=i[h];let c,p,l=-1,u=0;for(;u<a.length&&(n.lastIndex=u,p=n.exec(a),p!==null);)u=n.lastIndex,n===E?p[1]==="!--"?n=J:p[1]!==void 0?n=Z:p[2]!==void 0?(rt.test(p[2])&&(r=RegExp("</"+p[2],"g")),n=f):p[3]!==void 0&&(n=f):n===f?p[0]===">"?(n=r??E,l=-1):p[1]===void 0?l=-2:(l=n.lastIndex-p[2].length,c=p[1],n=p[3]===void 0?f:p[3]==='"'?Q:F):n===Q||n===F?n=f:n===J||n===Z?n=E:(n=f,r=void 0);const $=n===f&&i[h+1].startsWith("/>")?" ":"";o+=n===E?a+mt:l>=0?(s.push(c),a.slice(0,l)+et+a.slice(l)+m+$):a+m+(l===-2?h:$)}return[it(i,o+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class P{constructor({strings:t,_$litType$:e},s){let r;this.parts=[];let o=0,n=0;const h=t.length-1,a=this.parts,[c,p]=gt(t,e);if(this.el=P.createElement(c,s),y.currentNode=this.el.content,e===2||e===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(r=y.nextNode())!==null&&a.length<h;){if(r.nodeType===1){if(r.hasAttributes())for(const l of r.getAttributeNames())if(l.endsWith(et)){const u=p[n++],$=r.getAttribute(l).split(m),T=/([.?@])?(.*)/.exec(u);a.push({type:1,index:o,name:T[2],strings:$,ctor:T[1]==="."?_t:T[1]==="?"?At:T[1]==="@"?bt:M}),r.removeAttribute(l)}else l.startsWith(m)&&(a.push({type:6,index:o}),r.removeAttribute(l));if(rt.test(r.tagName)){const l=r.textContent.split(m),u=l.length-1;if(u>0){r.textContent=O?O.emptyScript:"";for(let $=0;$<u;$++)r.append(l[$],x()),y.nextNode(),a.push({type:2,index:++o});r.append(l[u],x())}}}else if(r.nodeType===8)if(r.data===st)a.push({type:2,index:o});else{let l=-1;for(;(l=r.data.indexOf(m,l+1))!==-1;)a.push({type:7,index:o}),l+=m.length-1}o++}}static createElement(t,e){const s=_.createElement("template");return s.innerHTML=t,s}}function S(i,t,e=i,s){if(t===b)return t;let r=s!==void 0?e._$Co?.[s]:e._$Cl;const o=C(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),o===void 0?r=void 0:(r=new o(i),r._$AT(i,e,s)),s!==void 0?(e._$Co??=[])[s]=r:e._$Cl=r),r!==void 0&&(t=S(i,r._$AS(i,t.values),r,s)),t}class vt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,r=(t?.creationScope??_).importNode(e,!0);y.currentNode=r;let o=y.nextNode(),n=0,h=0,a=s[0];for(;a!==void 0;){if(n===a.index){let c;a.type===2?c=new U(o,o.nextSibling,this,t):a.type===1?c=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(c=new St(o,this,t)),this._$AV.push(c),a=s[++h]}n!==a?.index&&(o=y.nextNode(),n++)}return y.currentNode=_,r}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class U{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,r){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),C(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==b&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ft(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&C(this._$AH)?this._$AA.nextSibling.data=t:this.T(_.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=P.createElement(it(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(e);else{const o=new vt(r,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(t){let e=X.get(t.strings);return e===void 0&&X.set(t.strings,e=new P(t)),e}k(t){B(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,r=0;for(const o of t)r===e.length?e.push(s=new U(this.O(x()),this.O(x()),this,this.options)):s=e[r],s._$AI(o),r++;r<e.length&&(this._$AR(s&&s._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class M{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,r,o){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(t,e=this,s,r){const o=this.strings;let n=!1;if(o===void 0)t=S(this,t,e,0),n=!C(t)||t!==this._$AH&&t!==b,n&&(this._$AH=t);else{const h=t;let a,c;for(t=o[0],a=0;a<o.length-1;a++)c=S(this,h[s+a],e,a),c===b&&(c=this._$AH[a]),n||=!C(c)||c!==this._$AH[a],c===d?t=d:t!==d&&(t+=(c??"")+o[a+1]),this._$AH[a]=c}n&&!r&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class _t extends M{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}}class At extends M{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}}class bt extends M{constructor(t,e,s,r,o){super(t,e,s,r,o),this.type=5}_$AI(t,e=this){if((t=S(this,t,e,0)??d)===b)return;const s=this._$AH,r=t===d&&s!==d||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==d&&(s===d||r);r&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class St{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}}const Et=L.litHtmlPolyfillSupport;Et?.(P,U),(L.litHtmlVersions??=[]).push("3.3.1");const wt=(i,t,e)=>{const s=e?.renderBefore??t;let r=s._$litPart$;if(r===void 0){const o=e?.renderBefore??null;s._$litPart$=r=new U(t.insertBefore(x(),o),o,void 0,e??{})}return r._$AI(i),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const I=globalThis;class v extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=wt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return b}}v._$litElement$=!0,v.finalized=!0,I.litElementHydrateSupport?.({LitElement:v});const xt=I.litElementPolyfillSupport;xt?.({LitElement:v});(I.litElementVersions??=[]).push("4.2.1");class Ct extends v{static properties={name:{type:String},number:{type:String},position:{type:String},team:{type:String},ppg:{type:Number},rpg:{type:Number},apg:{type:Number},href:{type:String,reflect:!0}};name;number;position;team;ppg;rpg;apg;href;static styles=D`
    :host { display: block; }
    a { color: inherit; text-decoration: none; display: block; }
    .card {
      background-color: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: var(--spacing-md);
      transition: all .3s ease;
      cursor: pointer;
    }
    .card:hover {
      border-color: var(--primary);
      box-shadow: 0 0 30px hsla(25,95%,53%,.3);
    }
    .card-header { margin-bottom: var(--spacing-sm); }
    .card-title {
      font-size: 1.5rem;
      color: var(--foreground);
      margin-bottom: .25rem;
      font-family: var(--font-display);
    }
    .card-subtitle { color: var(--muted-foreground); font-size: .9rem; }
    .card-accent { color: var(--primary); margin-bottom: var(--spacing-sm); }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--spacing-sm);
      text-align: center;
    }
    .stat-value {
      font-family: var(--font-display);
      font-size: 1.5rem;
      color: var(--primary);
      display: block;
    }
    .stat-label {
      font-size: 0.75rem;
      color: var(--muted-foreground);
      text-transform: uppercase;
    }
  `;render(){const t=g`
      <article class="card">
        <header class="card-header">
          <h3 class="card-title">${this.name}</h3>
          <p class="card-subtitle">#${this.number} • ${this.position}</p>
        </header>
        <p class="card-accent">${this.team}</p>
        <div class="stats-grid">
          <div><span class="stat-value">${this.ppg}</span><span class="stat-label">PPG</span></div>
          <div><span class="stat-value">${this.rpg}</span><span class="stat-label">RPG</span></div>
          <div><span class="stat-value">${this.apg}</span><span class="stat-label">APG</span></div>
        </div>
      </article>
    `;return this.href?g`<a href="${this.href}">${t}</a>`:t}}customElements.define("player-card",Ct);class Pt extends v{static properties={href:{type:String,reflect:!0},name:{type:String},conference:{type:String},wins:{type:Number},losses:{type:Number},players:{type:String}};href;name;conference;wins;losses;players;static styles=D`
    :host { display: block; }
    a { color: inherit; text-decoration: none; display: block; }
    .card {
      background-color: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: var(--spacing-md);
      transition: all .3s ease;
    }
    .card:hover {
      border-color: var(--primary);
      box-shadow: 0 0 30px hsla(25,95%,53%,.3);
    }
    .card-header { margin-bottom: var(--spacing-sm); }
    .card-title {
      font-size: 1.5rem;
      color: var(--foreground);
      margin-bottom: .25rem;
      font-family: var(--font-display);
    }
    .card-subtitle { color: var(--muted-foreground); font-size: .9rem; }
    .stat-value {
      font-family: var(--font-display);
      font-size: 1.5rem;
      color: var(--primary);
      display: block;
    }
    .stat-label {
      font-size: 0.75rem;
      color: var(--muted-foreground);
      text-transform: uppercase;
    }
  `;render(){const t=g`
      <article class="card">
        <header class="card-header">
          <h3 class="card-title">${this.name}</h3>
          <p class="card-subtitle">${this.conference}</p>
        </header>
        <div style="margin-bottom: 1rem;">
          <div class="stat-value">${this.wins}-${this.losses}</div>
          <div class="stat-label">Season Record</div>
        </div>
        <div>
          <div style="font-size: 0.875rem; font-weight: 600; color: var(--muted-foreground); margin-bottom: 0.5rem;">
            Key Players:
          </div>
          <ul style="list-style: none; padding: 0;">
            ${(this.players??"").split(/[|,]/).map(e=>e.trim()).filter(Boolean).map(e=>g`<li style="font-size: 0.9rem;">${e}</li>`)}
          </ul>
        </div>
      </article>
    `;return this.href?g`<a href="${this.href}">${t}</a>`:t}}customElements.define("team-card",Pt);class Ut extends v{static properties={href:{type:String,reflect:!0},date:{type:String},homeTeam:{type:String},awayTeam:{type:String},homeScore:{type:Number},awayScore:{type:Number},status:{type:String}};href;date;homeTeam;awayTeam;homeScore;awayScore;status;static styles=D`
    :host { display: block; }
    a { color: inherit; text-decoration: none; display: block; }
    .card {
      background-color: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: var(--spacing-md);
      transition: all .3s ease;
      cursor: pointer;
    }
    .card:hover {
      border-color: var(--primary);
      box-shadow: 0 0 30px hsla(25,95%,53%,.3);
    }
    .card-header { margin-bottom: var(--spacing-sm); }
    .stat-value {
      font-family: var(--font-display);
      font-size: 1.875rem;
      color: var(--primary);
      display: block;
    }
  `;render(){const t=g`
      <article class="card">
        <header class="card-header">
          <div style="font-size: 0.875rem; color: var(--muted-foreground);">${this.date}</div>
        </header>

        <div style="display:flex; justify-content:space-between; margin-bottom:1rem;">
          <span style="font-family: var(--font-display); font-size: 1.125rem;">${this.awayTeam}</span>
          <span class="stat-value">${this.awayScore}</span>
        </div>

        <div style="display:flex; justify-content:space-between; margin-bottom:1rem;">
          <span style="font-family: var(--font-display); font-size: 1.125rem;">${this.homeTeam}</span>
          <span class="stat-value">${this.homeScore}</span>
        </div>

        <div style="text-align:center; padding-top:1rem; border-top:1px solid var(--border);">
          <span style="font-size: .875rem; color: var(--muted-foreground);">${this.status}</span>
        </div>
      </article>
    `;return this.href?g`<a href="${this.href}">${t}</a>`:t}}customElements.define("game-card",Ut);
