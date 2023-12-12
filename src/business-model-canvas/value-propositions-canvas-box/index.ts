import { customElement } from "lit/decorators.js";
import { AbstractCanvasBox } from "../abstract-canvas-box";
import { ModelItem } from "../models";

const icon = require("./icon.svg");

@customElement("value-propositions-canvas-box")
export abstract class ValuePropositionsCanvasBox extends AbstractCanvasBox {
  constructor() {
    super();
    this.title = "Value propositions";
  }

  override defaultItems: ModelItem[] = [
    "Which value do we deliver to the customer?",
    "Which one of our customer's problems are we helping to solve?",
    "What bundles of products and services are we offering to each customer segment?",
    "Which customer needs are we satisfying",
    { head: "Characteristics"},
    [
      "Newness",
      "Performance",
      "Customization",
      "\"Getting Job Done\"",
      "Design",
      "Brand / status",
      "Price",
      "Cost Reduction",
      "Risk Reduction",
      "Accessibility",
      "Convenience / usability"
    ]
  ];
  
  protected override icon: string = icon;
}