import { customElement } from "lit/decorators.js";
import { AbstractCanvasBox } from "../abstract-canvas-box";
import { ModelItem } from "../modules/models/model";

const icon = require("./icon.svg");

@customElement("key-partnerships-canvas-box")
export abstract class KeyPartnershipsCanvasBox extends AbstractCanvasBox {
  constructor() {
    super();
    this.title = "Key partnerships";
  }

  override defaultItems: ModelItem[] = [
    "Who are our key suppliers?",
    "Which key resources are we acquiring from partners?",
    "Which key activities our partners perform?",
    { head: "Motivation for partnerships "},
    [
      "Optimization and economy",
      "Reduction of risk and uncertainty",
      "Acquisition of particular resources and activities"
    ]
  ]; 

  protected override icon: string = icon;
}