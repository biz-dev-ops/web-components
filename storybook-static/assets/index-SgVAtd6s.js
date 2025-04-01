import{i as c,r as y,x as a}from"./lit-element-CPu3RyXn.js";import{n as p,t as d}from"./property-I-G7jaNi.js";import{r as I}from"./state-KOUaZEt-.js";import{r as S}from"./reset.css-DipPbE3d.js";import{o as O}from"./unsafe-html-CmltxUo3.js";import{t as l,p as P}from"./index-GSxLrrin.js";import{e as L}from"./base-CShCMygk.js";import{o as M}from"./if-defined-CS3UzSui.js";import{f as N}from"./index-B-WZp9xr.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function g(t){return(e,i)=>{const o=typeof e=="function"?e:e[i];Object.assign(o,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function V(t,e){return(i,o,r)=>{const s=n=>{var _;return((_=n.renderRoot)==null?void 0:_.querySelector(t))??null};return L(i,o,{get(){return s(this)}})}}const U=c`
    :host {
      --_item-line-color: var(--_model-viewer-color-base);

      --button-border-color: var(--_item-line-color);
      --button-hover-color: var(--_model-viewer-color-a10);
      --button-font-size: var(--font-size-sm);
      --button-inline-size: 100%;
    }

    :where(h1, h2, h3, h4, p, ul, ol, dl):first-child {
      margin-block-start: 0;
    }

    :where(h1, h2, h3, h4, p, ul, ol, dl):last-child {
      margin-block-end: 0;
    }

    h3 {
      column-gap: var(--space-xs);
      display: flex;
      font-size: var(--font-size-sm);
    }

    ul, ol {
      margin: 0;
    }
    
    .txt--property {
      font-weight: 600;
      text-align: start
    }

    .txt--required {
      color: var(--color-error);
    }
`;var Y=Object.defineProperty,C=(t,e,i,o)=>{for(var r=void 0,s=t.length-1,n;s>=0;s--)(n=t[s])&&(r=n(e,i,r)||r);return r&&Y(e,i,r),r};class u extends y{_handleItemSelection(){this.dispatchEvent(new CustomEvent("itemSelected",{detail:{property:this.property,item:this.item}}))}static get styles(){return[U]}}C([p({type:Object})],u.prototype,"item");C([p({type:String})],u.prototype,"property");C([p({type:String})],u.prototype,"title");C([p({type:Boolean})],u.prototype,"required");const H=c`
    :host {
        --_button-font-family: var(--button-font-family, var(--font-family-base));
        --_button-font-size: var(--button-font-size, var(--font-size-base));
        --_button-line-height: var(--button-line-height, var(--line-height-base));
        --button-hover-color: var(--color-brand-a10);
        --_button-padding-block: var(--button-padding-block, var(--button-padding, var(--space-sm)));
        --_button-padding-inline: var(--button-padding-inline, var(--button-padding, var(--space-sm)));
        --_button-inline-size: var(--button-inline-size, auto);
        --_button-border-color: var(--button-border-color, transparent);

        inline-size: var(--_button-inline-size);
    }

    button {
        align-items: center;
        background-color: transparent;
        border: var(--line-base) solid var(--_button-border-color);
        border-radius: var(--radius-half);
        column-gap: var(--space-xs);
        color: var(--button-text-color);
        cursor: pointer;
        display: flex;
        font-family: var(--_button-font-family);
        font-size: var(--_button-font-size);
        line-height: var(--_button-line-height);
        inline-size: var(--_button-inline-size);
        min-block-size: var(--space-lg);
        padding: var(--_button-padding-block) var(--_button-padding-inline);
        text-align: start;
        text-decoration: none;
        transition: all var(--duration-base);
    }

    button[disabled] {
        cursor: initial;
        pointer-event: none;
    }

    button span {
        flex: 1;
    }

    :is(button:not([disabled])):is(:active, :hover, :focus-visible) {
        background-color: var(--button-hover-color);
        color: var(--button-text-color-active);
    }

    /* Directional arrows */
    :host([direction="up"]) button::after,
    :host([direction="right"]) button::after,
    :host([direction="down"]) button::after,
    :host([direction="left"]) button::before {
      content: '';
      display: inline-block;
      border-color: currentColor;
      border-width:var(--line-thin) var(--line-thin) 0 0;
      border-style: solid;
      height: var(--space-xs);
      width: var(--space-xs);
      position: relative;
      top: calc(var(--space-xxs) / -2);
      justify-self: end;
      inset-block-start: .0625em;
      transition: transform var(--duration-base);
      transform-origin: 50% 50%;
      justify-self: flex-end;
    }
    
    :host([direction="up"]) button::after {
        inset-block-end: -.25em;
        transform: rotate(315deg);
    }
    
    :host([direction="right"]) button::after {
        transform: rotate(45deg);
        inset-inline-start: -.25em;
    }
    
    :host([direction="down"]) button::after {
        inset-block-start: -.25em;
        transform: rotate(135deg);
    }
    
    :host([direction="left"]) button::before {
        inset-inline-end: -.25em;
        transform: rotate(225deg);
    }
`;var W=Object.defineProperty,X=Object.getOwnPropertyDescriptor,w=(t,e,i,o)=>{for(var r=o>1?void 0:o?X(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(r=(o?n(e,i,r):n(r))||r);return o&&r&&W(e,i,r),r};let v=class extends y{constructor(){super(...arguments),this.type="button",this.disabled=!1}render(){return a`
            <button type="${this.type}" .disabled='${this.disabled}' @click="${this._onClick}">
                <span class="content">
                    <slot></slot>
                </span>
            </button>
        `}_onClick(){this.dispatchEvent(new CustomEvent("clicked"))}static get styles(){return[S,H]}};w([p({type:String})],v.prototype,"type",2);w([p({type:String})],v.prototype,"direction",2);w([p({type:Boolean})],v.prototype,"disabled",2);w([g({passive:!0})],v.prototype,"_onClick",1);v=w([d("bdo-button")],v);const F=c`
    button {
        cursor: pointer;
    }

    :is(button:not([disabled])):is(:active, :hover, :focus-visible) +  [popover] {
      border-color: var(--button-background-active)
    }

    .popover-control--info {
      background-color: var(--surface-main);
      align-self: center;
      border: var(--line-base) solid var(--button-background-base);
      border-radius: var(--radius-circle);
      block-size: var(--font-size-base);
      cursor: pointer;
      font-size: var(--font-size-xs);
      display: flex;
      align-items: center;
      justify-content: center;
      aspect-ratio: 1;
      text-decoration: none;
    }

    .popover-control--info abbr[title] {
      border: 0;
      line-height: 1em;
      text-decoration: none;
      font-weight: 600;
    }

    [popover] {
      box-shadow: var(--drop-shadow-level2);
      border: 0;
      border-radius: var(--radius-base);
      inset: unset;
      color: var(--color-text);
      font-family: var(--font-family-base);
      font-size: var(--font-size-sm);
      font-weight: initial;
      line-height: var(--line-height-base);
      margin-top: var(--space-xs);
      padding: var(--space-sm);
      position: absolute;
      pointer-events: none;
      transition: var(--duration-base);
    }

    [popover]::backdrop {
        pointer-events: none;
        background-color: rgba(0 0 0 / 5%);
        transition: var(--duration-base);
    }
`;var G=Object.defineProperty,K=Object.getOwnPropertyDescriptor,j=(t,e,i,o)=>{for(var r=o>1?void 0:o?K(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(r=(o?n(e,i,r):n(r))||r);return o&&r&&G(e,i,r),r};let h=class extends y{render(){return a`
            <button popovertarget="popover-target" class="popover-control popover-control--info" @click=${this._onClick.bind(this)}>
                <abbr title="info">i</abbr>
            </button>
            <div id="popover-target" popover>
                <slot></slot>
            </div>
        `}firstUpdated(){z()&&(this._popoverElement.popover="auto",this._buttonElement.popoverTarget=this._popoverElement.id,this._buttonElement.popoverTargetAction="toggle",this._buttonElement.setAttribute("aria-haspopup","true"),this._buttonElement.setAttribute("aria-expanded","false"))}_onClick(t){t.stopPropagation(),this._buttonElement.getAttribute("aria-expanded")==="true"?(this._buttonElement.setAttribute("aria-expanded","false"),z()||(this._popoverElement.style.display="none")):(this._buttonElement.setAttribute("aria-expanded","true"),z()||(this._popoverElement.style.display="block",this._popoverElement.style.position="fixed",this._popoverElement.style.zIndex="999"),Q(this._buttonElement,this._popoverElement,this.parentElement))}static get styles(){return[S,F]}};j([V("[popover]")],h.prototype,"_popoverElement",2);j([V("[popovertarget]")],h.prototype,"_buttonElement",2);j([g({passive:!0})],h.prototype,"_onClick",1);h=j([d("bdo-popover")],h);const Q=(t,e,i)=>{if(!parent)return;const o=t.getBoundingClientRect(),r=i==null?void 0:i.getBoundingClientRect(),s=document.documentElement.scrollTop||document.body.scrollTop;r&&(e.style.left=`${r.left}px`,e.style.top=`${o.bottom+s}px`,e.style.width=`${r.width}px`)},z=()=>HTMLElement.prototype.hasOwnProperty("popover");var T=Object.defineProperty,Z=Object.getOwnPropertyDescriptor,B=(t,e,i,o)=>{for(var r=o>1?void 0:o?Z(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(r=(o?n(e,i,r):n(r))||r);return o&&r&&T(e,i,r),r};let $=class extends u{render(){const t=l(this.item.items.title||"item");return a`
            <div class="item item--array">
                <h3>
                    <span class="txt--property">
                        ${l(this.title)} ${this.required?a`<span class="txt--required">*</span>`:""}
                    </span>
                    ${this.item.description?a`
                            <bdo-popover>
                                ${O(P(this.item.description.trim()))}
                            </bdo-popover>
                        `:null}
                </h3>

                <ul class="list--array">
                    ${[...Array(2).keys()].map((e,i)=>a`
                        <li>
                            <bdo-button direction="right" @clicked=${this._onClick} ?disabled="${i>0}">
                                <span class="txt--property">${t}</span>
                            </bdo-button>
                        </li>
                    `)}
                </ul>
            </div>
        `}_onClick(){this.dispatchEvent(new CustomEvent("itemSelected",{detail:{property:this.property,item:this.item}})),this.dispatchEvent(new CustomEvent("itemSelected",{detail:{property:"item",item:this.item.items}}))}static get styles(){return[...super.styles,c`

            .item--array {
                border-radius: var(--radius-half);
                border: var(--line-thin) solid var(--_item-line-color);
                padding: var(--space-sm);
                padding-block-end: 0;
                margin-block-end: calc(var(--space-xs) * -1);
                mask-image: linear-gradient(to top, transparent var(--space-sm), black var(--space-xl));
                -webkit-mask-image: linear-gradient(to top, transparent var(--space-sm), black var(--space-xl));
            }

            .list--array {
                list-style: none;
                padding-inline-start: 0;
                display: flex;
                flex-direction: column;
                row-gap: var(--space-sm);
            }

            .list--array li {
                position: relative;
            }

            .list--array li::before,
            .list--array li::after {
            content: '';
                position: absolute;
                inset-inline-start: calc(var(--space-sm) * -1);
                inset-block-start: calc(var(--space-sm) + var(--space-xxs));
            }

            .list--array li::before {
                background-color: var(--_item-line-color);
                block-size: var(--line-thin);
                inline-size: var(--space-sm);
            }

            .list--array li::after {
                aspect-ratio: 1;
                background-color: var(--surface-main);
                block-size: .625rem;
                border-radius: var(--radius-circle);
                border: var(--line-thin) solid var(--_item-line-color);
                transform: translateX(-.4375rem) translateY(-.25rem);
            }

            .list--array li:not(:first-child) {
                pointer-events: none;
            }
        `]}static async build(t,e,i,o){return t.item.type!="array"&&!t.item.items?a``:a`
            <model-viewer-item-array
                aria-label="model-viewer-item"
                property=${t.property}
                title=${l(t.title)}
                .item=${t.item}
                .required=${t.required}
                @itemSelected=${i}
            ></model-viewer-item-array>
        `}};B([g({passive:!0})],$.prototype,"_onClick",1);$=B([d("model-viewer-item-array")],$);var tt=Object.getOwnPropertyDescriptor,et=(t,e,i,o)=>{for(var r=o>1?void 0:o?tt(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(r=n(r)||r);return r};let k=class extends u{render(){return a`
            <div class="item item--object">
                <bdo-button type="button" direction="right" @clicked=${this._handleItemSelection}>
                    <span class="txt--property">
                        ${l(this.title)}
                        ${this.required?a`<span class="txt--required">*</span>`:""}
                    </span>
                </bdo-button>
            </div>
        `}static async build(t,e,i,o){return rt(t,o)?a`
            <model-viewer-item-object
                aria-label="model-viewer-item"
                property=${t.property}
                title=${l(t.title)}
                .item=${t.item}
                .required=${t.required}
                @itemSelected=${i}
            ></model-viewer-item-object>
        `:a``}};k=et([d("model-viewer-item-object")],k);const rt=(t,e)=>e&&(t.item.type==="object"||t.item.properties);var it=Object.getOwnPropertyDescriptor,ot=(t,e,i,o)=>{for(var r=o>1?void 0:o?it(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(r=n(r)||r);return r};let E=class extends u{render(){return a`
      <div class="item item--object">
        <h2>
          <span class="txt--property">
            ${l(this.title)}
            ${this.required?a`<span class="txt--required">*</span>`:""}
          </span>
        </h2>
        ${this.item.description?a`${O(P(this.item.description))}`:null}
        <div class="items" slot="items">
          <slot></slot>
        </div>
      </div>
    `}static get styles(){return[...super.styles,c`
        .items {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }

        p {
          white-space: pre-wrap;
        }
      `]}static async build(t,e,i,o){if(!st(t,o))return a``;const r=[];for(const s in t.item.properties){const n=await e.build(t.item.properties[s],s,t.isChildRequired(s));r.push(a`${await R.build(n,e,i,!0)}`)}return a`
      <model-viewer-item-object-properties
        property=${t.property}
        title=${l(t.title)}
        .item=${t.item}
        .required=${t.required}
      >
        ${r}
      </model-viewer-item-object-properties>
    `}};E=ot([d("model-viewer-item-object-properties")],E);const st=(t,e)=>!e&&(t.item.type==="object"||t.item.properties);var nt=Object.defineProperty,at=Object.getOwnPropertyDescriptor,D=(t,e,i,o)=>{for(var r=o>1?void 0:o?at(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(r=(o?n(e,i,r):n(r))||r);return o&&r&&nt(e,i,r),r};let f=class extends u{render(){return a`
            <div class="item item--one-of">
                <h2>
                    <span class="txt--property">
                        ${l(this.title)}
                        ${this.required?a`<span class="txt--required">*</span>`:""}
                    </span>
                </h2>

                <ul class="list--one-of">
                    ${this.items.map(t=>t.item).map(t=>a`
                        <li>
                            <bdo-button direction="right" @clicked="${()=>{this._onClick(t)}}">
                                <span class="button-label">
                                <span class="txt--property">${l(t.title)}</span>
                                ${t.description?a`
                                    <bdo-popover>
                                        ${O(P(t.description.trim()))}
                                    </bdo-popover>
                                `:null}
                                </span>
                            </bdo-button>
                        </li>
                    `)}
                </ul>
            </div>
        `}_onClick(t){this.dispatchEvent(new CustomEvent("itemSelected",{detail:{property:this.property,item:t}}))}static get styles(){return[...super.styles,c`
            .list--one-of {
                list-style: none;
                padding-inline-start: 0;
                display: flex;
                flex-direction: column;
                row-gap: var(--space-sm);
            }

            .list--one-of {
                row-gap: var(--space-xxs);
            }

            .list--one-of li {
                display: flex;
                flex-direction: column;
                position: relative;
                row-gap: var(--space-xxs);
            }

            .list--one-of li:not(:last-child)::after {
                content: 'OR';
                font-size: var(--font-size-xs);
                text-align: center;
                display: block;
                color: var(--color-black-a40);
                font-weight: 600;
            }

            .button-label {
                display: flex;
                column-gap: var(--space-xs);
            }
        `]}static async build(t,e,i){if(!t.item.oneOf)return a``;const o=await t.item.oneOf.map(async s=>e.build(s)),r=await Promise.all(o);return a`
            <model-viewer-item-one-of
                aria-label="model-viewer-item"
                property=${t.property}
                title=${l(t.title)}
                .items=${r}
                .required=${t.required}
                @itemSelected=${i}
            ></model-viewer-item-one-of>
      `}};D([p({type:Array})],f.prototype,"items",2);D([g({passive:!0})],f.prototype,"_onClick",1);f=D([d("model-viewer-item-one-of")],f);var lt=Object.getOwnPropertyDescriptor,pt=(t,e,i,o)=>{for(var r=o>1?void 0:o?lt(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(r=n(r)||r);return r};let q=class extends u{render(){const t=[];for(const e in this.item)e!=="description"&&e!=="title"&&e!=="type"&&e!=="format"&&t.push(a`
                    <dt>${e}</dt>
                    ${Array.isArray(this.item[e])?a`
                            <ul>
                                ${this.item[e].map(i=>a`<li>${i}</li>`)}
                            </ul>
                        `:a`<dd>${this.item[e]}</dd>`}
              `);return a`
            <div class="item item--value">
                <h3>
                    <span class="txt--property">
                        ${l(this.title)}
                        ${this.required?a`<span class="txt--required">*</span>`:""}
                    </span>
                    ${this.item.description?a`
                            <bdo-popover>
                                ${O(P(this.item.description.trim()))}
                            </bdo-popover>
                        `:null}
                    <span class="icon--type">
                        ${this.item.type}${this.item.format?a`: <em>${this.item.format}</em>`:""}
                    </span>
                </h3>

                ${t}
            </div>
        `}static get styles(){return[...super.styles,c`
             dt {
                color: rgba(0 0 0 / 50%);
                font-weight: 600;
            }

            dd {
                margin-inline-start: 0;
                white-space: pre-wrap;
            }

            dd + dt {
                margin-block-start: 1em;
            }

            .item--value {
                background-color: var(--color-black-a05);
                border-radius: var(--radius-half);
                padding: var(--space-sm);
            }

            .icon--type {
                margin-inline-start: auto;
                font-size: var(--font-size-xs);
                background-color: var(--surface-main);
                border-radius: var(--radius-pill);
                align-self: center;
                padding: var(--space-xxs) var(--space-xs);
            }

            .icon--type em {
                font-style: normal;
                font-weight: 400;
            }
        `]}static async build(t,e,i){return t.item.type!="string"&&t.item.type!="number"&&t.item.type!="integer"&&t.item.type!="boolean"?a``:a`
            <model-viewer-item-value
              aria-label="model-viewer-item"
              property=${t.property}
              title=${l(t.title)}
              .item=${t.item}
              .required=${t.required}
            ></model-viewer-item-value>
          `}};q=pt([d("model-viewer-item-value")],q);const ct=[$.build,k.build,E.build,f.build,q.build];class R{static async build(e,i,o,r){const s=ct.map(async _=>await _(e,i,o,r));return await Promise.all(s)}}const dt=c`
  :host {
    --_item-line-color: var(--_model-viewer-color-base);

    --button-border-color: var(--_item-line-color);
    --button-hover-color: var(--_model-viewer-color-a10);
    --button-font-size: var(--font-size-sm);
    --button-inline-size: 100%;
  }

  .list--path {
    --button-padding: var(--space-xs);

    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
    list-style: none;
    margin: 0;
    padding-inline-start: 0;
  }

  .list--path li {
    display: flex;
    column-gap: var(--space-xs);
    align-items: center;
  }

  .list--path li:not(:last-child, .oneof, .no-title)::after {
    content: ' /';
  }

  .list--path li.oneof:not(.no-title) .txt--property::after {
    content: ':';
  }

  .list--path li.oneof + .object button {
    margin-inline-start: calc(var(--space-xxs) * -1);
  }

  .list--path button {
    padding: var(--space-xs);
  }

  .list--path li > span {
    padding-block: calc(var(--line-base) + var(--button-padding));
  }
`;class ut{constructor(e,i,o,r){this.item=e,this.type=i,this.property=o||"",this.title=e.title||this.property,this.required=r||!1}isChildRequired(e){var i;return(i=this.item.required)==null?void 0:i.includes(e)}}var J=(t=>(t.Object="object",t.String="string",t.Number="number",t.Integer="integer",t.Boolean="boolean",t.Array="array",t.OneOf="oneOf",t.Unknown="unknown",t))(J||{});class mt{constructor(e){this.base=e}async build(e,i,o){const r=await bt(e);return e=await vt(e,this.base),new ut(e,r,i,o)}}async function bt(t){return t.type=="object"||t.properties?"object":t.type=="string"?"string":t.type=="number"?"number":t.type=="integer"?"integer":t.type=="boolean"?"boolean":t.type=="array"||t.items?"array":t.oneOf?"oneOf":"unknown"}async function vt(t,e){if(!Object.keys(t).some(s=>s==="$ref"))return t;const i=t.$ref;if(!i.startsWith("#/"))throw new Error(`Only internal refererences are expected here but recieved: ${i}`);const o=i.substring(2).split("/").reverse();let r=e;for(;o.length>0;){const s=o.pop();if(!Object.keys(r).some(n=>n===s))throw new Error(`Property not found in ModelItem: ${s}`);r=r[s]}return r}var ht=Object.defineProperty,ft=Object.getOwnPropertyDescriptor,A=(t,e,i,o)=>{for(var r=o>1?void 0:o?ft(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(r=(o?n(e,i,r):n(r))||r);return o&&r&&ht(e,i,r),r};let x=class extends y{constructor(){super(...arguments),this.path=[]}render(){return a`
      <nav>
        <ol class="list--path">
          ${this.path.map((t,e)=>this._renderPathItem(t,e))}
        </ol>
      </nav>
    `}_renderPathItem(t,e){var s;const i=l(t.title||"/"),o=a`<span class="txt--property">${i}</span>`,r=this._isLast(e);return a`
          <li class="${M(t.type)} ${M(((s=t.title)==null?void 0:s.trim().length)===0?"no-title":null)}">
            ${t.type===J.Array||r?o:a`
                <bdo-button class="button--path" .disabled="${r}" @clicked="${()=>{this._onClick(e)}}">
                  ${o}
                </bdo-button>
            `}
          </li>
        `}_isLast(t){return t===this.path.length-1}_onClick(t){this.dispatchEvent(new CustomEvent("pathChanged",{detail:{index:t}}))}static get styles(){return[dt]}};A([p({type:Array})],x.prototype,"path",2);A([g({passive:!0})],x.prototype,"_onClick",1);x=A([d("model-viewer-path")],x);var yt=Object.defineProperty,gt=Object.getOwnPropertyDescriptor,b=(t,e,i,o)=>{for(var r=o>1?void 0:o?gt(e,i):e,s=t.length-1,n;s>=0;s--)(n=t[s])&&(r=(o?n(e,i,r):n(r))||r);return o&&r&&yt(e,i,r),r};const wt="model-viewer";let m=class extends y{constructor(){super(),this.path=[],window.addEventListener("popstate",this.onPopState.bind(this))}render(){return this.error?a`<div class="error">${this.error.message}</div>`:this.path.length===0?a``:a`
      <model-viewer-path
        .path=${this.path}
        @pathChanged=${this.onPathChanged}
      ></model-viewer-path>
      <main>
       ${this.item}
      </main>
    `}async update(t){if(t.has("src"))try{this.model=await N(this.src)}catch(e){this.error=e}t.has("modelJson")&&(this.model=JSON.parse(this.modelJson)),t.has("model")&&(this.error=null,this.builder=new mt(this.model),this.path=[],this.model.title=this.model.title||this.name,await this.addPath("",this.model)),super.update(t)}updated(){var t,e;(e=(t=this.shadowRoot)==null?void 0:t.querySelector("model-viewer-path"))==null||e.scrollIntoView()}async setPath(t){this.path=t,history.pushState(this.path.length,""),this.item=await R.build(this.path.at(-1),this.builder,this.onItemSelected.bind(this),!1)}async addPath(t,e){if(e===void 0)return;const i=this.path.at(-1),o=await this.builder.build(e,t,i==null?void 0:i.isChildRequired(t));await this.setPath([...this.path,o])}async onItemSelected(t){await this.addPath(t.detail.property,t.detail.item)}async onPathChanged(t){await this.setPath(this.path.slice(0,t.detail.index+1))}async onPopState(t){t.state&&await this.setPath(this.path.slice(0,-1))}static get styles(){return[S,c`
        :host {
          --_model-viewer-color-base: var(--model-viewer-color-base, var(--color-brand-base));
          --_model-viewer-color-a10: var(--model-viewer-color-a10, var(--color-brand-a10));
          --_model-viewer-color-a40: var(--model-viewer-color-a40, var(--color-brand-a40));

          border: var(--line-base) solid var(--_model-viewer-color-a40);
          padding: var(--space-md);
          display: block;
          border-radius: var(--radius-base);
          font-size: var(--font-size-sm);
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
      `]}};b([p()],m.prototype,"name",2);b([p({type:Object})],m.prototype,"model",2);b([I()],m.prototype,"error",2);b([p({attribute:"src"})],m.prototype,"src",2);b([p({attribute:"data-json"})],m.prototype,"modelJson",2);b([I()],m.prototype,"item",2);m=b([d(wt)],m);export{g as t};
