import{r as L,x as m,i as P}from"./lit-element-CPu3RyXn.js";import{n as S,t as H}from"./property-I-G7jaNi.js";import{r as M}from"./state-KOUaZEt-.js";import{o as O}from"./unsafe-html-CmltxUo3.js";import{r as E}from"./reset.css-DipPbE3d.js";import{t as $}from"./typography.css-DjBm3kaU.js";import{F as W,a as R}from"./index-B-WZp9xr.js";import{T as _,M as A}from"./index-F8EjD1nr.js";import"./directive-CJw_OlP2.js";import"./iframe-HMoP8yNR.js";import"./_commonjsHelpers-D6-XlEtG.js";import"./index-BAMY2Nnw.js";const x=[{extensions:[".bpmn"],tag:"bpmn-viewer"},{extensions:["business-model-canvas.yml","business-model-canvas.yaml"],tag:"business-model-canvas"},{extensions:["business-reference-architecture.yml","business-reference-architecture.yaml"],tag:"business-reference-architecture"},{extensions:[".command.yml",".command.yaml"],tag:"command-viewer"},{extensions:[".dmn"],tag:"dmn-viewer"},{extensions:[".event.yml",".event.yaml"],tag:"event-viewer"},{extensions:[".mmd"],tag:"mermaid-viewer"},{extensions:[".model.yml",".model.yaml"],tag:"model-viewer"},{extensions:[".query.yml",".query.yaml"],tag:"query-viewer"},{extensions:[".task.yml",".task.yaml"],tag:"task-viewer"}];function F(o){const r=e();if(!r)return;const n=o.getAttribute("href");o.tokens.filter(t=>t.type.startsWith("link_")).forEach(t=>{var s;t.tag=r,t.block=!0,t.attrPush(["src",n]);const l=t.attrIndex("href");l>-1&&((s=t.attrs)==null||s.splice(l,1))});function e(){var l;const t=o.getPath();return t?(l=x.find(s=>s.extensions.some(i=>t.endsWith(i))))==null?void 0:l.tag:null}}function j(o){o.core.ruler.push("nested_headers",r=>{const n=[],e=[];for(const c of r.tokens){if(c.type==="heading_open"){const u=parseInt(c.tag.slice(1));t(u),i(c)}l(c)}for(;e.length>0;){const c=e.pop();a(c)}r.tokens=n;function t(c){for(let u=e.length-1;u>=0;u--){const d=e[u];if(parseInt(d.attrGet("data-heading-level"))>=c)a(d),e.splice(u,1);else break}}function l(c){const d=s()+c.level+1;c.level=d,n.push(c)}function s(){return e.length==0?-1:e[e.length-1].level}function i(c){const u=new _("heading_container_open","div",1);u.level=s()+1,u.map=c.map,u.attrPush(["data-heading-level",c.tag.slice(1)]),n.push(u),e.push(u)}function a(c){const u=new _("heading_container_close","div",-1);u.level=c.level,u.map=c.map;const d=c.attrGet("data-heading-level");d&&u.attrPush(["data-heading-level",d]),n.push(u)}})}function G(o,r){const n=(r==null?void 0:r.isAriaExpanded)||(e=>{});o.use(j),o.renderer.rules.heading_container_open=function(e,t){const l=Number.parseInt(e[t].attrGet("data-heading-level")),s=n(l);return`<bdo-heading-container${s===void 0?"":` aria-expanded="${s}"`}>`},o.renderer.rules.heading_open=function(e,t,l,s,i){return e[t].attrSet("slot","header"),i.renderToken(e,t,l)},o.renderer.rules.heading_container_close=function(){return"</bdo-heading-container>"}}class C{constructor(r){this.tokens=r}getAttribute(r){var n;return(n=this.tokens.find(e=>e.type==="link_open"))==null?void 0:n.attrGet(r)}getPath(){var r,n;return(n=(r=this.getAttribute("href"))==null?void 0:r.split("?")[0])==null?void 0:n.split("#")[0]}getText(){var r;return(r=this.tokens.find(n=>n.type==="text"))==null?void 0:r.content}}function q(o,r){const n=r.transformer;o.core.ruler.push("links_transform_ruler",e=>{for(const t of e.tokens)if(t.type==="inline"&&t.children){let l=null;for(let s=0;s<t.children.length;s++){const i=t.children[s];i.type==="link_open"&&(l=new C(D(t.children,s)),n(l)),i.type==="link_close"&&l&&(l=null)}}}),o.core.ruler.push("move_block_items_out_of_inline_children_ruler",e=>{const t=[];for(const s of e.tokens)if(s.type==="inline"&&s.children){let i=!1;const a=[];for(const c of s.children)c.type==="link_open"&&c.block&&(i=!0),i?l(c,s.level):a.push(c),c.type==="link_close"&&(i&&(c.block=!0),i=!1);s.children=a,s.children.length>0&&t.push(s)}else t.push(s);e.tokens=t;function l(s,i){s.level=i+s.level,s.moved=!0,t.push(s)}}),o.core.ruler.push("move_block_items_out_of_paragraph_rule",e=>{const t=[];let l=-1;for(const a of e.tokens)a.type==="paragraph_open"?l=t.length:a.type==="paragraph_close"&&(l=-1),a.moved?s(a):t.push(a),a.type==="paragraph_close"&&i();e.tokens=t;function s(a){delete a.moved,l>=0?(a.level-=1,t.splice(l++,0,a)):t.push(a)}function i(){const a=t.length-2;t[a].type==="paragraph_open"&&t.splice(a,2)}})}function D(o,r){const n=[];for(r;r<o.length;r++){const e=o[r];if(n.push(e),e.type==="link_close")break}return n}function V(o,r){const n=(r==null?void 0:r.listItemIsTabPanel)||(e=>!1);o.core.ruler.push("tabs_ruler",e=>{const t=e.tokens;let l=!1,s=!1;for(let i=0;i<t.length;i++){const a=t[i];if(a.type==="bullet_list_open")l=!0,s=!1;else if(a.type==="bullet_list_close")l=!1,s&&(a.tabs=!0,U(i,t));else if(l&&a.type==="list_item_open"&&!s){const c=N(i,t),u=new Y(c);s=n(u)}}})}function N(o,r){const n=[];for(let e=o;e<r.length&&(n.push(r[e]),r[e].type!=="list_item_close");e++);return n}function U(o,r){for(let n=o-1;n>=0;n--){const e=r[n];if((e.type==="list_item_open"||e.type==="list_item_close")&&(e.tab=!0),(e.type==="bullet_list_open"||e.type==="bullet_list_close")&&(e.tabs=!0),e.type==="bullet_list_open")break}}class Y{constructor(r){this.tokens=r}getLink(){const r=t(this.tokens);let n=!1;const e=[];for(const l of r)l.type==="link_open"&&(n=!0),n&&e.push(l),l.type==="link_close"&&(n=!1);if(e.length===0)return null;return new C(e);function t(l){var s;return l.some(i=>i.type==="link_open")?l:l.some(i=>{var a;return i.type==="inline"&&((a=i.children)==null?void 0:a.some(c=>c.type==="link_open"))})?(s=l.find(i=>i.type==="inline"))==null?void 0:s.children:[]}}}function B(o,r){o.use(V,r),o.renderer.rules.bullet_list_open=function(n,e,t,l,s){return n[e].tabs?'<bdo-tabs selectedIndex="0">':s.renderToken(n,e,t)},o.renderer.rules.list_item_open=function(n,e,t,l,s){if(!n[e].tab)return s.renderToken(n,e,t);const a=z(n,e);return`<bdo-tab title="${(a==null?void 0:a.content)||"undefined"}">`},o.renderer.rules.list_item_close=function(n,e,t,l,s){return n[e].tab?"</bdo-tab>":s.renderToken(n,e,t)},o.renderer.rules.bullet_list_close=function(n,e,t,l,s){return n[e].tabs?"</bdo-tabs>":s.renderToken(n,e,t)}}function z(o,r){for(r;r<o.length;r++){const n=o[r];if(n.type==="text")return n;if(n.children){const e=n.children.find(t=>t.type==="text");if(e)return e}}return null}const J=x.flatMap(o=>o.extensions),K=o=>J.some(r=>{var n,e;return(e=(n=o.getLink())==null?void 0:n.getPath())==null?void 0:e.endsWith(r)}),g=A();g.use(G,{isAriaExpanded:o=>{if(o>2)return!1}});g.use(B,{listItemIsTabPanel:K});g.use(q,{transformer:F});var Q=Object.defineProperty,X=Object.getOwnPropertyDescriptor,k=(o,r,n,e)=>{for(var t=e>1?void 0:e?X(r,n):r,l=o.length-1,s;l>=0;l--)(s=o[l])&&(t=(e?s(r,n,t):s(t))||t);return e&&t&&Q(r,n,t),t};let h=class extends L{render(){return this.state instanceof W?m`<div class="error">${this.state.message}</div>`:this.state?m`${O(this.state)}`:m``}async updated(o){if(o.has("src"))try{const r=await R(this.src);this.state=g.render(r)}catch(r){this.state=r}}static get styles(){return[E,$,P`
        :host {
          display: block;
        }
      `]}};k([S({attribute:"src"})],h.prototype,"src",2);k([M()],h.prototype,"state",2);h=k([H("markdown-viewer")],h);const pe={title:"Viewers/MarkdownViewer",component:"markdown-viewer",parameters:{layout:"padded"},argTypes:{src:{control:"text",description:"URL to fetch Markdown from"},"data-markdown":{control:"text",description:"Markdown content as string"}},render:o=>m`
    <markdown-viewer
      src=${o.src}
      data-markdown=${o["data-markdown"]}
    ></markdown-viewer>
  `},p={args:{src:"/path/to/your/document.md"}},f={args:{"data-markdown":`# Sample Markdown

This is a sample markdown document with various features:

## Headers
You can use different levels of headers

### Lists
- Item 1
- Item 2
  - Subitem 1
  - Subitem 2

## Code
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

## Tables
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |`}};var v,y,b;p.parameters={...p.parameters,docs:{...(v=p.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    src: '/path/to/your/document.md'
  }
}`,...(b=(y=p.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};var w,T,I;f.parameters={...f.parameters,docs:{...(w=f.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    'data-markdown': \`# Sample Markdown

This is a sample markdown document with various features:

## Headers
You can use different levels of headers

### Lists
- Item 1
- Item 2
  - Subitem 1
  - Subitem 2

## Code
\\\`\\\`\\\`javascript
function hello() {
  console.log("Hello, World!");
}
\\\`\\\`\\\`

## Tables
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |\`
  }
}`,...(I=(T=f.parameters)==null?void 0:T.docs)==null?void 0:I.source}}};const fe=["FromSource","FromMarkdown"];export{f as FromMarkdown,p as FromSource,fe as __namedExportsOrder,pe as default};
