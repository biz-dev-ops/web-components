import { $, $$, expect } from "@wdio/globals";
import "./index";
import { parse as yamlParse } from "yaml";
import { Command } from "./models";

describe("CommandViewer", () => {
    let container: HTMLElement;
    let element: HTMLElement;
    const testDataSrc = "src/command-viewer/_test-data/command1.yml";
    const testDataSrcWithReferences = "src/command-viewer/_test-data/command2.yml";
    let testData1: Command;
    let testData2: Command;

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

        element = document.createElement("command-viewer");
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

    //It returns 200 for non existing urls. Check why.
    it("displays error message on fetch failure", async () => {
        const notAValidUrl = "https://c4dd8ecc-3063-4825-b4aa-0b969d89bb63.com";

        element.setAttribute("src", notAValidUrl);
        container.appendChild(element);

        await expect($(".error")).toBeExisting();
    });

    afterEach(() => {
        container.remove();
    });
});

async function testModelContent(data: Command): Promise<void> {
    await expect($("section")).toBeExisting();
    await expect($(`section > header`)).toHaveText(expect.stringContaining(data.name));
    await expect($("section > main")).toBeExisting();

    const expensionPanels = await $$("section > main > bdo-expansion-panel");
    //await expect(expensionPanels).toBeElementsArrayOfSize(2);

    // test parameters
    const parameters = expensionPanels[0].$$("[aria-label='model-viewer-item']");
    await expect(parameters).toBeElementsArrayOfSize(Object.keys(data.parameters.properties).length);

    //test exceptions
    const exceptions = expensionPanels[1].$$("div.case");
    await expect(exceptions).toBeElementsArrayOfSize(Object.keys(data.exceptions).length);
}