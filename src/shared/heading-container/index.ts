import { html, LitElement, } from "lit";
import { customElement, eventOptions } from "lit/decorators.js";

import resetCss from "../styles/reset.css";
import headingContainerCss from "./heading-container.css";

@customElement("bdo-heading-container")
export class BdoHeadingContainer extends LitElement {

    override render() {
        return html`
            <div class="header" data-testid="header-container" @click=${this.toggleExpanded} @keydown=${this.handleKeydown}>
                <slot name="header"></slot>
            </div>
            <div class="content" data-testid="content-container">
                <slot></slot>
            </div>
        `;
    }

    protected override firstUpdated() {
        const headingLevel = this.getHeadingLevel();
        this.setAttribute("level", `${headingLevel}`);
        const headerContainer = this.renderRoot.querySelector("[data-testid='header-container']") as HTMLElement;

        if(this.getAttribute("aria-expanded") === undefined) {
            return;
        }

        headerContainer.tabIndex = 0;
    }

    @eventOptions({ passive: true })
    private handleKeydown(event: KeyboardEvent) {
        if (event.key === "Enter") {
            this.toggleExpanded();
        }
    }

    @eventOptions({ passive: true })
    private toggleExpanded() {
        const ariaExpanded = this.ariaIsExpanded();
        if (ariaExpanded === undefined) {
            return;
        }

        this.setAttribute("aria-expanded", `${!ariaExpanded}`);
    }

    private ariaIsExpanded(): boolean | undefined {
        const ariaExpanded = this.getAttribute("aria-expanded")?.trim().toLowerCase();
        
        if (ariaExpanded === undefined) {
            return undefined;
        }

        if (ariaExpanded === "false") {
            return false
        }

        return true;
    }

    private getHeadingLevel(): number | undefined {
        const headerSlot = this.renderRoot.querySelector("slot[name='header']") as HTMLSlotElement;
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