import{i as y,x as g}from"./lit-element-CPu3RyXn.js";import{t as E}from"./property-I-G7jaNi.js";import{U as f}from"./index-f7bx2xUn.js";import"./index-SgVAtd6s.js";import"./unsafe-html-CmltxUo3.js";import"./directive-CJw_OlP2.js";import"./reset.css-DipPbE3d.js";import"./index-DEzdt580.js";import"./index-GSxLrrin.js";import"./index-F8EjD1nr.js";import"./base-CShCMygk.js";import"./index-B-WZp9xr.js";import"./iframe-HMoP8yNR.js";import"./_commonjsHelpers-D6-XlEtG.js";import"./index-BAMY2Nnw.js";import"./state-KOUaZEt-.js";import"./if-defined-CS3UzSui.js";const V=y`

    :host {
        --use-case-color-200: #ACE1DE;
        --use-case-color-500: #51A39F;
        --use-case-color-800: #236965;
    }
`;var _=Object.getOwnPropertyDescriptor,h=(e,a,w,n)=>{for(var r=n>1?void 0:n?_(a,w):a,o=e.length-1,c;o>=0;o--)(c=e[o])&&(r=c(r)||r);return r};const x="event-viewer";let i=class extends f{constructor(){super(...arguments),this.useCaseType={type:"event",icon:"mat-notifications",name:"Event"}}renderMain(e){return g`
      ${this.modelViewerTemplate("event-parameters","Parameters",e==null?void 0:e.parameters)}
    `}static get styles(){return[super.styles,V]}};i=h([E(x)],i);const z={title:"Viewers/EventViewer",component:"event-viewer",parameters:{layout:"padded"},argTypes:{src:{control:"text",description:"URL to fetch event YAML from"}},render:e=>g`
    <event-viewer
      src=${e.src}
    ></event-viewer>
  `},t={args:{src:"1.event.yml"}},s={args:{src:"2.event.yml"}};var p,m,v;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    src: '1.event.yml'
  }
}`,...(v=(m=t.parameters)==null?void 0:m.docs)==null?void 0:v.source}}};var u,l,d;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    src: '2.event.yml'
  }
}`,...(d=(l=s.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};const B=["Event1","Event2"];export{t as Event1,s as Event2,B as __namedExportsOrder,z as default};
