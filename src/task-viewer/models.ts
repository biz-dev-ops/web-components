import { ModelItem } from "../business-model-canvas/models";
import { Exception, UseCase } from "../use-case-viewer/models";

export type Task = UseCase & {
    context: ModelItem,
    actions: Exception[]
    exceptions: Exception[]
};