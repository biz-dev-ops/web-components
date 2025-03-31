import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import resetCss from "../styles/reset.css";
import headingContainerCss from "./heading-container.css";
@customElement("bdo-heading-container")
export class BdoHeadingContainer extends LitElement {
    @property({ type: Number, attribute: "heading-level" })
    headingLevel = 1;

    heading!: HTMLElement | undefined;
    content!: HTMLElement;

    private handleHeaderClick() {
        this.toggleExpanded();
    }

    private toggleExpanded(open?: boolean) {
        let isExpanded = this.heading?.getAttribute('aria-expanded') === 'true';

        if (open !== undefined) {
             isExpanded = !open;
        }

        this.heading?.setAttribute('aria-expanded', open ? String(open) : String(!isExpanded));
        this.content.style.display = isExpanded ? 'none' : 'block';
    }

    // trigger toggle expanded act on first render
    protected override firstUpdated() {
        const headerSlot = this.shadowRoot?.querySelector('slot[name="header"]') as HTMLSlotElement;
        const headerNodes = headerSlot.assignedNodes({ flatten: true });
        this.heading = headerNodes.find(node => node.nodeType === Node.ELEMENT_NODE && ((node as HTMLElement).tagName === "H3" || (node as HTMLElement).tagName === "H4")) as HTMLElement | undefined;
        this.content = this.shadowRoot?.querySelector('.content') as HTMLSlotElement;
        
        // Add interaction handling to heading
        if (this.headingLevel > 2 && this.heading) {
            this.heading.tabIndex = 0;
            this.heading.addEventListener('click', (event) => this.handleHeaderClick());
            this.heading.addEventListener('keydown', (event: KeyboardEvent) => {
                if (event.key === 'Enter') {
                    this.handleHeaderClick();
                }
            });
        }

        // Set initial aria-expanded state
        if (this.headingLevel >= 3) {
            this.toggleExpanded(false);
        }
    }

    override render() {
        return html`
            <div class="header">
                <slot name="header"></slot>
            </div>
            <div class="content">
                <slot></slot>
            </div>
        `;
    }

    static override get styles() {
        return [resetCss, headingContainerCss];
    }
}