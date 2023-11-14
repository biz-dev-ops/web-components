export type Model = {
    keyPartnerships: ModelItem[],
    keyActivities: ModelItem[],
    keyResources: ModelItem[],
    valuePropositions: ModelItem[],
    customerRelationships: ModelItem[],
    channels: ModelItem[],
    customerSegments: ModelItem[],
    costStructure: ModelItem[],
    revenueStreams: ModelItem[]
}

export type ModelItem = string | string[] | Head | Text | Collection;

export type Head = {
    head: string
}

export type Text = {
    text: string
}

export type Collection = {
    items: string[]
}