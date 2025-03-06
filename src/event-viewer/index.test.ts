import { $, expect } from "@wdio/globals";
import "./index";
import { parse as yamlParse } from "yaml";
import { Event } from "./models";

describe("EventViewer", () => {
    let container: HTMLElement;
    let element: HTMLElement;
    const testDataSrc = "src/event-viewer/_test-data/event1.yml";
    const testDataSrcWithReferences = "src/event-viewer/_test-data/event2.yml";
    let testData1: Event;
    let testData2: Event;

    before("load test data", async function () {
        let response = await fetch(testDataSrc);
        testData1 = yamlParse(await response.text());

        response = await fetch(testDataSrcWithReferences);
        testData2 = yamlParse(await response.text());
    });

    beforeEach(() => {
        container = document.createElement("div");
        container.style.width = "500px";
        container.style.height = "500px";
        document.body.appendChild(container);

        element = document.createElement("event-viewer");
    });

    it("renders with data", async () => {
        element.setAttribute("data-json", JSON.stringify(testData1));
        container.appendChild(element);

        await testModelContent(testData1);
    });

    it("renders src", async () => {
        element.setAttribute("src", testDataSrc);
        container.appendChild(element);

        await testModelContent(testData1);
    });

    it("renders references", async () => {
        element.setAttribute("src", testDataSrcWithReferences);
        container.appendChild(element);

        await testModelContent(testData2);
    });

    // //It returns 200 for non existing urls. Check why.
    // it("displays error message on fetch failure", async () => {
    //     const notAValidUrl = "https://c4dd8ecc-3063-4825-b4aa-0b969d89bb63.com";

    //     element.setAttribute("src", notAValidUrl);
    //     container.appendChild(element);

    //     await expect($(">>>.error")).toBeExisting();
    // });

    afterEach(() => {
        container.remove();
    });
});

async function testModelContent(data: Event): Promise<void> {
    await expect($(">>>section")).toBeExisting();
    await expect($(`>>>section header`)).toHaveText(expect.stringContaining(data.name));
    await expect($(">>>section main")).toBeExisting();

    const expensionPanels = await $$(">>>section > main > bdo-expansion-panel");
    // child selector does not work
    // await expect(expensionPanels).toBeElementsArrayOfSize(2);

    // test parameters
    const parameters = expensionPanels[0].$$(">>>[aria-label='model-viewer-item']");
    await expect(parameters).toBeElementsArrayOfSize(Object.keys(data.parameters.properties).length);
}