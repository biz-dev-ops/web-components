import{r as h,x as a,i as p}from"./lit-element-CPu3RyXn.js";import{n as c,t as l}from"./property-I-G7jaNi.js";import{r as T}from"./reset.css-DipPbE3d.js";import{o as S}from"./if-defined-CS3UzSui.js";import"./index-DEzdt580.js";import{F as Z,f as k}from"./index-B-WZp9xr.js";import"./index-GSxLrrin.js";import"./index-F8EjD1nr.js";import"./iframe-HMoP8yNR.js";import"./_commonjsHelpers-D6-XlEtG.js";import"./index-BAMY2Nnw.js";var I=Object.defineProperty,V=(t,r,i,s)=>{for(var e=void 0,o=t.length-1,n;o>=0;o--)(n=t[o])&&(e=n(r,i,e)||e);return e&&I(r,i,e),e};class m extends h{render(){return this.button.link?a`
                <a .href=${this.button.link}>
                    ${this.arrowBeforeTemplate()}
                    <span class="inner">
                        ${this.iconContainerTemplate()}
                        ${this.textTemplate()}
                    </span>
                    ${this.arrowAfterTemplate()}
                </a>
            `:a`
                <span>
                    ${this.arrowBeforeTemplate()}
                    <span class="inner">
                        ${this.iconContainerTemplate()}
                        ${this.textTemplate()}
                    </span>
                    ${this.arrowAfterTemplate()}
                </span>
            `}iconContainerTemplate(){return this.button.icon?a`
            <span class="icon">
                ${this.iconTemplate()}
            </span>
        `:a``}iconTemplate(){return a`<bdo-icon .icon="${this.button.icon}"></bdo-icon>`}textTemplate(){return a`<span>${this.button.title}</span>`}arrowBeforeTemplate(){return a``}arrowAfterTemplate(){return a``}static get styles(){return[T,p`
                :host > a, :host > span {
                    display: flex;
                    width: 100%;
                    font-size: var(--font-size-sm);
                    font-weight: 700;
                    transition: all 0.2s ease-in-out;
                    position: relative;
                }

                a {
                    text-decoration: underline;
                }

                a:hover {
                    text-decoration: none;
                }

                a .inner, span .inner {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: var(--space-xs);
                    line-height: 140%;
                }

                a bdo-icon, span bdo-icon {
                    flex: none;
                    width: 1.5rem;
                    height: 1.5rem;
                    margin-top: -0.5rem; /* So text determines the button height */
                    margin-bottom: -0.5rem;
                    font-weight: 300;
                    font-size: 1.4rem;
                }
            `]}}V([c({type:Object})],m.prototype,"button");var W=Object.getOwnPropertyDescriptor,G=(t,r,i,s)=>{for(var e=s>1?void 0:s?W(r,i):r,o=t.length-1,n;o>=0;o--)(n=t[o])&&(e=n(e)||e);return e};let j=class extends m{arrowBeforeTemplate(){return a`<svg class="before" viewBox="0 0 14 54" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.0154 0H2.70485C0.658672 0 -0.635841 2.20865 0.355591 4.00822L12.3016 25.6918C12.75 26.5057 12.75 27.4943 12.3016 28.3082L0.355592 49.9918C-0.63584 51.7913 0.65866 54 2.70484 54H13.0154V0Z" fill="currentColor"/></svg>`}arrowAfterTemplate(){return a`<svg class="after" viewBox="0 0 18 54" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 54.0008C1.97011 53.9741 3.77774 52.9136 4.73429 51.2177L17.6557 28.3091C18.1148 27.4952 18.1148 26.5065 17.6557 25.6926L4.73429 2.78391C3.77774 1.08803 1.97011 0.0275068 0 0.000823975V54.0008Z" fill="currentColor"/></svg>`}static get styles(){const t=super.styles;return t.push(p`
                :host > a, :host > span {
                    color: var(--surface-current);
                }

                .inner {
                    padding: var(--space-sm);
                    background-color: var(--color-brand-pop);
                }

                .before {
                    flex: none;
                    margin-right: -2px;
                    display: block;
                    height: 54px; /* Make dynamic */
                    color: var(--color-brand-pop);
                }

                .after {
                    flex: none;
                    margin-left: -1px;
                    margin-right: -3px;
                    display: block;
                    height: 54px; /* Make dynamic */
                    color: var(--color-brand-pop);
                }
            `),t}};j=G([l("arrow-architecture-button")],j);var U=Object.getOwnPropertyDescriptor,q=(t,r,i,s)=>{for(var e=s>1?void 0:s?U(r,i):r,o=t.length-1,n;o>=0;o--)(n=t[o])&&(e=n(e)||e);return e};let C=class extends m{static get styles(){const t=super.styles;return t.push(p`
                :host > a, :host > span {
                    padding: var(--space-xs) var(--space-sm);
                    background-color: var(--color-brand-base);
                    color: var(--surface-current);
                    border-radius: var(--radius-pill);
                }
            `),t}};C=q([l("default-architecture-button")],C);var K=Object.getOwnPropertyDescriptor,Q=(t,r,i,s)=>{for(var e=s>1?void 0:s?K(r,i):r,o=t.length-1,n;o>=0;o--)(n=t[o])&&(e=n(e)||e);return e};let P=class extends m{iconTemplate(){return a`<bdo-icon .icon="${this.button.icon}" inverted></bdo-icon>`}static get styles(){const t=super.styles;return t.push(p`
                :host > a, :host > span {
                    padding: var(--space-xs);
                    background-color: var(--surface-current);
                    color: var(--text-color-base);
                    border-radius: var(--radius-base);
                }

                .icon {
                    color: var(--color-brand-base)!important;
                }
            `),t}};P=Q([l("inverted-architecture-button")],P);var X=Object.getOwnPropertyDescriptor,tt=(t,r,i,s)=>{for(var e=s>1?void 0:s?X(r,i):r,o=t.length-1,n;o>=0;o--)(n=t[o])&&(e=n(e)||e);return e};let A=class extends m{static get styles(){const t=super.styles;return t.push(p`
                :host > a, :host > span {
                    padding: 0 var(--space-xs);
                    color: var(--text-color-base);
                }

                .icon {
                    padding: var(--space-xs);
                    flex: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    background-color: var(--color-brand-base);
                    color: var(--surface-current);
                    border-radius: var(--radius-pill);
                    aspect-ratio: 1;
                }
            `),t}};A=tt([l("icon-circle-architecture-button")],A);var et=Object.defineProperty,rt=Object.getOwnPropertyDescriptor,_=(t,r,i,s)=>{for(var e=s>1?void 0:s?rt(r,i):r,o=t.length-1,n;o>=0;o--)(n=t[o])&&(e=(s?n(r,i,e):n(e))||e);return s&&e&&et(r,i,e),e};let w=class extends h{render(){switch(this.buttonType){case"brand":return a`<default-architecture-button .button=${this.button} />`;case"stream":return a`<arrow-architecture-button .button=${this.button} />`;case"default":return a`<inverted-architecture-button .button=${this.button} />`;default:return a`<icon-circle-architecture-button .button=${this.button} />`}}};_([c()],w.prototype,"buttonType",2);_([c({type:Object})],w.prototype,"button",2);w=_([l("architecture-button")],w);var at=Object.defineProperty,ot=Object.getOwnPropertyDescriptor,O=(t,r,i,s)=>{for(var e=s>1?void 0:s?ot(r,i):r,o=t.length-1,n;o>=0;o--)(n=t[o])&&(e=(s?n(r,i,e):n(e))||e);return s&&e&&at(r,i,e),e};let x=class extends h{render(){return a`
            ${this.groupTitleTemplate()}
            <div class="architecture-group-buttons">
                ${this.group.buttons.map(t=>a`<architecture-button .button=${t} .buttonType=${this.buttonType}></architecture-button>`)}
            </div>
        `}groupTitleTemplate(){return!this.group.title||this.group.title===""?a``:this.group.link?a`<h3><a .href=${this.group.link}>${this.group.title}</a></h3>`:a`<h3>${this.group.title}</h3>`}groupHeadingTemplate(){return this.group.title?a`<h3><a href="#">${this.group.title}</a></h3>`:a``}static get styles(){return[T,p`
                :host {
                    padding: var(--space-md) var(--space-sm) var(--space-sm);
                    width: 100%;
                    border: 3px solid var(--color-brand-a20);
                    border-radius: var(--radius-base);
                    position: relative;
                    min-width: 10rem;
                }
                h3, a {
                    color: var(--text-color-base);
                    font-family: var(--font-family-heading);
                    line-height: var(--line-height-heading);
                }
                h3 {
                    display: inline-block;
                    position: absolute;
                    top: 0;
                    left: var(--space-sm);
                    margin: 0;
                    padding: var(--space-xxs) var(--space-sm);
                    font-size: var(--font-size-sm);
                    background-color: var(--color-brand-a10);
                    border-radius: var(--radius-pill);
                    transform: translateY(-50%);
                    overflow: hidden;
                }
                a {
                    display: block;
                    text-decoration: underline;
                }
                a:hover {
                    text-decoration: none;
                }
                .architecture-group-buttons {
                    display: flex;
                    flex-wrap: wrap;
                    gap: var(--space-xs);
                }
            `]}};O([c()],x.prototype,"buttonType",2);O([c({type:Object})],x.prototype,"group",2);x=O([l("architecture-group")],x);var st=Object.defineProperty,nt=Object.getOwnPropertyDescriptor,g=(t,r,i,s)=>{for(var e=s>1?void 0:s?nt(r,i):r,o=t.length-1,n;o>=0;o--)(n=t[o])&&(e=(s?n(r,i,e):n(e))||e);return s&&e&&st(r,i,e),e};let u=class extends h{render(){return a`
            <div class="architecture-section" data-section-type="${S(S(this.sectionType))}">
                ${this.arrowTemplate()}
                ${this.sectionTitleTemplate()}
                ${this.groupsTemplate()}
                ${this.buttonsTemplate()}
            </div>
        `}arrowTemplate(){return this.arrow?a`
            <svg class="arrow arrow-${this.arrow}" viewBox="0 0 70 45" xmlns="http://www.w3.org/2000/svg">
                <path d="M61.895 0H8.45273C1.60825 0 -2.0756 8.03663 2.39206 13.2219L27.3318 42.1676C30.3843 45.7104 35.8116 45.8909 39.0928 42.5587L67.5953 13.6131C72.5752 8.55579 68.9925 0 61.895 0Z" fill="currentColor"/>
            </svg>
        `:a``}sectionTitleTemplate(){return!this.section.title||this.section.title.trim()===""?a``:this.section.link?a`
            <a .href=${this.section.link}>
                ${this.sectionHeadingTemplate()}
            </a>
        `:this.sectionHeadingTemplate()}sectionHeadingTemplate(){return a`<h2>${this.section.title}</h2>`}groupsTemplate(){var t;return this.section.groups?a`
            <div class="architecture-groups">
                ${(t=this.section.groups)==null?void 0:t.map(r=>a`<architecture-group .group=${r} .buttonType=${this.buttonType}></architecture-group>`)}
            </div>
        `:a``}buttonsTemplate(){var t;return this.section.buttons?(t=this.section.buttons)==null?void 0:t.map(r=>a`<architecture-button .button=${r} .buttonType=${this.buttonType}></architecture-button>`):a``}static get styles(){return[T,p`
                :host {
                    display: contents;
                }

                .architecture-section {
                    display: flex;
                    align-items: center;
                    gap: var(--space-xs);
                    flex-wrap: wrap;
                    padding: var(--space-lg) var(--space-sm) var(--space-sm);
                    width: 100%;
                    position: relative;
                    border-radius: var(--radius-base);
                }

                .architecture-section:not([data-section-type]) {
                    background-color: var(--color-brand-a10);
                    color: var(--color-black);
                }

                .architecture-section:not(:has(a), :has(h2)) {
                    padding: var(--space-sm);
                }

                .architecture-section[data-section-type="streams"] {
                    padding-top: var(--space-md);
                    color: var(--surface-main);
                    border: 3px solid var(--color-brand-pop);
                    gap: 0;
                }

                .architecture-section[data-section-type="side"] {
                    grid-row: span 4 / span 4; /* Make dynamic */
                    grid-column-start: 2;
                    grid-row-start: 1;
                    flex-direction: column;
                    justify-content: center;
                    align-items: stretch;
                    gap: var(--space-sm);
                    background-color: var(--color-grey-100);
                }
                .arrow {
                    position: absolute;
                    width: 2.5rem;
                    color: var(--color-brand-a10);
                    fill: currentColor;
                }

                .arrow-up {
                    top: 0.375rem;
                    right: 50%;
                    transform: translate(50%, -100%) rotate(180deg);
                }

                .arrow-down {
                    bottom: 0.375rem;
                    left: 50%;
                    transform: translate(-50%, 100%);
                }

                h2, a {
                    color: var(--text-color-heading);
                    font-family: var(--font-family-heading);
                    font-size: 1.3rem;
                }
                h2 {
                    display: inline-block;
                    position: absolute;
                    top: 0;
                    left: var(--space-sm);
                    margin: 0;
                    padding: var(--space-xxs) var(--space-sm);
                    background-color: var(--surface-main);
                    border-radius: var(--radius-pill);
                    transform: translateY(-50%);
                    text-transform: lowercase;
                }
                a h2 {
                    text-decoration: underline;
                }
                a:hover h2 {
                    text-decoration: none;
                }

                .architecture-groups {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    align-items: stretch;
                    gap: var(--space-md);
                    margin-top: var(--space-sm);
                }

                * {
                    box-sizing: border-box;
                }
            `]}};g([c()],u.prototype,"buttonType",2);g([c()],u.prototype,"sectionType",2);g([c()],u.prototype,"arrow",2);g([c({type:Object})],u.prototype,"section",2);u=g([l("architecture-section")],u);var it=Object.defineProperty,ct=Object.getOwnPropertyDescriptor,$=(t,r,i,s)=>{for(var e=s>1?void 0:s?ct(r,i):r,o=t.length-1,n;o>=0;o--)(n=t[o])&&(e=(s?n(r,i,e):n(e))||e);return s&&e&&it(r,i,e),e};const pt="business-reference-architecture";let d=class extends h{render(){return this.model instanceof Z?a`<div class="error">${this.model.message}</div>`:a`
      <div class="architecture-section-grid" data-has-side="${this.hasSide()}">
        ${this.model.map(t=>a`<architecture-section
                  .section=${t}
                  .arrow=${t.arrow}
                  .sectionType=${t.sectionType}
                  .buttonType=${t.buttonType}
                ></architecture-section>`)}
      </div>
    `}hasSide(){return this.model.some(t=>t.sectionType==="side")}async update(t){if(t.has("src"))try{this.model=await k(this.src)}catch(r){this.model=r}t.has("json")&&(this.model=JSON.parse(this.json)),super.update(t)}static get styles(){return[T,p`
        :host {
          margin-top: var(--space-sm);
          display: block;
        }

        .architecture-section-grid[data-has-side="true"] {
          display: grid;
          grid-template-columns: 1fr 244px;
          column-gap: var(--space-md);
          row-gap: var(--space-lg);
        }

        .architecture-section-grid[data-has-side="false"] {
          display: flex;
          flex-direction: column;
          gap: var(--space-lg);
        }
      `]}};$([c({type:Array})],d.prototype,"model",2);$([c({attribute:"src"})],d.prototype,"src",2);$([c({attribute:"data-json"})],d.prototype,"json",2);d=$([l(pt)],d);const lt=[{title:"Section 1",sectionType:"main",buttonType:"primary",arrow:"right"},{title:"Section 2",sectionType:"side",buttonType:"secondary",arrow:"none"}],Tt={title:"Components/BusinessReferenceArchitecture",component:"business-reference-architecture",parameters:{layout:"padded"},argTypes:{src:{control:"text",description:"URL to fetch YAML data from"},"data-json":{control:"text",description:"JSON data as string"}},render:t=>a`
    <business-reference-architecture
      src=${t.src}
      data-json=${t["data-json"]}
    ></business-reference-architecture>
  `},v={args:{src:"/path/to/your/data.yaml"}},f={args:{"data-json":JSON.stringify(lt)}},b={args:{src:"invalid-url.yaml"}},y={args:{"data-json":JSON.stringify([{title:"Main Section",sectionType:"main",buttonType:"primary",arrow:"right"},{title:"Side Section",sectionType:"side",buttonType:"secondary",arrow:"none"},{title:"Another Main Section",sectionType:"main",buttonType:"primary",arrow:"right"}])}};var D,B,M;v.parameters={...v.parameters,docs:{...(D=v.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    src: '/path/to/your/data.yaml'
  }
}`,...(M=(B=v.parameters)==null?void 0:B.docs)==null?void 0:M.source}}};var J,L,N;f.parameters={...f.parameters,docs:{...(J=f.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    'data-json': JSON.stringify(mockSections)
  }
}`,...(N=(L=f.parameters)==null?void 0:L.docs)==null?void 0:N.source}}};var z,H,F;b.parameters={...b.parameters,docs:{...(z=b.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    src: 'invalid-url.yaml'
  }
}`,...(F=(H=b.parameters)==null?void 0:H.docs)==null?void 0:F.source}}};var E,Y,R;y.parameters={...y.parameters,docs:{...(E=y.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    'data-json': JSON.stringify([{
      title: "Main Section",
      sectionType: "main",
      buttonType: "primary",
      arrow: "right"
    }, {
      title: "Side Section",
      sectionType: "side",
      buttonType: "secondary",
      arrow: "none"
    }, {
      title: "Another Main Section",
      sectionType: "main",
      buttonType: "primary",
      arrow: "right"
    }])
  }
}`,...(R=(Y=y.parameters)==null?void 0:Y.docs)==null?void 0:R.source}}};const $t=["FromSource","FromJSON","ErrorState","WithSideSections"];export{b as ErrorState,f as FromJSON,v as FromSource,y as WithSideSections,$t as __namedExportsOrder,Tt as default};
