import{i as x,x as T}from"./lit-element-CPu3RyXn.js";import{t as y}from"./property-I-G7jaNi.js";import{U as v}from"./index-f7bx2xUn.js";import"./index-SgVAtd6s.js";import"./unsafe-html-CmltxUo3.js";import"./directive-CJw_OlP2.js";import"./reset.css-DipPbE3d.js";import"./index-DEzdt580.js";import"./index-GSxLrrin.js";import"./index-F8EjD1nr.js";import"./base-CShCMygk.js";import"./index-B-WZp9xr.js";import"./iframe-HMoP8yNR.js";import"./_commonjsHelpers-D6-XlEtG.js";import"./index-BAMY2Nnw.js";import"./state-KOUaZEt-.js";import"./if-defined-CS3UzSui.js";const f=x`

    :host {
        --use-case-color-200: #CDE1AC;
        --use-case-color-500: #76AC3F;
        --use-case-color-800: #4A6620;
    }
`;var C=Object.getOwnPropertyDescriptor,h=(s,o,l,c)=>{for(var t=c>1?void 0:c?C(o,l):o,a=s.length-1,i;a>=0;a--)(i=s[a])&&(t=i(t)||t);return t};const _="task-viewer";let p=class extends v{constructor(){super(...arguments),this.useCaseType={type:"task",icon:"mat-task_alt",name:"Task"}}renderMain(s){return T`
      ${this.modelViewerTemplate("task-context","Context",s==null?void 0:s.context)}
      ${this.casesTemplate("task-actions","Actions",s==null?void 0:s.actions)}
      ${this.casesTemplate("task-exceptions","Exceptions",s==null?void 0:s.exceptions)}
    `}static get styles(){return[super.styles,f]}};p=h([y(_)],p);const q={title:"Viewers/TaskViewer",component:"task-viewer",parameters:{layout:"padded"},argTypes:{src:{control:"text",description:"URL to fetch task YAML from"}},render:s=>T`
    <task-viewer
      src=${s.src}
    ></task-viewer>
  `},r={args:{src:"1.task.yml"}},e={args:{src:"2.task.yml"}};var n,m,k;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
  args: {
    src: '1.task.yml'
  }
}`,...(k=(m=r.parameters)==null?void 0:m.docs)==null?void 0:k.source}}};var u,g,w;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    src: '2.task.yml'
  }
}`,...(w=(g=e.parameters)==null?void 0:g.docs)==null?void 0:w.source}}};const z=["Task1","Task2"];export{r as Task1,e as Task2,z as __namedExportsOrder,q as default};
