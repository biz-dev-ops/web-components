import { customElement } from "lit/decorators.js";
import { CanvasBox } from "../canvas-box";
import { ModelItem } from "../modules/models/model";

const icon = require("./icon.svg");

@customElement("customer-relationships-canvas-box")
export abstract class CustomerRelationshipsCanvasBox extends CanvasBox {
  constructor() {
    super();
    this.title = "Customer relationships";
  }

  override defaultItems: ModelItem[] = [
    "What type of relationship each customer segment expects?",
    "Which ones have we established?",
    "How are they integrated with rest of the biz. model?",
    "How much they cost us?",
    { head: "Examples"},
    [
      "Personal assistance",
      "Self-service",
      "Automated services",
      "Communities",
      "Co-creation"
    ]
  ]; 
  
  protected override icon: string = icon;
}