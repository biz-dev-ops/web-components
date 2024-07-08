import { $, $$, expect } from "@wdio/globals";
import "./index";
import bpmnSubProcesses from "./test-data/test_subprocesses.bpmn";
import { BPMNViewer } from "./index";

describe("BPMNViewer", () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement("bpmn-viewer");
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
