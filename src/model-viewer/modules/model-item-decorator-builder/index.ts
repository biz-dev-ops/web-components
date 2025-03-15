import { ModelItem } from "../../../model-viewer/models";

export class ModelItemDecorator {
  item: ModelItem;
  type: ItemType;
  title: string;
  property: string;
  required: boolean;

  constructor(item: ModelItem, type: ItemType, property?: string, required?: boolean) {
    this.item = item;
    this.type = type;
    this.property = property || "";
    this.title = item.title || this.property;
    this.required = required || false;
  }

  isChildRequired(property: string) {
    return this.item.required?.includes(property);
  }
}

export enum ItemType {
  Object = "object",
  String = "string",
  Number = "number",
  Integer = "integer",
  Boolean = "boolean",
  Array = "array",
  OneOf = "oneOf",
  Unknown = "unknown"
}

export class ModelItemDecoratorBuilder {
  base: ModelItem;

  constructor(item: ModelItem) {
    this.base = item;
  }

  async build(item: ModelItem, property?: string, required?: boolean): Promise<ModelItemDecorator> {
    const type = await getType(item);
    item = await dereference(item, this.base);

    return new ModelItemDecorator(item, type, property, required)
  }
}

async function getType(item: ModelItem): Promise<ItemType> {
  if (item.type == "object" || item.properties) {
    return ItemType.Object;
  }
  else if (item.type == "string") {
    return ItemType.String;
  }
  else if (item.type == "number") {
    return ItemType.Number;
  }
  else if (item.type == "integer") {
    return ItemType.Integer;
  }
  else if (item.type == "boolean") {
    return ItemType.Boolean;
  }
  else if (item.type == "array" || item.items) {
    return ItemType.Array;
  }
  else if (item.oneOf) {
    return ItemType.OneOf;
  }

  return ItemType.Unknown;
}

async function dereference(item: ModelItem, base: ModelItem): Promise<ModelItem> {
  if(!Object.keys(item).some(key => key === "$ref")) {
    return item;
  }

  const ref = item["$ref"] as string;
  if(!ref.startsWith("#/")) {
    throw new Error(`Only internal refererences are expected here but recieved: ${ref}`);
  }

  const refParts = ref.substring(2).split("/").reverse();

  let reference: any = base;

  while (refParts.length > 0) {
    const property = refParts.pop() as string;

    if(!Object.keys(reference).some(key => key === property)) {
      throw new Error(`Property not found in ModelItem: ${property}`);
    }

    reference = reference[property];
  }

  return reference;
}