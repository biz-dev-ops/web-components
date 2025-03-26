import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ButtonType, Button } from "../models";

import "./arrow-button";
import "./default-button";
import "./inverted-button";
import "./icon-circle-button";

@customElement("architecture-button")
export class ArchitectureButton extends LitElement {
    @property()
    buttonType!: ButtonType;

    @property({ type: Object })
    button!: Button;

    override render() {
        switch(this.buttonType) {
            case "brand":
                return html`<default-architecture-button .button=${this.button} />`;
            case "stream":
                return html`<arrow-architecture-button .button=${this.button} />`;
            case "default":
                return html`<inverted-architecture-button .button=${this.button} />`;
            default:
                return html`<icon-circle-architecture-button .button=${this.button} />`;
        }
    }
}
