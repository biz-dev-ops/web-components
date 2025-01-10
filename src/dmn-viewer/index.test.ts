import { $, expect } from "@wdio/globals";
import "./index";
import testDmn from "./test-data/test.dmn";

describe("DMNViewer", () => {
  let element: HTMLElement;
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    container.style.width = "500px";
    container.style.height = "500px";
    document.body.appendChild(container);
    element = document.createElement("dmn-viewer");
    element.setAttribute("data-xml", testDmn);
  });

  it("renders without data", async () => {
    element.removeAttribute("data-xml");
    container.appendChild(element);
    
    await expect($(">>>.bjs-container svg")).not.toBeNull();
  });

  it("renders with a dmn file", async () => {
    container.appendChild(element);
    
    await expect($(">>>.bjs-container svg g g .djs-group")).not.toBeNull();
  });

  it("decission model navigation buttons are working", async () => {
    container.appendChild(element);

    await expect($(">>>.dmn-drd-container")).toBeExisting();
    await expect($(">>>.dmn-decision-table-container")).not.toBeExisting();

    await $('>>>[data-container-id="Decision_16wqg49"] button').click();

    await expect($(">>>.dmn-drd-container")).not.toBeExisting();
    await expect($(">>>.dmn-decision-table-container")).toBeExisting();

    await $('>>>.dmn-decision-table-container .view-drd button').click();

    await expect($(">>>.dmn-drd-container")).toBeExisting();
    await expect($(">>>.dmn-decision-table-container")).not.toBeExisting();
  });

  it("business knowledge model navigation buttons are working", async () => {
    container.appendChild(element);

    await expect($(">>>.dmn-drd-container")).toBeExisting();
    await expect($(">>>.dmn-boxed-expression-container")).not.toBeExisting();

    await $('>>>[data-container-id="BusinessKnowledgeModel_1j6tzvf"] button').click();

    await expect($(">>>.dmn-drd-container")).not.toBeExisting();
    await expect($(">>>.dmn-boxed-expression-container")).toBeExisting();

    await $('>>>.dmn-boxed-expression-container .view-drd button').click();

    await expect($(">>>.dmn-drd-container")).toBeExisting();
    await expect($(">>>.dmn-boxed-expression-container")).not.toBeExisting();
  });

  afterEach(() => {
    element.remove();
  });
});
