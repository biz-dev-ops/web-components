import { CSSResult, CSSResultArray, LitElement, TemplateResult, html } from "lit";
import { property } from "lit/decorators.js";
import useCaseVieweCss from "./use-case-viewer.css";
import "../shared/badge";
import "../shared/expansion-panel";
import "../shared/truncate";
import "../model-viewer";
import { Case, UseCase, UseCaseType } from "./models";
import Util from "../shared/util";

export abstract class UseCaseViewer<T extends UseCase> extends LitElement {
    @property({ type: Object })
    model!: T

    @property({ attribute: "model-json" })
    modelJson!: string

    abstract useCaseType: UseCaseType;

    override render() {
        return html`
            <section>
                <header>
                    <bdo-badge type=${this.useCaseType?.type} icon=${this.useCaseType?.icon}>${this.useCaseType?.name}</bdo-badge>
                    ${Util.titlelize(this.model?.name)}
                </header>

                <main>
                    ${this.descriptionTemplate(this.model?.description)}
                    ${this.renderMain()}
                </main>
            </section>
        `;
    }

    abstract renderMain() :TemplateResult;

    descriptionTemplate(description:string) {
        if(!description) {
            return html``;
        }

        //TODO: render markdown?

        return html`
            <bdo-truncate>
                ${description}
            </bdo-truncate>
        `;
    }

    modelViewerTemplate(title: string, parameters:any) {
        if(!parameters) {
            return html``;
        }

        return html`
            <bdo-expansion-panel>
                <div slot="summary">${title}</div>
                <model-viewer .model=${parameters}></model-viewer>
            </bdo-expansion-panel>
        `;
    }

    casesTemplate(title: string, cases: Map<string, Case>) {
        if(!cases) {
            return html``;
        }

        return html`
            <bdo-expansion-panel>
                <div slot="summary">${Util.titlelize(title)} <span class="count">(${this.countItems(cases)})</span></div>
                
                <div class="cases">
                    ${Object.entries(cases).map(([key, c]) => html`
                        <div class="case">
                            <h2>${Util.titlelize(c?.name || key)}</h2>
                            ${this.descriptionTemplate(c?.description)}
                            ${this.modelViewerTemplate("Parameters", c?.parameters)}
                        </div>
                    `)}
                </div>
            </bdo-expansion-panel>
        `;
    }

    countItems(item: any) {
        if (!item) {
            return 0;
        }

        if(item.properties) {
            return Object.keys(item.properties).length;
        }

        if (Array.isArray(item)) {
            return item.length;
        }

        return Object.keys(item).length;;
    }

    override update(changedProperties: Map<string, unknown>) {
        if (changedProperties.has("modelJson")) {
            try {
                this.model = JSON.parse(this.modelJson);
            } 
            catch (e) {
                console.error("Error parsing modelJson:", e);
            }
        }
        super.update(changedProperties);
    }

    static override get styles() : CSSResult | CSSResultArray {
        return useCaseVieweCss;
    }
}