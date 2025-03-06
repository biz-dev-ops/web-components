import { $, $$, expect } from "@wdio/globals";
import "./index";
import { parse as yamlParse } from "yaml";
import { data } from "./data";
import { Model } from "./models";

describe("BusinessModelCanvasComponent", () => {
    let container: HTMLElement;
    let element: HTMLElement;
    const testDataSrc = "src/business-model-canvas/_test-data/test.yml";
    let testData;

    before("load test data", async function () {
        let response = await fetch(testDataSrc);
        testData = yamlParse(await response.text());
    });

    beforeEach(() => {
        container = document.createElement("div");
        container.style.width = "500px";
        container.style.height = "500px";
        document.body.appendChild(container);

        element = document.createElement("business-model-canvas");
    });

    it("renders without data", async () => {
        container.appendChild(element);

        await testModelContent(data);
    });

    it("renders with data", async () => {
        element.setAttribute("data-json", JSON.stringify(testData));
        container.appendChild(element);

        await testModelContent(testData);
    });

    it("renders src", async () => {
        element.setAttribute("src", testDataSrc);
        container.appendChild(element);

        await testModelContent(testData);
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

async function testModelContent(data: Model): Promise<void> {
    await expect($(">>>.canvas-grid")).toBeExisting();
    await expect($$(">>>.canvas-grid__item")).toBeElementsArrayOfSize(Object.keys(data).length);

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const segment = data[key];
            console.log(key);
            await expect($(`>>>canvas-box[data-test-id="${key}"] h3`)).toHaveText(expect.stringContaining(segment.title));
        }
    }
}