import { expect, test } from "@sand4rt/experimental-ct-web";
import { getResolver, parseRef } from "../../src/schema-viewer/schema-resolver";

test.describe("schema-resolver", async () => {

    [
        { ref: "#/definitions/User", id: undefined, url: null, parts: ["definitions", "User"] },
        { ref: "../test-b/schema.json", id: "/test/schema.json", url: "/test-b/schema.json", parts: [] },
        { ref: "https://example.com/schema.json#/definitions/User", id: undefined, url: "https://example.com/schema.json", parts: ["definitions", "User"] },
        { ref: "./test/user.json", id: "https://example.com/schema.json", url: "https://example.com/test/user.json", parts: [] },
        { ref: "../_data-dictionary/exceptions/employee-not-found.yml", id: "/markdown-viewer/examples/payroll-service/calculate-payroll/get-time-and-attendance.query.yml", url: "/markdown-viewer/examples/payroll-service/_data-dictionary/exceptions/employee-not-found.yml", parts: [] },
        { ref: "../_data-dictionary/exceptions/employee-not-found.yaml", id: "examples/payroll-service/calculate-payroll/get-time-and-attendance.query.schema.yaml", url: "examples/payroll-service/_data-dictionary/exceptions/employee-not-found.yaml", parts: [] },
    ].forEach(({ ref, id, url, parts }) => {
        test(`parseRef handles relative paths ${ref}`, () => {
            const result = parseRef(ref, id);
            expect(result.url).toEqual(url);
            expect(result.parts).toEqual(parts);
        });
    });

    test("relative references without id throw error", () => {
        expect(() => parseRef("../test-b/local-schema.json")).toThrow();
    });

    test("getResolver returns same instance for same URL", () => {
        const resolver1 = getResolver("https://example.com/schema.json");
        const resolver2 = getResolver("https://example.com/schema.json");
        expect(resolver1).toBe(resolver2);
    });

    test("getResolver returns different instance for different URLs", () => {
        const resolver1 = getResolver("https://example.com/schema1.json");
        const resolver2 = getResolver("https://example.com/schema2.json");
        expect(resolver1).not.toBe(resolver2);
    });
});