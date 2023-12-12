import { customElement } from "lit/decorators.js";
import { AbstractCanvasBox } from "../abstract-canvas-box";
import { ModelItem } from "../models";

const icon = require("./icon.svg");

@customElement("channels-canvas-box")
export abstract class ChannelsCanvasBox extends AbstractCanvasBox {
  constructor() {
    super();
    this.title = "Channels";
  }

  override defaultItems: ModelItem[] = [
    "Through which channels our customer segments want to be reached?",
    "How are we reaching them now?",
    "How are channels integrated?",
    "Which ones work best?",
    "Which ones are most cost efficient?",
    "How are we integrating them with customer routines?"
  ];

  protected override icon: string = icon;
}