import { ModelItem } from "../model-viewer/models"

export type UseCase = {
    type: UseCaseType,
    name: string
    description: string
}

export type UseCaseType = {
    type: string,
    icon: string,
    name: string
}

export type Case = {
    name: string
    description: string
    parameters: ModelItem
}

export type Exception = Case;
