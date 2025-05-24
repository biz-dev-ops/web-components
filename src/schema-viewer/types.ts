export type FragmentSelected = Fragment | Fragment[];


export interface FragmentIndexSelected {
    index: number;
}


export interface Fragment {
    name: string;
    key: string;
    hidden?: boolean;
    disabled?: boolean;
}