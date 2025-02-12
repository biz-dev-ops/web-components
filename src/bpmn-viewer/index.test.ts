import { $, $$, expect } from "@wdio/globals";
import "./index";
import { BPMNViewer } from "./index";
const customLinksProcess = "src/bpmn-viewer/_test-data/custom-links.bpmn";
const bpmnSubProcesses = "src/bpmn-viewer/_test-data/test_subprocesses.bpmn";

describe("BPMNViewer", () => {
  let viewer: BPMNViewer;
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    container.style.width = "500px";
    container.style.height = "500px";
    document.body.appendChild(container);
    viewer = document.createElement("bpmn-viewer") as BPMNViewer;
  });

  it("renders without data", async () => {
    container.appendChild(viewer);
    await expect($(">>>.bjs-container svg")).not.toBeNull();
  });

  it("renders with a bpmn file", async () => {
    viewer.setAttribute("src", bpmnSubProcesses);

    container.appendChild(viewer);
    await expect($(">>>.bjs-container svg g g .djs-group")).not.toBeNull();
  });

  it("zooms in and out and resets zoom level", async () => {
    viewer.setAttribute("src", bpmnSubProcesses);
    container.appendChild(viewer);

    await expect($(">>>.bjs-container svg")).not.toBeNull();

    expect(viewer.getZoomLevel()).toBe(1);

    viewer.zoomIn();
    expect(viewer.getZoomLevel()).toBeGreaterThan(1);

    viewer.zoomOut();
    viewer.zoomOut();
    expect(viewer.getZoomLevel()).toBeLessThan(1);

    viewer.zoomReset();
    expect(viewer.getZoomLevel()).toBe(1);
  });

  it("emits an event when an element with custom links is clicked", async () => {
    let callbackTriggered = false;

    viewer.src = customLinksProcess;
    viewer.addEventListener("onelementclick", (event) => {
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
    container.appendChild(viewer);

    await $('>>>[data-element-id="Activity_0vl2m4j"]').click();
    await expect(callbackTriggered).toBeTruthy();
  });

  it("simulates a process", async () => {
    viewer.src = bpmnSubProcesses;
    viewer.enableSimulator = true;
    container.appendChild(viewer);

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

  it("drills down to collapsed subprocesses and navigates back via breadcrumbs", async () => {
    viewer.src = bpmnSubProcesses;
    container.appendChild(viewer);

    await expect($$(">>>.bjs-breadcrumbs li")).toBeElementsArrayOfSize(1);

    (await $(">>>.bjs-drilldown")).click();
    await expect($$(">>>.bjs-breadcrumbs li")).toBeElementsArrayOfSize(2);

    (await $(">>>.bjs-breadcrumbs li:first-child a")).click();
    await expect($$(">>>.bjs-breadcrumbs li")).toBeElementsArrayOfSize(1);
  });

  it("deeplinks to a subprocess", async () => {
    viewer.src = bpmnSubProcesses;
    viewer.showProcess = "Activity_0d5g08j";
    container.appendChild(viewer);

    await expect($$(">>>.bjs-breadcrumbs li")).toBeElementsArrayOfSize(2);
  });

  it("deeplinks to a subprocess of a subprocess", async () => {
    viewer.src = bpmnSubProcesses;
    viewer.showProcess = "Activity_0d5g08j/Activity_0m8usba";
    container.appendChild(viewer);

    await expect($$(">>>.bjs-breadcrumbs li")).toBeElementsArrayOfSize(3);
  });

  it("fails to deeplink to a non-existing subprocess", async () => {
    viewer.src = bpmnSubProcesses;
    viewer.showProcess = "Activity_0d5g08j_does_not_exist";
    container.appendChild(viewer);

    await expect($$(">>>.bjs-breadcrumbs li")).toBeElementsArrayOfSize(1);
    await expect($(">>>#bpmn-container.error")).toBeExisting();
  });

  afterEach(() => {
    viewer.remove();
  });
});
