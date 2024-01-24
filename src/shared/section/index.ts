import { LitElement, html } from 'lit';
import sectionCss from './section.css';
import { customElement, property } from 'lit/decorators.js';
import { ArrowDirection } from '../../business-reference-architecture/models';

@customElement("bdo-section")
export class Section extends LitElement {
    @property()
    arrow!: ArrowDirection;
    
    override render() {
        return html`
            <div class="arrow arrow-${this.arrow}">
                <slot name="arrow"></slot>
            </div>
            <slot name="heading"></slot>
            <slot></slot>
        `;
    }

    static override get styles() {
        return sectionCss;
    }
}