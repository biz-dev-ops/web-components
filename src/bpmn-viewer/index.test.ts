import { $, $$, expect } from "@wdio/globals";
import { BPMNViewer } from "./index";
import "./index";
import customLinksProcess from "./test-data/custom-links.bpmn";
import bpmnSubProcesses from "./test-data/test_subprocesses.bpmn";

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
  
  it("renders without data", async () => {
    document.body.appendChild(element);
    await expect($(">>>.bjs-container svg")).not.toBeNull();
  });

  it("zooms in and out and resets zoom level", async () => {
    element.setAttribute("data-xml", bpmnSubProcesses);
    document.body.appendChild(element);
    await expect($(">>>.bjs-container svg")).not.toBeNull();

    const viewer = element as BPMNViewer;
    expect(viewer.getZoomLevel()).toBe(1);

    viewer.zoomIn();
    expect(viewer.getZoomLevel()).toBeGreaterThan(1);

    viewer.zoomOut();
    viewer.zoomOut();
    expect(viewer.getZoomLevel()).toBeLessThan(1);

    viewer.zoomReset();
    expect(viewer.getZoomLevel()).toBe(1);
  });

  it("renders with a bpmn file", async () => {
    element.setAttribute("data-xml", bpmnSubProcesses);

    document.body.appendChild(element);
    await expect($(">>>.bjs-container svg g g .djs-group")).not.toBeNull();
  });

  it("drills down to collapsed subprocesses and navigates back via breadcrumbs", async () => {
    element.setAttribute("data-xml", bpmnSubProcesses);

    document.body.appendChild(element);

    await expect($$(">>>.bjs-breadcrumbs li")).toBeElementsArrayOfSize(1);

    (await $(">>>.bjs-drilldown")).click();
    await expect($$(">>>.bjs-breadcrumbs li")).toBeElementsArrayOfSize(2);

    (await $(">>>.bjs-breadcrumbs li:first-child a")).click();
    await expect($$(">>>.bjs-breadcrumbs li")).toBeElementsArrayOfSize(1);
  });

  it("simulates a process", async () => {
    element.setAttribute("data-xml", bpmnSubProcesses);

    document.body.appendChild(element);

    (await $(">>>.bts-toggle-mode")).click();
    (
      await $(
        '>>>[data-container-id="StartEvent_1"] .djs-overlay-bts-context-menu'
      )
    ).click();
    await expect($(">>>.bts-element-notification.success")).toHaveText(
      "Finished"
    );
  });

  afterEach(() => {
    element.remove();
  });
});
