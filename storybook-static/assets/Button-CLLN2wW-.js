import{T as u,x as c}from"./lit-element-CPu3RyXn.js";import{e as l,i as d,t as y}from"./directive-CJw_OlP2.js";/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const i="important",b=" !"+i,a=l(class extends d{constructor(s){var e;if(super(s),s.type!==y.ATTRIBUTE||s.name!=="style"||((e=s.strings)==null?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(s){return Object.keys(s).reduce((e,o)=>{const t=s[o];return t==null?e:e+`${o=o.includes("-")?o:o.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${t};`},"")}update(s,[e]){const{style:o}=s.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)e[t]==null&&(this.ft.delete(t),t.includes("-")?o.removeProperty(t):o[t]=null);for(const t in e){const n=e[t];if(n!=null){this.ft.add(t);const r=typeof n=="string"&&n.endsWith(b);t.includes("-")||r?o.setProperty(t,r?n.slice(0,-11):n,r?i:""):o[t]=n}}return u}}),f=({primary:s,backgroundColor:e,size:o,label:t,onClick:n})=>{const r=s?"storybook-button--primary":"storybook-button--secondary";return c`
    <button
      type="button"
      class=${["storybook-button",`storybook-button--${o||"medium"}`,r].join(" ")}
      style=${a({backgroundColor:e})}
      @click=${n}
    >
      ${t}
    </button>
  `};export{f as B};
