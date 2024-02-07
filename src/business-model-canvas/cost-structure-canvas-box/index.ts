import { customElement } from "lit/decorators.js";
import { AbstractCanvasBox } from "../abstract-canvas-box";
import { ModelItem } from "../models";

@customElement("cost-structure-canvas-box")
export abstract class CostStructureCanvasBox extends AbstractCanvasBox {
  constructor() {
    super();
    this.title = "Cost structure";
  }

  override defaultItems: ModelItem[] = [
    "What are most important costs inherent to our business model?",
    "Which key resources are most expensive?",
    "Which key activities are most expensive?",
    { head: "Is your business more?"},
    [
      "Cost driven (cost structure, low price prop, maximum automation, extensive outsourcing)",
      "Value driven (focused on value creation, premium value prop)"
    ]
  ]; 
  
  protected override icon: string = "mat-sell";
}