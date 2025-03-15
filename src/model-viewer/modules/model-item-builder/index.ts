import { TemplateResult } from "lit";
import { ItemSelected } from "../../models";
import { ModelViewerItemArray } from "../../components/model-viewer-item/model-viewer-item-array";
import { ModelViewerItemObject } from "../../components/model-viewer-item/model-viewer-item-object";
import { ModelViewerItemObjectProperties } from "../../components/model-viewer-item/model-viewer-item-object-properties";
import { ModelViewerItemOneOf } from "../../components/model-viewer-item/model-viewer-item-oneof";
import { ModelViewerItemValue } from "../../components/model-viewer-item/model-viewer-item-value";
import { ModelItemDecorator, ModelItemDecoratorBuilder } from "../model-item-decorator-builder";

const builders: ((decorated: ModelItemDecorator, builder: ModelItemDecoratorBuilder, itemSelectedDelegate: (event: CustomEvent<ItemSelected>) => void, root: boolean) => Promise<TemplateResult>)[] = [
    ModelViewerItemArray.build,
    ModelViewerItemObject.build,
    ModelViewerItemObjectProperties.build,
    ModelViewerItemOneOf.build,
    ModelViewerItemValue.build
];

export class ModelItemBuilder {

    static async build(decorated: ModelItemDecorator, builder: ModelItemDecoratorBuilder, itemSelectedDelegate: (event: CustomEvent<ItemSelected>) => void, root: boolean) : Promise<TemplateResult | TemplateResult[]> {
        const promises = builders.map(async build => await build(decorated, builder, itemSelectedDelegate, root));
        const results = await Promise.all(promises);
        return results;
    }
}