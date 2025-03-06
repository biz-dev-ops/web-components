import { ModelItem } from "../model-viewer/models";
import { Exception, UseCase } from "../use-case-viewer/models";

export type Command = UseCase & {
    parameters: ModelItem,
    exceptions: Map<string, Exception>
};