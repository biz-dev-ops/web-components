import { customElement } from "lit/decorators.js";
import { AbstractCanvasBox } from "../abstract-canvas-box";
import { ModelItem } from "../models";

@customElement("key-activities-canvas-box")
export abstract class KeyActivitiesCanvasBox extends AbstractCanvasBox {
  constructor() {
    super();
    this.title = "Key activities";
  }

  override defaultItems: ModelItem[] = [
    "What key activities do our value propostions require?",
    "Our distribution channels?",
    "Customer relationships?",
    "Revenue Streams?",
    { head: "Categories"},
    [
      "Production",
      "Problem solving",
      "Platform / network"
    ]
  ]; 

  protected override icon: string = "ph-check";
}