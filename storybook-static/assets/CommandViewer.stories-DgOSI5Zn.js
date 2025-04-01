import{i as y,x as g}from"./lit-element-CPu3RyXn.js";import{t as v}from"./property-I-G7jaNi.js";import{U as f}from"./index-f7bx2xUn.js";import"./index-SgVAtd6s.js";import"./unsafe-html-CmltxUo3.js";import"./directive-CJw_OlP2.js";import"./reset.css-DipPbE3d.js";import"./index-DEzdt580.js";import"./index-GSxLrrin.js";import"./index-F8EjD1nr.js";import"./base-CShCMygk.js";import"./index-B-WZp9xr.js";import"./iframe-HMoP8yNR.js";import"./_commonjsHelpers-D6-XlEtG.js";import"./index-BAMY2Nnw.js";import"./state-KOUaZEt-.js";import"./if-defined-CS3UzSui.js";const x=y`

    /* Component */
    :host {
        --use-case-color-200: #E5CAF5;
        --use-case-color-500: #7B449E;
        --use-case-color-800: #4A1F63;
    }
`;var h=Object.getOwnPropertyDescriptor,V=(r,o,w,a)=>{for(var e=a>1?void 0:a?h(o,w):o,m=r.length-1,n;m>=0;m--)(n=r[m])&&(e=n(e)||e);return e};const _="command-viewer";let c=class extends f{constructor(){super(...arguments),this.useCaseType={type:"command",icon:"mat-terminal",name:"Command"}}renderMain(r){return g`
      ${this.modelViewerTemplate("command-parameters","Parameters",r==null?void 0:r.parameters)}
      ${this.casesTemplate("command-exceptions","Exceptions",r==null?void 0:r.exceptions)}
    `}static get styles(){return[super.styles,x]}};c=V([v(_)],c);const q={title:"Viewers/CommandViewer",component:"command-viewer",parameters:{layout:"padded"},argTypes:{src:{control:"text",description:"URL to fetch command YAML from"}},render:r=>g`
    <command-viewer
      src=${r.src}
    ></command-viewer>
  `},s={args:{src:"1.command.yml"}},t={args:{src:"2.command.yml"}};var p,i,d;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    src: '1.command.yml'
  }
}`,...(d=(i=s.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var u,l,C;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    src: '2.command.yml'
  }
}`,...(C=(l=t.parameters)==null?void 0:l.docs)==null?void 0:C.source}}};const z=["Command1","Command2"];export{s as Command1,t as Command2,z as __namedExportsOrder,q as default};
