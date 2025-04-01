import{r as x,x as l,i as D}from"./lit-element-CPu3RyXn.js";import{n as h,t as $}from"./property-I-G7jaNi.js";import{r as O}from"./state-KOUaZEt-.js";import{e as P}from"./base-CShCMygk.js";/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function S(t){return(e,s)=>{const{slot:r,selector:a}=t??{},o="slot"+(r?`[name=${r}]`:":not([name])");return P(e,s,{get(){var f;const n=(f=this.renderRoot)==null?void 0:f.querySelector(o),v=(n==null?void 0:n.assignedElements(t))??[];return a===void 0?v:v.filter(C=>C.matches(a))}})}}var j=Object.defineProperty,I=Object.getOwnPropertyDescriptor,u=(t,e,s,r)=>{for(var a=r>1?void 0:r?I(e,s):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(a=(r?n(e,s,a):n(a))||a);return r&&a&&j(e,s,a),a};let p=class extends x{constructor(){super(...arguments),this.id=""}updated(){if(!this.title)throw new Error("Title is required but was not provided.");this.id||(this.id=this.title.toLowerCase().replace(/\s/g,"-"))}render(){return l`<div role="tabpanel" aria-labelledby="tab-${this.id}" id="tabpanel-${this.id}"><slot></slot></div>`}static get styles(){return D`
      :host {
        display: block;
        padding-block: var(--space-md);
      }
    `}};u([h({type:String})],p.prototype,"title",2);u([h()],p.prototype,"id",2);p=u([$("bdo-tab")],p);var A=Object.defineProperty,E=Object.getOwnPropertyDescriptor,d=(t,e,s,r)=>{for(var a=r>1?void 0:r?E(e,s):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(a=(r?n(e,s,a):n(a))||a);return r&&a&&A(e,s,a),a};const F="bdo-tabs";let i=class extends x{constructor(){super(...arguments),this.selectedIndex=0,this._tabsData=[]}render(){return l`
      <div class="tabs--list" role="tablist" .ariaLabel="${this.label}">
        ${this._tabsData.map(({title:t,id:e},s)=>l`
            <a
              href="#tabpanel-${e}"
              class="tab ${s===this.selectedIndex?"selected":""}"
              @click=${r=>this._handleTabClick(r,s)}
              role="tab"
              aria-selected="${s===this.selectedIndex?"true":"false"}"
              aria-controls="tabpanel-${e}"
              id="tab-${e}"
            >
              ${t}
            </a>
          `)}
      </div>
      <div class="tabs--panels">
        <slot @slotchange=${this._updateTabData} role="presentation"></slot>
      </div>
    `}firstUpdated(t){this._updateTabData(),this._updateSelectedTab()}updated(t){t.has("selectedIndex")&&this._updateSelectedTab()}_updateTabData(){this._tabsData=this._tabs.map(t=>({title:t.getAttribute("title"),id:t.id}))}_updateSelectedTab(){this._tabs.forEach((t,e)=>{e===this.selectedIndex?(t.classList.add("selected"),t.setAttribute("aria-hidden","false")):(t.classList.remove("selected"),t.setAttribute("aria-hidden","true"))})}_handleTabClick(t,e){t.preventDefault(),this.selectedIndex=e,this.dispatchEvent(new CustomEvent("tab-selected",{detail:{index:e}}))}static get styles(){return D`
      :host {
        display: block;
      }

      .tabs--list {
        background-color: var(--color-white);
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-xs) var(--space-sm);
        justify-content: flex-start;
        list-style: none;
        padding-left: 0;
        max-width: none;
      }

      .tab {
        border-bottom: var(--line-thin) solid var(--color-black-a10);
        color: currentcolor;
        display: block;
        padding: var(--space-xs) var(--space-sm);
        text-decoration: none;
      }

      .tab:hover,
      .tab:focus {
        border-bottom-color: var(--link-text-color);
      }

      .tab[aria-selected="true"] {
        border-bottom-color: currentcolor;
        color: var(--link-text-color);
        font-weight: 600;
      }

      ::slotted(bdo-tab) {
        display: none;
      }

      ::slotted(bdo-tab[aria-hidden="false"]) {
        display: block;
      }
    `}};d([h({type:Number})],i.prototype,"selectedIndex",2);d([h({type:String})],i.prototype,"label",2);d([O()],i.prototype,"_tabsData",2);d([S({selector:"bdo-tab"})],i.prototype,"_tabs",2);i=d([$(F)],i);const k={title:"Shared/Tabs",component:"biz-tabs",parameters:{layout:"padded"},argTypes:{tabs:{control:"object",description:"Array of tab objects with label and content"}},render:t=>l`
    <biz-tabs
      .tabs=${t.tabs}
    ></biz-tabs>
  `},c={args:{tabs:[{label:"Tab 1",content:"Content for tab 1"},{label:"Tab 2",content:"Content for tab 2"},{label:"Tab 3",content:"Content for tab 3"}]}},b={args:{tabs:[{label:"Overview",content:l`
          <div>
            <h2>Overview</h2>
            <p>This is an overview of the system.</p>
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
            </ul>
          </div>
        `},{label:"Details",content:l`
          <div>
            <h2>Details</h2>
            <p>Detailed information about the system.</p>
            <table>
              <tr>
                <th>Property</th>
                <th>Value</th>
              </tr>
              <tr>
                <td>Version</td>
                <td>1.0.0</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>Active</td>
              </tr>
            </table>
          </div>
        `}]}};var m,y,_;c.parameters={...c.parameters,docs:{...(m=c.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    tabs: [{
      label: 'Tab 1',
      content: 'Content for tab 1'
    }, {
      label: 'Tab 2',
      content: 'Content for tab 2'
    }, {
      label: 'Tab 3',
      content: 'Content for tab 3'
    }]
  }
}`,...(_=(y=c.parameters)==null?void 0:y.docs)==null?void 0:_.source}}};var g,T,w;b.parameters={...b.parameters,docs:{...(g=b.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    tabs: [{
      label: 'Overview',
      content: html\`
          <div>
            <h2>Overview</h2>
            <p>This is an overview of the system.</p>
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
              <li>Feature 3</li>
            </ul>
          </div>
        \`
    }, {
      label: 'Details',
      content: html\`
          <div>
            <h2>Details</h2>
            <p>Detailed information about the system.</p>
            <table>
              <tr>
                <th>Property</th>
                <th>Value</th>
              </tr>
              <tr>
                <td>Version</td>
                <td>1.0.0</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>Active</td>
              </tr>
            </table>
          </div>
        \`
    }]
  }
}`,...(w=(T=b.parameters)==null?void 0:T.docs)==null?void 0:w.source}}};const q=["Basic","WithHTMLContent"];export{c as Basic,b as WithHTMLContent,q as __namedExportsOrder,k as default};
