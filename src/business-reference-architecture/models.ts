export type Model = {
    endUsers: Group
    channels: Group
    valueStreams: Group
    businessCapabilities: Group
    principles: Group
}

export type Group = Groups | Buttons | Buttons[] | Button[];

export type Groups = {
    title: string
    groups: Buttons[]
}

export type Buttons = {
    title: string
    buttons: Button[]
}

export type Button = {
    icon?: string
    title: string
    link?: string
}
