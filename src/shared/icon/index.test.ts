import { $, expect } from "@wdio/globals";
import "./index";

describe("Icon", () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement("bdo-icon");
  });

  it("should render and update component", async () => {
    element.setAttribute("icon", "mat-check");

    document.body.appendChild(element);
    await expect($(element)).toHaveText("check");

    element.setAttribute("icon", "mat-share");
    await expect($(element)).toHaveText("share");
  });

  afterEach(() => {
    element.remove();
  });
});
