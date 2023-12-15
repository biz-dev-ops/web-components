import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import commandViewerCss from "./command-viewer.css";
import "../shared/badge";
import "../shared/expansion-panel";
import "../shared/truncate";

@customElement('command-viewer')
export class CommandViewer extends LitElement {
    override render() {
        return html`
            <section>
                <header>
                    <bdo-badge type="command" icon="command">Command</bdo-badge>
                    <slot name="title"></slot>
                </header>

                <main>
                    <slot></slot>
                    <bdo-expansion-panel>
                        <div slot="summary">Command parameters <span class="count">(12)</span></div>
                        {{MODEL-VIEWER}}
                    </bdo-expansion-panel>

                    <bdo-expansion-panel open>
                        <div slot="summary">Uitzonderingen <span class="count">(12)</span></div>
                        
                        <div class="cases">
                            <div class="case">
                                <h2>Niet gevonden</h2>
                                <bdo-truncate>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus suscipit quam odio, quis porta lacus feugiat eget. Duis nunc felis, sodales ut tortor sit amet, fringilla aliquam ex. Praesent quis sagittis ex. Cras fringilla diam tortor, in suscipit neque tempor a. In ultrices turpis vel purus commodo, et venenatis velit consectetur. Cras varius lacus in risus accumsan interdum. Aliquam at euismod dolor. Pellentesque congue tristique eros.</p>
                                    <p>Donec sit amet est sit amet ex elementum laoreet. Donec vestibulum commodo condimentum. Proin accumsan tempus posuere. Suspendisse sodales est congue diam consequat, ac molestie nisi tincidunt. Integer vitae justo et justo fringilla cursus non vehicula nunc. Praesent pellentesque nisl vel risus interdum tempus. Suspendisse eget risus sit amet augue rhoncus egestas sit amet accumsan arcu. Aliquam at erat eu justo vulputate accumsan. Integer enim neque, elementum ac orci quis, mollis varius eros. Vestibulum vel ligula quam.</p>
                                    <p>Mauris vel viverra enim, in tempor erat. Nunc elit velit, cursus non mattis a, varius non lorem. In laoreet odio diam, in molestie nulla fermentum ut. Aliquam erat volutpat. Proin sed maximus sem. Integer et magna nisi. Vivamus vulputate consectetur sem, vitae faucibus metus ultricies id.</p>
                                    <p>Cras fermentum ullamcorper vestibulum. Maecenas non leo accumsan, mattis risus nec, dignissim lacus. Donec vestibulum et erat eget malesuada. Donec elementum varius iaculis. Nunc facilisis ligula massa, a vestibulum ligula commodo ac. Nam turpis ipsum, efficitur sit amet leo ac, dignissim ullamcorper libero. Nam et diam vitae est viverra efficitur imperdiet ac nisi.</p>
                                    <p>Aliquam pharetra elementum blandit. Vivamus sed ligula consequat, ultrices nibh ut, sodales est. Proin consectetur orci sapien, ac venenatis augue accumsan sed. Nulla facilisi. Duis luctus ante eu nulla tincidunt tristique. Nam ut odio risus. Nullam gravida, dolor eu tincidunt pharetra, mauris felis lacinia nisi, suscipit condimentum dolor tortor nec metus. Pellentesque et rhoncus ex, vel aliquam sem.</p>
                                </bdo-truncate>
                            </div>

                            <div class="case">
                                <h2>Niet geauthenticeerd</h2>
                                <bdo-truncate>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </bdo-truncate>
                            </div>
                        </div>
                    </bdo-expansion-panel>
                </main>
            </section>
        `;
    }

    static override get styles() {
        return commandViewerCss;
    }
}