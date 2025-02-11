import { $, $$, expect } from "@wdio/globals";
import "./index";

describe("CanvasBox", () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement("canvase-box");
  });

  it("renders without data", async () => {
    document.body.appendChild(element);
    await expect($(element)).toHaveText("");
  });

  it("renders with a title", async () => {
    element.setAttribute("title", "Value propositions");

    document.body.appendChild(element);
    await expect($$(">>>h3")).toHaveText("Value propositions");
  });

  it("renders with an icon", async () => {
    element.setAttribute("icon", "mat-factory");

    document.body.appendChild(element);
    await expect($$(">>>bdo-icon")).toHaveText("factory");
  });

  it("renders with a canvas box collection", async () => {
    element.setAttribute(
      "items",
      JSON.stringify([
        "Customer relationships?",
        "Revenue Streams?",
        { head: "Categories" },
        ["Production", "Problem solving"],
      ])
    );

    document.body.appendChild(element);

    await expect($$(">>>canvas-box-collection p:first-child")).toHaveText(
      "Customer relationships?"
    );
    await expect($$(">>>canvas-box-collection p:nth-child(2)")).toHaveText(
      "Revenue Streams?"
    );
    await expect($$(">>>canvas-box-collection h4")).toHaveText("Categories");
    await expect($$(">>>canvas-box-collection ul li:first-child")).toHaveText(
      "Production"
    );
    await expect($$(">>>canvas-box-collection ul li:last-child")).toHaveText(
      "Problem solving"
    );
  });

  afterEach(() => {
    element.remove();
  });
});
