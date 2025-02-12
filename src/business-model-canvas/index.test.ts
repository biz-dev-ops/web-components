import { $, $$, expect } from "@wdio/globals";
import "./index";
import { parse as yamlParse } from "yaml";
import { data } from "./data";
import { Model } from "./models";

describe("BusinessModelCanvasComponent", () => {
    describe("BusinessModelCanvasComponent", () => { });
    let container: HTMLElement;
    let element: HTMLElement;
    const testDataSrc = "src/business-model-canvas/_test-data/test.yml";
    let testData;

    before("load test data", function (done) {
        fetch(testDataSrc)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${testDataSrc}`);
                }
                return response.text();
            })
            .then(data => {
                testData = yamlParse(data);
                done();
            })
            .catch(err => {
                console.log(err);
                done();
            });
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

        await expect($(">>>.canvas-grid")).toBeExisting();
        await expect($$(">>>.canvas-grid__item")).toBeElementsArrayOfSize(Object.keys(data).length);
        await testModelContent(data);
    });

    it("renders with data", async () => {
        element.setAttribute("data-json", JSON.stringify(testData));
        container.appendChild(element);

        await expect($(">>>.canvas-grid")).toBeExisting();
        await expect($$(">>>.canvas-grid__item")).toBeElementsArrayOfSize(Object.keys(data).length);
        await testModelContent(testData);
    });

    it("renders src", async () => {
        element.setAttribute("src", testDataSrc);
        container.appendChild(element);

        await expect($(">>>.canvas-grid")).toBeExisting();
        await expect($$(">>>.canvas-grid__item")).toBeElementsArrayOfSize(Object.keys(testData).length);
        await testModelContent(testData);
    });

    it("displays error message on fetch failure", async () => {
        element.setAttribute("src", "invalid-url");
        container.appendChild(element);

        await expect($(">>>.error")).toBeExisting();
    });

    afterEach(() => {
        container.remove();
    });
});

async function testModelContent(data: Model): Promise<void> {
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const segment = data[key];
            console.log(key);
            await expect($(`>>>canvas-box[data-test-id="${key}"] h3`)).toHaveText(expect.stringContaining(segment.title));
        }
    }
}