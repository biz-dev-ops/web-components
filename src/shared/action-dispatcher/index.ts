import { LitElement } from 'lit';

/**
 * Type definition for an action handler method signature.
 */
type ActionHandlerMethod = (...args: any[]) => void;

/**
 * Interface for the metadata stored by the Action decorator.
 */
interface IActionHandlerMetadata {
  methodName: string;
  action: string;
}

/**
 * A symbol to store the action handler metadata on the class prototype.
 * Using a symbol prevents naming conflicts with other properties.
 */
const ACTION_HANDLERS_METADATA = Symbol('actionHandlersMetadata');

/**
 * Decorator: Marks a method as an action handler for a specific action string.
 *
 * @param actionName The string action this method handles.
 */
function Action(actionName: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const handlers = Reflect.getOwnMetadata(ACTION_HANDLERS_METADATA, target) || [];
    handlers.push({ methodName: propertyKey, action: actionName });
    Reflect.defineMetadata(ACTION_HANDLERS_METADATA, handlers, target);
  };
}

/**
 * Interface defining the contract for an action dispatcher.
 * Any class implementing this interface must provide these methods.
 */
interface IActionDispatcher {
  canHandleAction(action: string): boolean;
  handleAction(action: string, payload?: any): void;
}

/**
 * TypeScript's way of defining a "Class Constructor" type.
 */
type Constructor<T = {}> = new (...args: any[]) => T;

/**
 * Mixin: Provides action dispatching capabilities to any class.
 *
 * @param Base A class constructor that this mixin will extend.
 * @returns A new class that extends Base and includes IActionDispatcher methods.
 */
function ActionDispatchMixin<TBase extends Constructor>(Base: TBase) {
  return class ActionDispatchable extends Base implements IActionDispatcher {
    public _findHandlerMetadata(action: string): { handlerMeta: IActionHandlerMetadata, handlerMethod: ActionHandlerMethod } | null {
      let currentPrototype = Object.getPrototypeOf(this);

      while (currentPrototype) {
        const handlersMeta: IActionHandlerMetadata[] = Reflect.getOwnMetadata(ACTION_HANDLERS_METADATA, currentPrototype) || [];

        const handlerMeta = handlersMeta.find(meta => meta.action === action);
        if (handlerMeta) {
          const originalMethod = (this as any)[handlerMeta.methodName];

          if (typeof originalMethod === 'function') {
            const handlerMethod = originalMethod.bind(this) as ActionHandlerMethod;
            return { handlerMeta, handlerMethod };
          }
        }
        currentPrototype = Object.getPrototypeOf(currentPrototype);
      }
      return null;
    }

    canHandleAction(action: string): boolean {
      return this._findHandlerMetadata(action) !== null;
    }

    handleAction(action: string, payload?: any): void {
      const handlerInfo = this._findHandlerMetadata(action);

      if (handlerInfo) {
        const { handlerMethod } = handlerInfo;
        handlerMethod(payload);
      }
      else {
        console.warn(`No handler found for action: '${action}'`);
      }
    }
  };
}

/**
 * Type guard function to check if an object implements IActionDispatcher.
 *
 * @param obj The object to check.
 * @returns True if the object implements IActionDispatcher, false otherwise.
 */
function isActionDispatcher(obj: any): obj is IActionDispatcher {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof (obj as IActionDispatcher).canHandleAction === 'function' &&
    typeof (obj as IActionDispatcher).handleAction === 'function'
  );
}

const ActionLitElement = ActionDispatchMixin(LitElement);
export { Action, IActionDispatcher, ActionHandlerMethod, ActionLitElement, isActionDispatcher };