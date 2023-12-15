import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import iconCss from './icon.css';
import { commandIcon } from './icons';

@customElement('bdo-icon')
export class BdoIcon extends LitElement {
    @property({ type: String })
    icon!: string;
        
    override render() {
        return commandIcon;
    }

    static override get styles() {
        return iconCss;
    }
}