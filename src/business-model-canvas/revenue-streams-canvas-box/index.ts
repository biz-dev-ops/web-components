import { customElement } from "lit/decorators.js";
import { AbstractCanvasBox } from "../abstract-canvas-box";
import { ModelItem } from "../models";

@customElement("revenue-streams-canvas-box")
export abstract class RevenueStreamsCanvasBox extends AbstractCanvasBox {
  constructor() {
    super();
    this.title = "Revenue streams";
  }

  override defaultItems: ModelItem[] = [
    "For what value are our customers willing to pay?",
    "What are they currently paying for?",
    "How are they paying?",
    "How would they prefer to pay?",
    "How much each revenue stream contributes overall?"
  ]; 
  
  protected override icon: string = "ph-hand-coins";
}