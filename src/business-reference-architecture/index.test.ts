import { $, $$, expect } from "@wdio/globals";
import "./index";
import { parse as yamlParse } from "yaml";
import { Section } from "./models";

describe("BusinessReferenceArchitectureComponent", () => {
    let container: HTMLElement;
    let element: HTMLElement;
    const testDataSrc = "src/business-reference-architecture/_test-data/model1.yml";
    let testData: Section[];

    before("load test data", async function () {
        let response = await fetch(testDataSrc);
        testData = yamlParse(await response.text());
    });

    beforeEach(() => {
        container = document.createElement("div");
        container.style.width = "500px";
        container.style.height = "500px";
        document.body.appendChild(container);

        element = document.createElement("business-reference-architecture");
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

async function testModelContent(data: Section[]): Promise<void> {
    await expect($(">>>.architecture-section-grid")).toBeExisting();
    await expect($$(">>>.architecture-section")).toBeElementsArrayOfSize(data.length);

    data.forEach(async (segment, index) => {
        if(segment.title) {
            await expect($(`>>>.architecture-section:nth-child(${index}) .title`)).toHaveText(expect.stringContaining(segment.title));
        }
    });
}