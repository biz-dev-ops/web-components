export interface ModelItem {
  title: string;
  type: string;
  properties: { [key: string]: ModelItem };
  oneOf: ModelItem[];
  items: ModelItem;
  required: string[];
  description: string;
  [key: string]: any
}

export interface ItemSelected {
  property: string;
  item: ModelItem;
}

export interface PathChanged {
  index: number
}