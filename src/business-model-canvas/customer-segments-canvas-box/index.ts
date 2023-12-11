import { customElement } from "lit/decorators.js";
import { CanvasBox } from "../canvas-box";
import { ModelItem } from "../modules/models/model";

const icon = require("./icon.svg");

@customElement("customer-segments-canvas-box")
export abstract class CustomerSegmentsCanvasBox extends CanvasBox {
  constructor() {
    super();
    this.title = "Customer segments";
  }

  override defaultItems: ModelItem[] = [
    "For whom are we creating value?",
    "Who are our most important customers?",
    { head: "Examples"},
    [
      "Mass market",
      "Niche market",
      "Segmented",
      "Multi-sided platform"
    ]
  ]; 
  
  protected override icon: string = icon;
}