import { customElement } from "lit/decorators.js";
import { TemplateResult, html } from "lit";
import { ItemSelected, ModelItemDecorator } from "../../../models";

import "../../../../shared/button";
import { ModelViewerItem } from "..";
import Util from "../../../../shared/util";

@customElement('model-viewer-item-object')
export class ModelViewerItemObject extends ModelViewerItem {

    override render() {
        return html`
            <div class="item item--object">
                <bdo-button type="button" direction="right" @clicked=${this._handleItemSelection}>
                    <span class="txt--property">
                        ${Util.titlelize(this.title)} 
                        ${this.required ? html`<span class="txt--required">*</span>`: ``}
                    </span>
                </bdo-button>
            </div>
        `;
    }

    public static build(decorated: ModelItemDecorator, itemSelectedDelegate: (event: CustomEvent<ItemSelected>) => void, root: boolean) : TemplateResult {
        if(!isRootObject(decorated, root))
            return html``;
            
         return html`
            <model-viewer-item-object
                property=${decorated.property}
                title=${decorated.title}
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