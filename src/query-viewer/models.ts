import { ModelItem } from "../business-model-canvas/models";
import { Exception, UseCase } from "../use-case-viewer/models";

export type Query = UseCase & {
    parameters: ModelItem,
    response: ModelItem,
    exceptions: Exception[]
};