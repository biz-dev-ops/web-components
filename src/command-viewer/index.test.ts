import { $, expect } from "@wdio/globals";
import "./index";
import { parse as yamlParse } from "yaml";
import { Command } from "./models";

describe("CommandViewer", () => {
    let container: HTMLElement;
    let element: HTMLElement;
    const testDataSrc = "src/command-viewer/_test-data/command1.yml";
    let testData: Command;

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
                console.log(testData);
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

        element = document.createElement("command-viewer");
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

async function testModelContent(data: Command): Promise<void> {
    await expect($(">>>section")).toBeExisting();
    await expect($(`>>>section header`)).toHaveText(expect.stringContaining(data.name));
}