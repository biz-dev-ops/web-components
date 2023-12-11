import { customElement } from "lit/decorators.js";
import { CanvasBox } from "../canvas-box";
import { ModelItem } from "../modules/models/model";

const icon = require("./icon.svg");

@customElement("key-activities-canvas-box")
export abstract class KeyActivitiesCanvasBox extends CanvasBox {
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

  protected override icon: string = icon;
}