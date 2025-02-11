export type Model = {
    keyPartnerships: Segment,
    keyActivities: Segment,
    keyResources: Segment,
    valuePropositions: Segment,
    customerRelationships: Segment,
    channels: Segment,
    customerSegments: Segment,
    costStructure: Segment,
    revenueStreams: Segment
}

export type Segment = {
    title: string,
    items: ModelItem[],
    icon: string
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