export interface DrivenByAction {
  canHandleDriverAction(action: string): boolean;
  handleDriverAction(action: string): void;
}

export function isDrivenByAction(value: any): value is DrivenByAction {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof value.canHandleDriverAction === 'function' &&
    typeof value.handleDriverAction === 'function'
  );
}