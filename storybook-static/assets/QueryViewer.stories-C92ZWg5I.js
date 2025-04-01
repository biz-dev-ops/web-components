import{i as v,x as g}from"./lit-element-CPu3RyXn.js";import{t as f}from"./property-I-G7jaNi.js";import{U as h}from"./index-f7bx2xUn.js";import"./index-SgVAtd6s.js";import"./unsafe-html-CmltxUo3.js";import"./directive-CJw_OlP2.js";import"./reset.css-DipPbE3d.js";import"./index-DEzdt580.js";import"./index-GSxLrrin.js";import"./index-F8EjD1nr.js";import"./base-CShCMygk.js";import"./index-B-WZp9xr.js";import"./iframe-HMoP8yNR.js";import"./_commonjsHelpers-D6-XlEtG.js";import"./index-BAMY2Nnw.js";import"./state-KOUaZEt-.js";import"./if-defined-CS3UzSui.js";const x=v`

    :host {
        --use-case-color-200: #F6DF90;
        --use-case-color-500: #B17521;
        --use-case-color-800: #6A5611;
    }
`;var Q=Object.getOwnPropertyDescriptor,V=(r,o,l,p)=>{for(var e=p>1?void 0:p?Q(o,l):o,a=r.length-1,c;a>=0;a--)(c=r[a])&&(e=c(e)||e);return e};const _="query-viewer";let i=class extends h{constructor(){super(...arguments),this.useCaseType={type:"query",icon:"mat-search",name:"Query"}}renderMain(r){return g`
      ${this.modelViewerTemplate("query-parameters","Parameters",r==null?void 0:r.parameters)}
      ${this.modelViewerTemplate("query-response","Response",r==null?void 0:r.response)}
      ${this.casesTemplate("query-exceptions","Exceptions",r==null?void 0:r.exceptions)}
    `}static get styles(){return[super.styles,x]}};i=V([f(_)],i);const B={title:"Viewers/QueryViewer",component:"query-viewer",parameters:{layout:"padded"},argTypes:{src:{control:"text",description:"URL to fetch query YAML from"}},render:r=>g`
    <query-viewer
      src=${r.src}
    ></query-viewer>
  `},s={args:{src:"1.query.yml"}},t={args:{src:"2.query.yml"}};var u,n,m;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    src: '1.query.yml'
  }
}`,...(m=(n=s.parameters)==null?void 0:n.docs)==null?void 0:m.source}}};var y,q,w;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    src: '2.query.yml'
  }
}`,...(w=(q=t.parameters)==null?void 0:q.docs)==null?void 0:w.source}}};const Y=["Query1","Query2"];export{s as Query1,t as Query2,Y as __namedExportsOrder,B as default};
