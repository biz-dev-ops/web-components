import{i as u,r as m,x as n}from"./lit-element-CPu3RyXn.js";import{o as $}from"./unsafe-html-CmltxUo3.js";import{n as l,t as h}from"./property-I-G7jaNi.js";import{r as v}from"./reset.css-DipPbE3d.js";import"./index-DEzdt580.js";import{e as w}from"./base-CShCMygk.js";import{t as C}from"./index-SgVAtd6s.js";import{t as f,p as O}from"./index-GSxLrrin.js";import{F as z,f as j}from"./index-B-WZp9xr.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function P(o){return(e,s)=>{const{slot:a}=o??{},t="slot"+(a?`[name=${a}]`:":not([name])");return w(e,s,{get(){var i;const r=(i=this.renderRoot)==null?void 0:i.querySelector(t);return(r==null?void 0:r.assignedNodes(o))??[]}})}}const T=u`
    :host {
        --expansion-panel-border-color: var(--use-case-color-500);
    }

    section {
        display: flex;
        flex-direction: column;
        gap: var(--space-xxs);
    }

    model-viewer {
        --model-viewer-color-a10: var(--use-case-color-200);
        --model-viewer-color-a40: var(--use-case-color-500);
        --model-viewer-color-base: var(--use-case-color-800);
    }

    header {
        --text-color-heading: var(--use-case-color-800);
        --text-color-base: var(--use-case-color-800);

        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--space-xxs);
        font-weight: bold;
    }

    header bdo-badge {
        --badge-color: var(--use-case-color-200);
        --badge-text-color: var(--use-case-color-800);
    }

    main {
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
        font-size: var(--font-size-sm);
    }

    [slot="summary"] {
        font-size: var(--font-size-sm);
    }

    .count {
        color: var(--color-black-a40);
    }

    p {
        margin: 0;
    }

    p:not(:last-child) {
        margin-block-end: var(--space-sm);
    }

    .cases {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
    }

    .case {
        font-size: var(--font-size-sm);
    }

    .case h2 {
        font-size: inherit;
        margin-block: 0;
    }
`,k=u`
    :host {
        --_badge-color: var(--badge-color, var(--color-brand-a10));
        --_badge-text-color: var(--badge-text-color, var(--text-color-base));
        --icon-color: var(--_badge-text-color);
        
        display: inline-block
    }

    .badge {
        align-items: center;
        background-color: var(--_badge-color);
        border-radius: var(--radius-pill);
        color: var(--_badge-text-color);
        display: flex;
        flex-direction: row;
        font-size: var(--font-size-xs);
        gap: var(--space-xxs);
        padding-block: calc(var(--space-xxs) / 2);
        padding-inline: var(--space-xs);
    }

    bdo-icon {
        font-size: var(--font-size-sm);
        height: 1.0rem;
    }
`;var B=Object.defineProperty,D=Object.getOwnPropertyDescriptor,g=(o,e,s,a)=>{for(var t=a>1?void 0:a?D(e,s):e,r=o.length-1,i;r>=0;r--)(i=o[r])&&(t=(a?i(e,s,t):i(t))||t);return a&&t&&B(e,s,t),t};let d=class extends m{render(){return n`
            <div class="badge ${this.type?`badge-${this.type}`:""}">
                ${this.icon?n`<bdo-icon icon="${this.icon}"></bdo-icon>`:""}
                <slot></slot>
            </div>
        `}static get styles(){return[v,k]}};g([l({type:String})],d.prototype,"type",2);g([l({type:String})],d.prototype,"icon",2);d=g([h("bdo-badge")],d);const S=u`
    /* Component */
    :host {
        --_expansion-panel-border-color: var(--expansion-panel-border-color, var(--color-brand-a40));

        display: block
    }

    details {
        border: var(--line-base) solid var(--_expansion-panel-border-color);
        display: block;
        border-radius: var(--radius-base);
    }
    details summary::-webkit-details-marker {
        display:none;
    }

    summary {
        border-radius: calc(var(--radius-base) - var(--space-xs));
        cursor: pointer;
        list-style: none;
        padding-inline-end: var(--space-lg);
        position: relative;
        padding: var(--space-sm);
        padding-inline-end: calc(var(--space-md) + var(--space-sm));
    }

    summary::after {
        border-color: var(--text-color-base);
        border-style: solid;
        border-width: var(--line-base) var(--line-base) 0 0;
        content: "";
        display: block;
        aspect-ratio: 1;
        block-size: var(--space-xs);
        inset-block-start: calc(50% - .25em);
        inset-inline-end: calc(.25em + var(--space-md));
        position: absolute;
        transform: rotate(135deg);
        transform-origin: 65% 35%;
        transition: var(--duration-base);
    }

    details[open] summary::after {
        transform: rotate(-45deg);
    }

    .panel {
        padding-inline: var(--space-sm);
        padding-block-end: var(--space-sm);
    }
`;var A=Object.defineProperty,V=Object.getOwnPropertyDescriptor,x=(o,e,s,a)=>{for(var t=a>1?void 0:a?V(e,s):e,r=o.length-1,i;r>=0;r--)(i=o[r])&&(t=(a?i(e,s,t):i(t))||t);return a&&t&&A(e,s,t),t};let p=class extends m{render(){return n`
            <details ?open="${this.open}">
                <summary><slot name="summary"></slot></summary>
                <div class="panel">
                    <slot></slot>
                </div>
            </details>
        `}static get styles(){return[v,S]}};x([l({type:Boolean})],p.prototype,"open",2);x([P({slot:"summary",flatten:!1})],p.prototype,"_summaryNodes",2);p=x([h("bdo-expansion-panel")],p);const N=u`
    /* Component */
    :host {
        --_truncate-lines: var(--truncate-lines, 1);
    }

    .truncate {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-sm);
    }
    
    .truncate__toggle {
        align-self: flex-end;
        appearance: none;
        color: currentcolor;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        text-decoration: underline;
        text-underline-offset: .25ex;
        padding: 0;
        border: 0;
        background: none;
        white-space: nowrap;
    }

    .truncate__toggle:disabled {
        visibility: hidden;
    }

    .truncate__toggle:hover {
        text-decoration: none;
    }
    
    .truncate--active {
        flex-direction: row;
    }

    .truncate--active .truncate__content {
        display: -webkit-box;
        -webkit-line-clamp: var(--_truncate-lines, 1);
        -webkit-box-orient: vertical;
        -moz-box-orient: vertical;
        overflow: hidden;
    }

    .truncate__active .truncate__toggle {
        align-self: flex-start;
    }
`;var R=Object.defineProperty,U=Object.getOwnPropertyDescriptor,b=(o,e,s,a)=>{for(var t=a>1?void 0:a?U(e,s):e,r=o.length-1,i;r>=0;r--)(i=o[r])&&(t=(a?i(e,s,t):i(t))||t);return a&&t&&R(e,s,t),t};let c=class extends m{constructor(){super(),this.open=!1,this.disabled=!1}render(){return n`
            <div class="truncate ${this.open&&!this.disabled?"":"truncate--active"}">
                <div class="truncate__content">
                    <slot></slot>
                </div>
                <button aria-expanded="${this.open}" @click="${this._onClick}" class="truncate__toggle" ?disabled="${this.disabled}">
                    ${this.open?"Toon minder":"Toon meer"}
                </button>
            </div>
        `}firstUpdated(){var e;const o=(e=this.shadowRoot)==null?void 0:e.querySelector(".truncate__content");o&&new ResizeObserver(s=>{this.open||this.disabled===q(s[0].target)&&(this.disabled=!this.disabled)}).observe(o)}_onClick(){this.open=!this.open}static get styles(){return[v,N]}};b([l({type:Boolean})],c.prototype,"open",2);b([l({type:Boolean})],c.prototype,"disabled",2);b([C({passive:!0})],c.prototype,"_onClick",1);c=b([h("bdo-truncate")],c);const q=o=>o.scrollHeight>o.clientHeight||o.scrollWidth>o.clientWidth;var E=Object.defineProperty,y=(o,e,s,a)=>{for(var t=void 0,r=o.length-1,i;r>=0;r--)(i=o[r])&&(t=i(e,s,t)||t);return t&&E(e,s,t),t};class _ extends m{render(){var e,s,a,t,r;return this.model instanceof z?n`<div class="error">${this.model.message}</div>`:n`
      <section>
          <header>
              <bdo-badge type=${(e=this.useCaseType)==null?void 0:e.type} icon=${(s=this.useCaseType)==null?void 0:s.icon}>${(a=this.useCaseType)==null?void 0:a.name}</bdo-badge>
              ${f((t=this.model)==null?void 0:t.name)}
          </header>

          <main>
              ${this.descriptionTemplate((r=this.model)==null?void 0:r.description)}
              ${this.renderMain(this.model)}
          </main>
      </section>
    `}descriptionTemplate(e){return e?n`
      <bdo-truncate aria-label="description">
          ${$(O(e.trim()))}
      </bdo-truncate>
    `:n``}modelViewerTemplate(e,s,a){return a?n`
      <bdo-expansion-panel aria-label="${e}">
          <div slot="summary">${s}</div>
          <model-viewer .model=${a}></model-viewer>
      </bdo-expansion-panel>
    `:n``}casesTemplate(e,s,a){return a?n`
      <bdo-expansion-panel aria-label="${e}">
          <div slot="summary">${f(s)} <span class="count">(${this.countItems(a)})</span></div>

          <div class="cases" role="list" aria-label="cases">
              ${Object.entries(a).map(([t,r])=>n`
                  <div class="case" role="listitem" aria-label="case">
                      <h2>${f((r==null?void 0:r.name)||t)}</h2>
                      ${this.descriptionTemplate(r==null?void 0:r.description)}
                      ${this.modelViewerTemplate("exception-parameters","Parameters",r==null?void 0:r.parameters)}
                  </div>
              `)}
          </div>
      </bdo-expansion-panel>
    `:n``}countItems(e){return e?e.properties?Object.keys(e.properties).length:Array.isArray(e)?e.length:Object.keys(e).length:0}async update(e){if(e.has("src"))try{this.model=await j(this.src)}catch(s){this.model=s}e.has("json")&&(this.model=JSON.parse(this.json)),super.update(e)}static get styles(){return[v,T]}}y([l({type:Object})],_.prototype,"model");y([l({attribute:"src"})],_.prototype,"src");y([l({attribute:"data-json"})],_.prototype,"json");export{_ as U};
