export type Model = {
    endUsers: Group
    channels: Group
    valueStreams: Group
    businessCapabilities: Group
    principles: Group
}

export type Group = Button[] | Groups | Buttons;

export type Groups = {
    title: string
    groups: Group[]
}

export type Buttons = {
    title: string
    items: Button[]
}

export type Button = {
    icon?: string
    title: string
    link?: string
}