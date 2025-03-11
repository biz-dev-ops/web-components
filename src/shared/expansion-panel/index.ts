import { LitElement, html } from "lit";
import { customElement, property, queryAssignedNodes } from "lit/decorators.js";
import resetCss from '../styles/reset.css';
import expansionPanelCss from './expansion-panel.css';

@customElement('bdo-expansion-panel')
export class BdoExpansionPanel extends LitElement {
    @property({ type: Boolean })
    open!: boolean;

    @queryAssignedNodes({slot: 'summary', flatten: false})
    _summaryNodes!: Array<Node>;

    override render() {
        return html`
            <details ?open="${this.open}">
                <summary><slot name="summary"></slot></summary>
                <div class="panel">
                    <slot></slot>
                </div>
            </details>
        `;
    }

    static override get styles() {
        return [resetCss, expansionPanelCss];
    }
}
