export type Model = {
    enUsers: Group | Button[]
    channels: Group | Button[]
    valueStreams: Group | Button[]
    businessCapabilities: Group | Button[]
    principles: Group | Button[]
}

type Group = {
    title?: string
    items: Button[]
}

type Button = {
    icon?: string
    title: string
    link?: string
}

