import { customElement } from 'lit/decorators.js';
import { CanvasBox } from '../canvas-box';
import { ModelItem } from '../modules/models/model';

const icon = require("./icon.svg");

@customElement('cost-structure-canvas-box')
export abstract class CostStructureCanvasBox extends CanvasBox {
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
  
  protected override icon: string = icon;
}