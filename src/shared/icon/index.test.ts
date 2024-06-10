// import { html } from "lit";
import { html, fixture, expect, elementUpdated } from "@open-wc/testing";
import "./index.js";
import type { Icon } from "./index.js";

describe("Icon", () => {
  it("renders", async () => {
    const element = await fixture<Icon>(
      html`<bdo-icon .icon=${"mat-check"}></bdo-icon>`
    );
    expect(element).shadowDom.to.equal(`
       <span class="material-symbols">
         check
       </span>`);
  });

  it("updates", async () => {
    const element = await fixture<Icon>(html`<bdo-icon></bdo-icon>`);

    expect(element).shadowDom.to.equal("");

    element.icon = "mat-check";
    await elementUpdated(element);

    expect(element).shadowDom.to.equal(`
       <span class="material-symbols">
         check
       </span>`);
  });
});
