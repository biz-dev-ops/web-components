import { ModelItem } from "../model-viewer/models";
import { UseCase } from "../use-case-viewer/models";

export type Event = UseCase & {
    parameters: ModelItem
};