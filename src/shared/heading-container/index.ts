import { html, LitElement,  } from "lit";
import { customElement, state } from "lit/decorators.js";

import resetCss from "../styles/reset.css";
import headingContainerCss from "./heading-container.css";
import { ifDefined } from "lit/directives/if-defined.js";

@customElement("bdo-heading-container")
export class BdoHeadingContainer extends LitElement {
    @state()
    headingLevel?: number;

    @state()
    headingExpanded?: boolean;

    header!: HTMLElement;
    content!: HTMLElement;

    override render() {
        return html`
            <div class="header">
                <slot name="header"></slot>
            </div>
            <div class="content" aria-hidden=${ifDefined(!this.headingExpanded)}>
                <slot></slot>
            </div>
        `;
    }

    // trigger toggle expanded act on first render
    protected override firstUpdated() {
        this.headingLevel = this.getHeadingLevel();
        this.header =  this.shadowRoot?.querySelector('.header') as HTMLElement;
        this.content = this.shadowRoot?.querySelector('.content') as HTMLElement;

        this.setAttribute('level', `${this.headingLevel}`);

        if (!this.headingLevel || this.headingLevel < 3) {
            return;
        }

        this.header.tabIndex = 0;
        this.header.addEventListener('click', () => this.toggleExpanded());
        this.header.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                this.toggleExpanded();
            }
        });

        this.toggleExpanded(false);
    }

    private toggleExpanded(open?: boolean) {
        if (!this.headingLevel || this.headingLevel < 3) {
            return;
        }

        if (open !== undefined) {
            this.headingExpanded = open;
        }
        else {
            this.headingExpanded = !this.headingExpanded
        }

        this.header.setAttribute('aria-expanded', `${this.headingExpanded}`);
    }

    private getHeadingLevel(): number | undefined {
        const headerSlot = this.shadowRoot?.querySelector('slot[name="header"]') as HTMLSlotElement;
        for (const node of headerSlot.assignedNodes({ flatten: true })) {
            const level = this.extractHeadingLevelFromTagName(node.nodeName);
            if (level === undefined) {
                continue;
            }

            return level;
        }

        return undefined;
    }

    private extractHeadingLevelFromTagName(tagName: string): number | undefined {
        const regex = /^[hH]([1-6])$/;
        const match = tagName.match(regex);

        if (match) {
            return parseInt(match[1], 10);
        }
        else {
            return undefined;
        }
    }

    static override get styles() {
        return [resetCss, headingContainerCss];
    }
}