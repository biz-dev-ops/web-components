import { ModelItem } from "../model-viewer/models"

export type UseCase = {
    type: UseCaseType,
    name: string
    description: string
}

export type UseCaseType = {
    type: string,
    name: string
}

export type Exception = {
    name: string
    description: string
    parameters: ModelItem
}
