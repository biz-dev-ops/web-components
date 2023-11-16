import { html, css, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import resetStyles from '../general/styles/reset';
import { Collection, Head, Model, ModelItem, Text } from './modules/models/model';

// Icons from https://www.svgrepo.com/collection/solar-linear-icons/
const chair = require('./icons/chair.svg');
const checkSquare = require('./icons/check-square.svg');
const gift = require('./icons/gift.svg');
const heart = require('./icons/heart.svg');
const link = require('./icons/link.svg');
const moneyBag = require('./icons/money-bag.svg');
const tag = require('./icons/tag.svg');
const tram = require('./icons/tram.svg');
const users = require('./icons/users.svg');

@customElement('business-model-canvas')
export class BusinessModelCanvasComponent extends LitElement {
  @property()
  model!: Model

  @property({ attribute: "model-json" })
  modelJson!: string

  icons: any = {
    chair: chair,
    checkSquare: checkSquare,
    gift: gift,
    heart: heart,
    link: link,
    moneyBag: moneyBag,
    tag: tag,
    tram: tram,
    users: users
  }

  override render() {
    return html`  
    <table cellspacing="0">
      <tr>
        <th class="key-partnerships" colspan="2">${this.blockTitleTemplate('Key Partnerships', this.icons.link)}</th>
        <th class="key-activities" colspan="2">${this.blockTitleTemplate('Key Activities', this.icons.checkSquare)}</th>
        <th class="value-propositions" colspan="2">${this.blockTitleTemplate('Value Propositions', this.icons.gift)}</th>
        <th class="customer-relationships" colspan="2"">${this.blockTitleTemplate('Customer Relationships', this.icons.heart)}</th>
        <th class="customer-segments" colspan="2">${this.blockTitleTemplate('Customer Segments', this.icons.users)}</th>
      <tr>
      <tr>
        <td colspan="2" rowspan="3">
          ${this.keyPartnershipsTemplate()}
        </td>
        <td colspan="2" rowspan="1">
          ${this.keyActivitiesTemplate()}
        </td>
        <td colspan="2" rowspan="3">
          ${this.valuePropositionsTemplate()}
        </td>
        <td colspan="2" rowspan="1">
          ${this.customerRelationshipTemplate()}
        </td>
        <td colspan="2" rowspan="3">
          ${this.customerSegmentsTemplate()}
        </td>
      </tr>
      <tr>
        <th class="key-resources" colspan="2">${this.blockTitleTemplate('Key Resources', this.icons.chair)}</th>
        <th class="channels" colspan="2">${this.blockTitleTemplate('Channels', this.icons.tram)}</th>
      </tr>
      <tr>
        <td colspan="2">
          ${this.keyResourcesTemplate()}
        </td>
        <td colspan="2">
          ${this.channelsTemplate()}
        </td>
      </tr>
      <tr>
      </tr>
        <th class="cost-structure" colspan="5">${this.blockTitleTemplate('Cost Structure', this.icons.moneyBag)}</th>
        <th class="revenue-streams" colspan="5">${this.blockTitleTemplate('Revenue Streams', this.icons.tag)}</th>
      </tr>
      <tr>
        <td colspan="5">
         ${this.costStructureTemplate()}
        </td>
        <td colspan="5">
          ${this.revenueStreamsTemplate()}
        </td>
      </tr>
    </table>`;
  }

  override update(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("modelJson")) {
      this.model = JSON.parse(this.modelJson);
    }

    super.update(changedProperties);
  }

  blockTitleTemplate(title: string, icon: string): TemplateResult {
    return html`
      <span class="block-title" title="${icon}">
          ${title}
          ${unsafeHTML(icon)}
      </span>
    `;
  }

  collectionTemplate(collection: ModelItem[]): TemplateResult | TemplateResult[] {
    return collection.map(item => {
      if((item as Collection).items) {
        return html`<ul>${(item as Collection).items.map(i => html`<li>${i}</li>`)}</ul>`;
      }
      else if (Array.isArray(item)) {
        return html`<ul>${item.map(i => html`<li>${i}</li>`)}</ul>`;
      }
      else if((item as Text).text){
        return html`<p>${(item as Text).text}</p>`;
      }
      else if((item as Head).head){
        return html`<h1>${(item as Head).head}</h1>`;
      }
      else {
        return html`<p>${item}</p>`;
      }
    });
  }

  keyPartnershipsTemplate(): TemplateResult | TemplateResult[] {
    if (this.model?.keyPartnerships) {
      return this.collectionTemplate(this.model.keyPartnerships);
    }
    else {
      return html`
        <p>Who are our key suppliers?</p>
        <p>Which key resources are we acquiring from partners?</p>
        <p>Which key activities our partners perform?</p>
        <p><strong>Motivation for partnerships</strong></p>
        <ul>
          <li>Optimization and economy</li>
          <li>Reduction of risk and uncertainty</li>
          <li>Acquisition of particular resources and activities</li>
        </ul>`;
    }
  }

  keyActivitiesTemplate(): TemplateResult | TemplateResult[] {
    if (this.model?.keyActivities) {
      return this.collectionTemplate(this.model.keyActivities);
    }
    else {
      return html`
      <p>What key activities do our value propostions require?</p>
      <p>Our distribution channels?</p>
      <p>Customer relationships?</p>
      <p>Revenue Streams?</p>
      <p><strong>Categories</strong></p>
      <ul>
        <li>Production</li>
        <li>Problem Solving</li>
        <li>Platform/Network</li>
      </ul>`;
    }
  }

  valuePropositionsTemplate(): TemplateResult | TemplateResult[] {
    if (this.model?.valuePropositions) {
      return this.collectionTemplate(this.model.valuePropositions);
    }
    else {
      return html`
      <p>Which value do we deliver to the customer?</p>
      <p>Which one of our customer's problems are we helping to solve?</p>
      <p>What bundles of products and services are we offering to each customer segment?</p>
      <p>Which customer needs are we satisfying?</p>
      <p><strong>Characteristics</strong></p>
      <ul>
        <li>Newness</li>
        <li>Performance</li>
        <li>Customization</li>
        <li>"Getting Job Done"</li>
        <li>Design</li>
        <li>Brand/Status</li>
        <li>Price</li>
        <li>Cost Reduction</li>
        <li>Risk Reduction</li>
        <li>Accessibility</li>
        <li>Convenience/Usability</li>
      </ul>`;
    }
  }

  customerRelationshipTemplate(): TemplateResult | TemplateResult[] {
    if (this.model?.customerRelationships) {
      return this.collectionTemplate(this.model.customerRelationships);
    }
    else {
      return html`
      <p>What type of relationship each customer segment expects?</p>
      <p>Which ones have we established?</p>
      <p>How are they integrated with rest of the biz. model?</p>
      <p>How much they cost us?</p>
      <p><strong>Examples</strong></p>
      <ul>
        <li>Personal assistance</li>
        <li>Self-service</li>
        <li>Automated services</li>
        <li>Communities</li>
        <li>Co-creation</li>
      </ul>`;
    }
  }

  customerSegmentsTemplate(): TemplateResult | TemplateResult[] {
    if (this.model?.customerSegments) {
      return this.collectionTemplate(this.model.customerSegments);
    }
    else {
      return html`
      <p>For whom are we creating value?</p>
      <p>Who are our most important customers?</p>
      <p><strong>Examples</strong></p>
      <ul>
        <li>Mass market</li>
        <li>Niche market</li>
        <li>Segmented</li>
        <li>Diversified</li>
        <li>Multi-sided platform</li>
      </ul>`;
    }
  }

  keyResourcesTemplate(): TemplateResult | TemplateResult[] {
    if (this.model?.keyResources) {
      return this.collectionTemplate(this.model.keyResources);
    }
    else {
      return html`
      <p>What key resources our value proposition requires?</p>
      <p>Our distribution channels? Customer relationships?</p>
      <p>Revenue Streams?</p>
      <p><strong>Types of resources</strong></p>
      <ul> 
        <li>Physical</li>
        <li>Intellectual (brand, patents, copyrights, data)</li>
        <li>Human</li>
        <li>Financial</li>
      </ul>`;
    }
  }

  channelsTemplate(): TemplateResult | TemplateResult[] {
    if (this.model?.channels) {
      return this.collectionTemplate(this.model.channels);
    }
    else {
      return html`
      <p>Through which channels our customer segments want to be reached?</p>
      <p>How are we reaching them now?</p>
      <p>How are channels integrated?</p>
      <p>Which ones work best?</p>
      <p>Which ones are most cost efficient?</p>
      <p>How are we integrating them with customer routines?</p>`;
    }
  }

  costStructureTemplate(): TemplateResult | TemplateResult[] {
    if (this.model?.costStructure) {
      return this.collectionTemplate(this.model.costStructure);
    }
    else {
      return html`
      <p>What are most important costs inherent to our business model?</p>
      <p>Which key resources are most expensive?</p>
      <p>Which key activities are most expensive?</p>
      <p><strong>Is your business more?</strong></p>
      <p>Cost driven (cost structure, low price prop, maximum automation, extensive outsourcing)</p>
      <p>Value driven (focused on value creation, premium value prop)</p>`;
    }
  }

  revenueStreamsTemplate(): TemplateResult | TemplateResult[] {
    if (this.model?.revenueStreams) {
      return this.collectionTemplate(this.model.revenueStreams);
    }
    else {
      return html`
      <p>For what value are our customers willing to pay?</p>
      <p>What are they currently paying for?</p>
      <p>How are they paying?</p>
      <p>How would they prefer to pay?</p>
      <p>How much each revenue stream contributes overall?</p>`;
    }
  }

  static override get styles() {
    const styles = css`
    :root {font-family: 'Headland One', serif;}

    table {
      border: none;
      border: var(--line-base) solid var(--color-brand-a40);
      border-radius: var(--radius-base);
      width: 100%;
    }

    th {
      border: none;
      border-top: var(--line-base) solid var(--color-brand-a40);
      border-left: var(--line-base) solid var(--color-brand-a40);
      font-weight: 700;
      font-size: 1em;
      text-align: left;
      padding: var(--space-xs);
    }

    th svg {
      inline-size: var(--space-md);
      block-size: var(--space-md);
      aspect-ratio: 1;
      display: inline-flex;
      align-self: end;
    }

    td {
      border: none;
      border-left: var(--line-base) solid var(--color-brand-a40);
      vertical-align: top;
      height: 200px;
      width: 200px;
      padding: var(--space-xs);
    }

    p,li,h1 {
      font-weight: 300;
      font-size: 0.8em;
    }

    h1 {
      font-weight: 600;
    }

    .block-title {
      display: flex;
      justify-content: space-between;
    }
    `;

    return [resetStyles, styles];
  }
}