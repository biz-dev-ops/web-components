import { ModelItem } from "../business-model-canvas/models";
import { UseCase } from "../use-case-viewer/models";

export type Event = UseCase & {
    parameters: ModelItem
};