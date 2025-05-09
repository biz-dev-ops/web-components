export interface DrivenByAction {
    canHandleDriverAction(action: string): boolean;
    handleDriverAction(action: string): void;
}