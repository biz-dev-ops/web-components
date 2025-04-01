import{r as v,x as c,i as g}from"./lit-element-CPu3RyXn.js";import{n as m,t as ve}from"./property-I-G7jaNi.js";import{r as y}from"./reset.css-DipPbE3d.js";import{t as ge}from"./typography.css-DjBm3kaU.js";import"./index-DEzdt580.js";import{F as fe,f as be}from"./index-B-WZp9xr.js";import"./index-GSxLrrin.js";import"./index-F8EjD1nr.js";import"./iframe-HMoP8yNR.js";import"./_commonjsHelpers-D6-XlEtG.js";import"./index-BAMY2Nnw.js";var _e=Object.defineProperty,ye=(r,i,s,o)=>{for(var t=void 0,a=r.length-1,n;a>=0;a--)(n=r[a])&&(t=n(i,s,t)||t);return t&&_e(i,s,t),t};class f extends v{render(){var i;return c`
      ${(i=this.items)==null?void 0:i.map(s=>s.items?c`<ul>
            ${s.items.map(o=>c`<li>${o}</li>`)}
          </ul>`:Array.isArray(s)?c`<ul>
            ${s.map(o=>c`<li>${o}</li>`)}
          </ul>`:s.text?c`<p>${s.text}</p>`:s.head?c`<h4>${s.head}</h4>`:c`<p>${s}</p>`)}
    `}static get styles(){return[y,ge,g`
        :host {
          --font-size-base: var(--font-size-sm);
        }

        :where(p, ul, h4):not(:last-child) {
            margin-block-end: calc(var(--line-height-base) * .5rem);
        }
      `]}}ye([m({type:Array})],f.prototype,"items");ye([m({attribute:"model-json"})],f.prototype,"itemsJson");window.customElements.define("canvas-box-collection",f);var we=Object.defineProperty,xe=Object.getOwnPropertyDescriptor,h=(r,i,s,o)=>{for(var t=o>1?void 0:o?xe(i,s):i,a=r.length-1,n;a>=0;a--)(n=r[a])&&(t=(o?n(i,s,t):n(t))||t);return o&&t&&we(i,s,t),t};let l=class extends v{render(){return c`
      <h3>
        ${this.title}
        <bdo-icon .icon=${this.icon}></bdo-icon>
      </h3>
      <canvas-box-collection .items=${this.items||[]}></canvas-box-collection>
    `}static get styles(){return[y,ge,g`
        h3 {
          display: flex;
          justify-content: space-between;
          font-size: var(--font-size-base);
        }

        bdo-icon {
          font-size: var(--space-md);
          font-weight: 400;
        }
      `]}};h([m({type:String})],l.prototype,"title",2);h([m({type:String})],l.prototype,"icon",2);h([m({type:Array})],l.prototype,"items",2);l=h([ve("canvas-box")],l);const e={keyPartnerships:{title:"Key partnerships",icon:"mat-share",items:["Who are our key suppliers?","Which key resources are we acquiring from partners?","Which key activities our partners perform?",{head:"Motivation for partnerships"},["Optimization and economy","Reduction of risk and uncertainty","Acquisition of particular resources and activities"]]},keyActivities:{title:"Key activities",icon:"mat-check",items:["What key activities do our value propostions require?","Our distribution channels?","Customer relationships?","Revenue Streams?",{head:"Categories"},["Production","Problem solving","Platform / network"]]},valuePropositions:{title:"Value propositions",icon:"mat-featured_seasonal_and_gifts",items:["Which value do we deliver to the customer?","Which one of our customer's problems are we helping to solve?","What bundles of products and services are we offering to each customer segment?","Which customer needs are we satisfying",{head:"Characteristics"},["Newness","Performance","Customization",'"Getting Job Done"',"Design","Brand / status","Price","Cost Reduction","Risk Reduction","Accessibility","Convenience / usability"]]},customerRelationships:{title:"Customer relationships",icon:"mat-favorite",items:["What type of relationship each customer segment expects?","Which ones have we established?","How are they integrated with rest of the biz. model?","How much they cost us?",{head:"Examples"},["Personal assistance","Self-service","Automated services","Communities","Co-creation"]]},customerSegments:{title:"Customer segments",icon:"mat-group",items:["For whom are we creating value?","Who are our most important customers?",{head:"Examples"},["Mass market","Niche market","Segmented","Multi-sided platform"]]},keyResources:{title:"Key resources",icon:"mat-factory",items:["What key resources our value proposition requires?","Our distribution channels? Customer relationships?","Revenue Streams?",{head:"Types of resource"},["Physical","Intellectual (brand, patents, copyrights, data)","Human","Financial"]]},costStructure:{title:"Cost structure",icon:"mat-sell",items:["What are most important costs inherent to our business model?","Which key resources are most expensive?","Which key activities are most expensive?",{head:"Is your business more?"},["Cost driven (cost structure, low price prop, maximum automation, extensive outsourcing)","Value driven (focused on value creation, premium value prop)"]]},revenueStreams:{title:"Revenue streams",icon:"mat-payments",items:["For what value are our customers willing to pay?","What are they currently paying for?","How are they paying?","How would they prefer to pay?","How much each revenue stream contributes overall?"]},channels:{title:"Channels",icon:"mat-local_shipping",items:["Through which channels our customer segments want to be reached?","How are we reaching them now?","How are channels integrated?","Which ones work best?","Which ones are most cost efficient?","How are we integrating them with customer routines?"]}};var $e=Object.defineProperty,Se=Object.getOwnPropertyDescriptor,p=(r,i,s,o)=>{for(var t=o>1?void 0:o?Se(i,s):i,a=r.length-1,n;a>=0;a--)(n=r[a])&&(t=(o?n(i,s,t):n(t))||t);return o&&t&&$e(i,s,t),t};const ke="business-model-canvas";let d=class extends v{render(){var r,i,s,o,t,a,n,b,_,w,x,$,S,k,P,C,R,A,W,O,j,H,z,F,B,D,M,E,q,J,K,N,T,V,I,L,Y,G,U,Q,X,Z,ee,te,se,ie,re,oe,ae,ne,ce,me,le,de;return this.model instanceof fe?c`<div class="error">${this.model.message}</div>`:c` <div class="canvas-grid">
      <div class="canvas-grid__item">
        <canvas-box
          data-test-id="keyPartnerships"
          .items=${((i=(r=this.model)==null?void 0:r.keyPartnerships)==null?void 0:i.items)||e.keyPartnerships.items}
          .icon=${((o=(s=this.model)==null?void 0:s.keyPartnerships)==null?void 0:o.icon)||e.keyPartnerships.icon}
          .title=${((a=(t=this.model)==null?void 0:t.keyPartnerships)==null?void 0:a.title)||e.keyPartnerships.title}
        ></canvas-box>
      </div>
      <div class="canvas-grid__item">
        <canvas-box
          data-test-id="keyActivities"
          .items=${((b=(n=this.model)==null?void 0:n.keyActivities)==null?void 0:b.items)||e.keyActivities.items}
          .icon=${((w=(_=this.model)==null?void 0:_.keyActivities)==null?void 0:w.icon)||e.keyActivities.icon}
          .title=${(($=(x=this.model)==null?void 0:x.keyActivities)==null?void 0:$.title)||e.keyActivities.title}
        ></canvas-box>
      </div>
      <div class="canvas-grid__item">
        <canvas-box
          data-test-id="keyResources"
          .items=${((k=(S=this.model)==null?void 0:S.keyResources)==null?void 0:k.items)||e.keyResources.items}
          .icon=${((C=(P=this.model)==null?void 0:P.keyResources)==null?void 0:C.icon)||e.keyResources.icon}
          .title=${((A=(R=this.model)==null?void 0:R.keyResources)==null?void 0:A.title)||e.keyResources.title}
        ></canvas-box>
      </div>
      <div class="canvas-grid__item">
        <canvas-box
          data-test-id="valuePropositions"
          .items=${((O=(W=this.model)==null?void 0:W.valuePropositions)==null?void 0:O.items)||e.valuePropositions.items}
          .icon=${((H=(j=this.model)==null?void 0:j.valuePropositions)==null?void 0:H.icon)||e.valuePropositions.icon}
          .title=${((F=(z=this.model)==null?void 0:z.valuePropositions)==null?void 0:F.title)||e.valuePropositions.title}
        ></canvas-box>
      </div>
      <div class="canvas-grid__item">
        <canvas-box
          data-test-id="customerRelationships"
          .items=${((D=(B=this.model)==null?void 0:B.customerRelationships)==null?void 0:D.items)||e.customerRelationships.items}
          .icon=${((E=(M=this.model)==null?void 0:M.customerRelationships)==null?void 0:E.icon)||e.customerRelationships.icon}
          .title=${((J=(q=this.model)==null?void 0:q.customerRelationships)==null?void 0:J.title)||e.customerRelationships.title}
        ></canvas-box>
      </div>
      <div class="canvas-grid__item">
        <canvas-box
          data-test-id="customerSegments"
          .items=${((N=(K=this.model)==null?void 0:K.customerSegments)==null?void 0:N.items)||e.customerSegments.items}
          .icon=${((V=(T=this.model)==null?void 0:T.customerSegments)==null?void 0:V.icon)||e.customerSegments.icon}
          .title=${((L=(I=this.model)==null?void 0:I.customerSegments)==null?void 0:L.title)||e.customerSegments.title}
        ></canvas-box>
      </div>
      <div class="canvas-grid__item">
        <canvas-box
          data-test-id="channels"
          .items=${((G=(Y=this.model)==null?void 0:Y.channels)==null?void 0:G.items)||e.channels.items}
          .icon=${((Q=(U=this.model)==null?void 0:U.channels)==null?void 0:Q.icon)||e.channels.icon}
          .title=${((Z=(X=this.model)==null?void 0:X.channels)==null?void 0:Z.title)||e.channels.title}
        ></canvas-box>
      </div>
      <div class="canvas-grid__item">
        <canvas-box
          data-test-id="costStructure"
          .items=${((te=(ee=this.model)==null?void 0:ee.costStructure)==null?void 0:te.items)||e.costStructure.items}
          .icon=${((ie=(se=this.model)==null?void 0:se.costStructure)==null?void 0:ie.icon)||e.costStructure.icon}
          .title=${((oe=(re=this.model)==null?void 0:re.costStructure)==null?void 0:oe.title)||e.costStructure.title}
        ></canvas-box>
      </div>
      <div class="canvas-grid__item">
        <canvas-box
          data-test-id="revenueStreams"
          .items=${((ne=(ae=this.model)==null?void 0:ae.revenueStreams)==null?void 0:ne.items)||e.revenueStreams.items}
          .icon=${((me=(ce=this.model)==null?void 0:ce.revenueStreams)==null?void 0:me.icon)||e.revenueStreams.icon}
          .title=${((de=(le=this.model)==null?void 0:le.revenueStreams)==null?void 0:de.title)||e.revenueStreams.title}
        ></canvas-box>
      </div>
    </div>`}async update(r){if(r.has("src"))if(!this.src)this.model=e;else try{this.model=await be(this.src)}catch(i){this.model=i}r.has("json")&&(this.model=JSON.parse(this.json)),super.update(r)}static get styles(){return[y,g`
        .canvas-grid {
          width: 100%;
          display: grid;
          grid-gap: var(--line-base);
          background-color: var(--color-brand-a40);
          grid-template-columns: repeat(1, 1fr);
          border: var(--line-base) solid var(--color-brand-a40);
          margin-top: var(--space-md);
        }

        .canvas-grid__item {
          background-color: #ffffff;
          padding: var(--space-xs);
        }

        @media (min-width: 768px) {
          .canvas-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .canvas-grid__item:nth-child(3) {
            grid-column: auto / span 2;
          }
        }

        @media (min-width: 1200px) {
          .canvas-grid {
            grid-template-columns: repeat(6, 1fr);
          }

          .canvas-grid__item {
            grid-column: auto / span 2;
          }
        }

        @media (min-width: 1400px) {
          .canvas-grid {
            grid-template-columns: repeat(10, 1fr);
          }

          .canvas-grid__item {
            grid-column: auto / span 2;
            background-color: #ffffff;
            padding: var(--space-xs);
          }

          .canvas-grid__item:nth-child(3) {
            grid-column-start: 3;
          }

          .canvas-grid__item:nth-child(4) {
            grid-row: 1 / span 2;
            grid-column-start: 5;
          }

          .canvas-grid__item:nth-child(5) {
            grid-row-start: 1;
            grid-column-start: 7;
          }

          .canvas-grid__item:nth-child(6) {
            grid-row: 1 / span 2;
            grid-column-start: 9;
          }

          .canvas-grid__item:nth-child(1) {
            grid-row: auto / span 2;
          }

          .canvas-grid__item:nth-child(8),
          .canvas-grid__item:nth-child(9) {
            grid-column: auto / span 5;
          }
        }
      `]}};p([m({type:Object})],d.prototype,"model",2);p([m({attribute:"src"})],d.prototype,"src",2);p([m({attribute:"data-json"})],d.prototype,"json",2);d=p([ve(ke)],d);const De={title:"Viewers/BusinessModelCanvas",component:"business-model-canvas",parameters:{layout:"padded"},argTypes:{src:{control:"text",description:"URL to fetch YAML data from"}},render:r=>c`
    <business-model-canvas
      src=${r.src}
    ></business-model-canvas>
  `},u={args:{src:"business-model-canvas.yml"}};var ue,he,pe;u.parameters={...u.parameters,docs:{...(ue=u.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  args: {
    src: 'business-model-canvas.yml'
  }
}`,...(pe=(he=u.parameters)==null?void 0:he.docs)==null?void 0:pe.source}}};const Me=["FromSource"];export{u as FromSource,Me as __namedExportsOrder,De as default};
