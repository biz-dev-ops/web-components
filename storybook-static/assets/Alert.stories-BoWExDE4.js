import{i as P,r as A,x as S}from"./lit-element-CPu3RyXn.js";import{n as $,t as q}from"./property-I-G7jaNi.js";import{r as T}from"./reset.css-DipPbE3d.js";import"./index-DEzdt580.js";import"./index-GSxLrrin.js";import"./index-F8EjD1nr.js";const C=P`
    :host {
        --_alert-color: var(--color-info);
        --_alert-color-100: var(--color-info-100);

        display: block;
    }

    .alert {
        background-color: var(--_alert-color-100);
        border: var(--line-base) solid var(--_alert-color);
        border-radius: var(--radius-half);
        display: flex;
        gap: var(--space-xs);
        padding: var(--space-sm);
        font-size: var(--font-size-sm);
    }

    .alert--success {
        --_alert-color: var(--color-success);
        --_alert-color-100: var(--color-success-100);
    }

    .alert--warning {
        --_alert-color: var(--color-warning);
        --_alert-color-100: var(--color-warning-100);
    }

    .alert--error {
        --_alert-color: var(--color-error);
        --_alert-color-100: var(--color-error-100);
    }

    bdo-icon {
        color: var(--_alert-color);
        font-size: var(--heading-3-size);
        line-height: .8; // Visually center the icon
    }

    ::slotted(:where(p, figure, table, ul, ol, dl, pre, blockquote)) {
        margin: 0;
        color: var(--text-color-base);
    }

    ::slotted(:where(h1, h2, h3, h4, h5, h6)) {
        color: var(--text-color-heading);
        font-family: var(--font-family-heading);
        line-height: var(--line-height-heading);
        margin: 0;
    }

    ::slotted(:where(p, table, ul, ol, dl, pre, blockquote, h1, h2, h3, h4, h5, h6):not(:last-child)) {
        margin-block-end: calc(var(--line-height-base) * .5em);
    }

    ::slotted(:where():not(:last-child)) {
        margin-block-end: calc(var(--line-height-base) * .5em);
    }

    ::slotted(:where(h2, .heading-size-2)) {
        font-size: var(--heading-2-size);
    }

    ::slotted(:where(h3, .heading-size-3)) {
        font-size: var(--heading-4-size);
    }

    ::slotted(:where(h4, .heading-size-4)) {
        font-size: var(--heading-5-size);
    }

    ::slotted(:where(a)) {
        color: var(--link-text-color, currentcolor);
        text-underline-offset: .25ex;
    }

    ::slotted(:where(a:hover,a:focus)) {
        text-decoration: none !important;
    }
`;var E=Object.defineProperty,I=Object.getOwnPropertyDescriptor,O=(e,o,c,s)=>{for(var r=s>1?void 0:s?I(o,c):o,i=e.length-1,p;i>=0;i--)(p=e[i])&&(r=(s?p(o,c,r):p(r))||r);return s&&r&&E(o,c,r),r};let d=class extends A{constructor(){super(...arguments),this.type="info"}render(){return S`
            <div class="alert ${this.type?`alert--${this.type}`:""}" role="alert">
                <bdo-icon icon="${e(this.type)}" class="alert__icon"></bdo-icon>
                <div class="alert__message">
                    <slot></slot>
                </div>
            </div>
        `;function e(o){switch(o){case"warning":return"mat-warning";case"error":return"mat-error";default:return"mat-info"}}}static get styles(){return[T,C]}};O([$({type:String})],d.prototype,"type",2);d=O([q("bdo-alert")],d);const F={title:"Shared/Alert",component:"biz-alert",parameters:{layout:"padded"},argTypes:{type:{control:"select",options:["info","success","warning","error"],description:"Type of alert"},message:{control:"text",description:"Alert message"}},render:e=>S`
    <biz-alert
      type=${e.type}
      message=${e.message}
    ></biz-alert>
  `},a={args:{type:"info",message:"This is an informational message"}},t={args:{type:"success",message:"Operation completed successfully"}},n={args:{type:"warning",message:"Please review your input before proceeding"}},l={args:{type:"error",message:"An error occurred while processing your request"}};var g,m,h;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    type: 'info',
    message: 'This is an informational message'
  }
}`,...(h=(m=a.parameters)==null?void 0:m.docs)==null?void 0:h.source}}};var u,f,v;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    type: 'success',
    message: 'Operation completed successfully'
  }
}`,...(v=(f=t.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var y,b,w;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    type: 'warning',
    message: 'Please review your input before proceeding'
  }
}`,...(w=(b=n.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var _,z,x;l.parameters={...l.parameters,docs:{...(_=l.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    type: 'error',
    message: 'An error occurred while processing your request'
  }
}`,...(x=(z=l.parameters)==null?void 0:z.docs)==null?void 0:x.source}}};const G=["Info","Success","Warning","Error"];export{l as Error,a as Info,t as Success,n as Warning,G as __namedExportsOrder,F as default};
