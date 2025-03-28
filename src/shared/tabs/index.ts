import { LitElement, html, css, PropertyValueMap } from "lit";
import { customElement, property, state, queryAssignedElements } from "lit/decorators.js";
import "./tab";

export const tag = "bdo-tabs";

@customElement(tag)
export class BdoTabs extends LitElement {
  @property({ type: Number }) selectedIndex = 0;
  @property({ type: String }) label!: string;
  @state() private _tabsData: {title, id}[] = [];
  @queryAssignedElements({ selector: "bdo-tab" }) private _tabs!: HTMLElement[];

  override render() {
    return html`
      <div class="tabs--list" role="tablist" .ariaLabel="${this.label}">
        ${this._tabsData.map(
          ({title, id}, index) => html`
            <a
              href="#tabpanel-${id}"
              class="tab ${index === this.selectedIndex ? "selected" : ""}"
              @click=${(event) => this._handleTabClick(event, index)}
              role="tab"
              aria-selected="${index === this.selectedIndex ? "true" : "false"}"
              aria-controls="tabpanel-${id}"
              id="tab-${id}"
            >
              ${title}
            </a>
          `
        )}
      </div>
      <div class="tabs--panels">
        <slot @slotchange=${this._updateTabData} role="presentation"></slot>
      </div>
    `;
  }

  override firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this._updateTabData();
    this._updateSelectedTab();
  }

  override updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if(changedProperties.has("selectedIndex")){
      this._updateSelectedTab();
    }
  }

  private _updateTabData() {
    this._tabsData = this._tabs.map((tab) => {
      return { title: tab.getAttribute("title"), id: tab.id }
    });
  }

  private _updateSelectedTab() {
    this._tabs.forEach((tab, index) => {
      if (index === this.selectedIndex) {
        tab.classList.add("selected");
        tab.setAttribute("aria-hidden", "false");
      }
      else {
        tab.classList.remove("selected");
        tab.setAttribute("aria-hidden", "true");
      }
    });
  }

  private _handleTabClick(event: Event, index: number) {
    event.preventDefault();
    this.selectedIndex = index;
    this.dispatchEvent(new CustomEvent("tab-selected", { detail: { index } }));
  }

  static override get styles() {
    return css`
      :host {
        display: block;
      }

      .tabs--list {
        background-color: var(--color-white);
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-xs) var(--space-sm);
        justify-content: flex-start;
        list-style: none;
        padding-left: 0;
        max-width: none;
      }

      .tab {
        border-bottom: var(--line-thin) solid var(--color-black-a10);
        color: currentcolor;
        display: block;
        padding: var(--space-xs) var(--space-sm);
        text-decoration: none;
      }

      .tab:hover,
      .tab:focus {
        border-bottom-color: var(--link-text-color);
      }

      .tab[aria-selected="true"] {
        border-bottom-color: currentcolor;
        color: var(--link-text-color);
        font-weight: 600;
      }

      ::slotted(bdo-tab) {
        display: none;
      }

      ::slotted(bdo-tab[aria-hidden="false"]) {
        display: block;
      }
    `;
  };
}