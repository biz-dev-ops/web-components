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
    style?: string;
    arrow?: ArrowDirection;
    buttons?: Button[];
    groups?: Group[];
    
    buttonType?: ButtonType;
    sectionType?: SectionType;    
};
