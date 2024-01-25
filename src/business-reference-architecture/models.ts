export type ArrowDirection = 'down' | 'up' | null | undefined;
export type ButtonType = 'default' | 'brand' | 'stream' | null | undefined;
export type SectionType = 'side' | 'streams' | null | undefined;

export type Button = {
    icon?: string;
    title: string;
    link?: string;
};

export type Group = {
    title?: string;
    link?: string;
    buttons: Button[];
};

export type Section = {
    title?: string;
    link?: string;
    buttons?: Button[];
    groups?: Group[];
    arrow?: ArrowDirection;
    sectionType?: SectionType;
    buttonType?: ButtonType;
};
