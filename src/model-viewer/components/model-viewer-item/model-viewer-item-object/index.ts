import { customElement } from "lit/decorators.js";
import { TemplateResult, html } from "lit";
import { ItemSelected } from "../../../models";

import "../../../../shared/button";
import { ModelViewerItem } from "..";
import { titlelize } from "../../../../shared/util";
import { ModelItemDecorator, ModelItemDecoratorBuilder } from "../../../modules/model-item-decorator-builder";

@customElement('model-viewer-item-object')
export class ModelViewerItemObject extends ModelViewerItem {

    override render() {
        return html`
            <div class="item item--object">
                <bdo-button type="button" direction="right" @clicked=${this._handleItemSelection}>
                    <span class="txt--property">
                        ${titlelize(this.title)}
                        ${this.required ? html`<span class="txt--required">*</span>` : ``}
                    </span>
                </bdo-button>
            </div>
        `;
    }

    public static async build(decorated: ModelItemDecorator, _builder: ModelItemDecoratorBuilder, itemSelectedDelegate: (event: CustomEvent<ItemSelected>) => void, root: boolean): Promise<TemplateResult> {
        if (!isRootObject(decorated, root))
            return html``;

        return html`
            <model-viewer-item-object
                aria-label="model-viewer-item"
                property=${decorated.property}
                title=${titlelize(decorated.title)}
                .item=${decorated.item}
                .required=${decorated.required}
                @itemSelected=${itemSelectedDelegate}
            ></model-viewer-item-object>
        `;
    }
}

const isRootObject = (decorated: ModelItemDecorator, root: boolean) => {
    return (root && (decorated.item.type === "object" || decorated.item.properties));
}