import { ModelItem } from "../business-model-canvas/models";
import { Exception, UseCase } from "../use-case-viewer/models";

export type Command = UseCase & {
    parameters: ModelItem,
    exceptions: Exception[]
};