import { $, expect } from "@wdio/globals";
import "./index";
import customLinksProcess from "./test-data/custom-links.bpmn";

describe("BPMNViewer", () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement("bpmn-viewer");
  });

  it("emits an event when an element with custom links is clicked", async () => {
    element.setAttribute("data-xml", customLinksProcess);
    let callbackTriggered = false;
    element.addEventListener("onelementclick", (event) => {
      // @ts-ignore
      const { element, links } = event.detail;
      expect(element).not.toBeNull();
      expect(links).toHaveLength(2);
      expect(links[0].name).toBe("Test");
      expect(links[0].value).toBe("www.test.com");
      expect(links[1].name).toBeUndefined();
      expect(links[1].value).toBe("www.test2.com");
      callbackTriggered = true;
    });
    document.body.appendChild(element);
    await $('>>>[data-element-id="Activity_0vl2m4j"]').click();
    await expect(callbackTriggered).toBeTruthy();
  });

  afterEach(() => {
    element.remove();
  });
});
