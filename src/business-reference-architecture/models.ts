export type ArrowDirection = 'down' | 'up' | null | undefined;
export type ButtonStyle = 'white' | 'brand' | 'stream' | null | undefined;

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
    title: string;
    link?: string;
    buttons?: Button[];
    groups?: Group[];
    arrow?: ArrowDirection;
    sectionStyle?: string;
    buttonStyle?: ButtonStyle;
};
