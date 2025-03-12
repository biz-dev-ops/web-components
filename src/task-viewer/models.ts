import { ModelItem } from "../model-viewer/models";
import { Case, Exception, UseCase } from "../use-case-viewer/models";

export type Task = UseCase & {
    context: ModelItem,
    actions:  Map<string, Action>,
    exceptions: Map<string, Exception>
};

export type Action = Case;