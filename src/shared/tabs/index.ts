import { LitElement, html, css, PropertyValueMap } from "lit";
import { customElement, property, state, queryAssignedElements } from "lit/decorators.js";

export const tag = "bdo-tabs";

@customElement(tag)
export class MyTabs extends LitElement {
  @property({ type: Number }) selectedIndex = 0;
  @state() private _tabTitles: string[] = [];
  @queryAssignedElements({ selector: "bdo-tab" }) private _tabs!: HTMLElement[];

  override render() {
    return html`
      <div class="tabs-header" role="tablist" aria-label="Tab Panel">
        ${this._tabTitles.map(
          (title, index) => html`
            <button
              class="tab-title ${index === this.selectedIndex ? "selected" : ""}"
              @click=${() => this._handleTabClick(index)}
              role="tab"
              aria-selected="${index === this.selectedIndex ? "true" : "false"}"
              aria-controls="tabpanel-${index}"
              id="tab-${index}"
            >
              ${title}
            </button>
          `
        )}
      </div>
      <div class="tabs-content">
        <slot @slotchange=${this._updateTabTitles} role="presentation"></slot>
      </div>
    `;
  }

  override firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this._updateTabTitles();
    this._updateSelectedTab();
  }

  override updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if(changedProperties.has("selectedIndex")){
      this._updateSelectedTab();
    }
  }

  private _updateTabTitles() {
    this._tabTitles = this._tabs.map((tab) => tab.getAttribute("title") || "Tab");
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

  private _handleTabClick(index: number) {
    this.selectedIndex = index;
    this.dispatchEvent(new CustomEvent("tab-selected", { detail: { index } }));
  }

  static override get styles() {
    return css`
        :host {
        display: block;
        }

        .tabs-header {
        display: flex;
        border-bottom: 1px solid #ccc;
        }

        .tab-title {
        padding: 10px 15px;
        cursor: pointer;
        border: none;
        background: none;
        border-bottom: 2px solid transparent;
        }

        .tab-title.selected {
        border-bottom: 2px solid blue;
        }

        .tabs-content {
        padding: 15px;
        }

        ::slotted(bdo-tab) {
        display: none;
        }

        ::slotted(bdo-tab.selected) {
        display: block;
        }
    `;
  };
}