import { customElement } from "lit/decorators.js";
import { AbstractCanvasBox } from "../abstract-canvas-box";
import { ModelItem } from "../modules/models/model";

const icon = require("./icon.svg");

@customElement("key-resources-canvas-box")
export abstract class KeyResourcesCanvasBox extends AbstractCanvasBox {
  constructor() {
    super();
    this.title = "Key resources";
  }

  override defaultItems: ModelItem[] = [
    "What key resources our value proposition requires?",
    "Our distribution channels? Customer relationships?",
    "Revenue Streams?",
    { head: "Types of resource"},
    [
      "Physical",
      "Intellectual (brand, patents, copyrights, data)",
      "Human",
      "Financial"
    ]
  ];
  
  protected override icon: string = icon;
}