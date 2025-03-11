// import { $, expect } from "@wdio/globals";

import { DMNViewer } from "./index";
const testDmn = "src/smn-viewer/_test-data/test.dmn";
import {test, expect, MountResult} from '@sand4rt/experimental-ct-web';

test.describe("DMNViewer", () => {
  let viewer: MountResult<DMNViewer>;

  test.beforeEach(async ({page, mount}) => {

    viewer = await mount(DMNViewer, {props: {src: testDmn}})

    // page.evaluate(() => {
    //   container = document.createElement("div");
    //   container.style.width = "500px";
    //   container.style.height = "500px";
    //   document.body.appendChild(container);
    //   viewer = document.createElement("dmn-viewer") as DMNViewer;
    //   container.appendChild(viewer);
    //   viewer.setAttribute("src", testDmn);
    // })
  });

  // test.afterEach(({ page }) => {
  //   page.evaluate(() => {
  //     viewer.remove();
  //   })
  // });

  test("renders without data", async () => {
    // container.appendChild(viewer);

    // await expect($(">>>.bjs-container svg")).not.toBeNull();
    await expect(viewer.locator('.bjs-container svg')).not.toBeNull();
  });

  test("renders with a dmn file", async ({ page }) => {
    // container.appendChild(viewer);

    await expect($(">>>.bjs-container svg g g .djs-group")).not.toBeNull();
  });

  test("decission model navigation buttons are working", async () => {
    // container.appendChild(viewer);

    await expect($(">>>.dmn-drd-container")).toBeExisting();
    await expect($(">>>.dmn-decision-table-container")).not.toBeExisting();

    await $('>>>[data-container-id="Decision_16wqg49"] button').click();

    await expect($(">>>.dmn-drd-container")).not.toBeExisting();
    await expect($(">>>.dmn-decision-table-container")).toBeExisting();

    await $('>>>.dmn-decision-table-container .view-drd button').click();

    await expect($(">>>.dmn-drd-container")).toBeExisting();
    await expect($(">>>.dmn-decision-table-container")).not.toBeExisting();
  });

  test("business knowledge model navigation buttons are working", async () => {
    // container.appendChild(viewer);

    await expect($(">>>.dmn-drd-container")).toBeExisting();
    await expect($(">>>.dmn-boxed-expression-container")).not.toBeExisting();

    await $('>>>[data-container-id="BusinessKnowledgeModel_1j6tzvf"] button').click();

    await expect($(">>>.dmn-drd-container")).not.toBeExisting();
    await expect($(">>>.dmn-boxed-expression-container")).toBeExisting();

    await $('>>>.dmn-boxed-expression-container .view-drd button').click();

    await expect($(">>>.dmn-drd-container")).toBeExisting();
    await expect($(">>>.dmn-boxed-expression-container")).not.toBeExisting();
  });

   //It returns 200 for non existing bpmn. Check why.
  // test("displays error message on fetch failure", async () => {
  //     const notAValidUrl = "./not-valid.dmn";
  //     viewer.src = notAValidUrl;
  //     container.appendChild(viewer);

  //     await expect($(">>>.error")).toBeExisting();
  // });
});
