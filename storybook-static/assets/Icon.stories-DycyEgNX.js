import{x as f}from"./lit-element-CPu3RyXn.js";import"./index-DEzdt580.js";import"./property-I-G7jaNi.js";import"./reset.css-DipPbE3d.js";import"./index-GSxLrrin.js";import"./index-F8EjD1nr.js";const M={title:"Shared/Icon",component:"biz-icon",parameters:{layout:"padded"},argTypes:{name:{control:"text",description:"Name of the icon from Material Symbols"},size:{control:"select",options:["small","medium","large"],description:"Size of the icon"}},render:o=>f`
    <biz-icon
      name=${o.name}
      size=${o.size}
    ></biz-icon>
  `},e={args:{name:"home",size:"small"}},i={args:{name:"settings",size:"medium"}},n={args:{name:"info",size:"large"}},r={render:()=>f`
    <div style="display: flex; gap: 1rem;">
      <biz-icon name="home" size="medium"></biz-icon>
      <biz-icon name="settings" size="medium"></biz-icon>
      <biz-icon name="info" size="medium"></biz-icon>
      <biz-icon name="warning" size="medium"></biz-icon>
      <biz-icon name="error" size="medium"></biz-icon>
    </div>
  `};var s,a,m;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    name: 'home',
    size: 'small'
  }
}`,...(m=(a=e.parameters)==null?void 0:a.docs)==null?void 0:m.source}}};var c,t,d;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    name: 'settings',
    size: 'medium'
  }
}`,...(d=(t=i.parameters)==null?void 0:t.docs)==null?void 0:d.source}}};var z,p,l;n.parameters={...n.parameters,docs:{...(z=n.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    name: 'info',
    size: 'large'
  }
}`,...(l=(p=n.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var u,b,g;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => html\`
    <div style="display: flex; gap: 1rem;">
      <biz-icon name="home" size="medium"></biz-icon>
      <biz-icon name="settings" size="medium"></biz-icon>
      <biz-icon name="info" size="medium"></biz-icon>
      <biz-icon name="warning" size="medium"></biz-icon>
      <biz-icon name="error" size="medium"></biz-icon>
    </div>
  \`
}`,...(g=(b=r.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};const w=["Small","Medium","Large","DifferentIcons"];export{r as DifferentIcons,n as Large,i as Medium,e as Small,w as __namedExportsOrder,M as default};
