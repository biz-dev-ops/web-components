export type ArrowDirection = 'down' | 'up' | null;
export type ButtonStyle = 'white' | 'brand' | 'stream' | null;

export type Button = {
    icon?: string;
    title: string;
    style?: ButtonStyle;
    link?: string;
};

export type Group = {
    title?: string; // Optional to allow for button-only groups
    items: Button[];
    buttonStyle?: ButtonStyle;
};

export type Section = {
    title: string;
    content: Group[] | Button[]; // Can be an array of groups or buttons
    arrow?: ArrowDirection;
    style?: string;
    buttonStyle?: ButtonStyle;
};

export type Model = {
    enUsers: Section;
    channels: Section;
    valueStreams: Section;
    businessCapabilities: Section;
    principles: Section;
};
