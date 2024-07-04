import { $, $$, expect } from "@wdio/globals";
import "./index";
import bpmnSubProcesses from "./test-data/test_subprocesses.bpmn";

describe("BPMNViewer", () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement("bpmn-viewer");
  });

  it("renders without data", async () => {
    document.body.appendChild(element);
    await expect($(">>>.bjs-container svg")).not.toBeNull();
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

  afterEach(() => {
    element.remove();
  });
});
