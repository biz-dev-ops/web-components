import { ModelItem } from "../model-viewer/models";
import { Exception, UseCase } from "../use-case-viewer/models";

export type Query = UseCase & {
    parameters: ModelItem,
    response: ModelItem,
    exceptions: Map<string, Exception>
};