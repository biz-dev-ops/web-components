import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import resetCss from "../styles/reset.css";
import alertCss from "./alert.css";

import "../icon";

@customElement("bdo-alert")
export class BdoAlert extends LitElement {
    @property({ type: String })
    type: "info" | "warning" | "error" = "info";

    override render() {
        return html`
            <div class="alert ${this.type ? `alert--${this.type}` : ``}" role="alert">
                <bdo-icon icon="${getIcon(this.type)}"></bdo-icon>
                <div class="alert__message">
                    <slot></slot>
                </div>
            </div>
        `;

        function getIcon(type: string) : string {
            switch (type) {
                case "warning":
                    return "mat-warning";
                case "error":
                    return "mat-error";
                default:
                    return "mat-info";
            }
        }
    }

    static override get styles() {
        return [resetCss, alertCss];
    }
}