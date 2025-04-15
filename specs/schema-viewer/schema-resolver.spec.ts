import { expect, test } from "@sand4rt/experimental-ct-web";
import { getResolver, parseRef } from "../../src/schema-viewer/schema-resolver";

test.describe("schema-resolver", async () => {

    test("parseRef handles local references", () => {
        const result = parseRef("#/definitions/User");
        expect(result.url).toBeNull();
        expect(result.parts).toEqual(["definitions", "User"]);
    });

    test("parseRef handles external references", () => {
        const result = parseRef("https://example.com/schema.json#/definitions/User");
        expect(result.url).toBe("https://example.com/schema.json");
        expect(result.parts).toEqual(["definitions", "User"]);
    });

    test("parseRef handles relative paths", () => {
        const result = parseRef("./local-schema.json#/definitions/User");
        expect(result.url).toContain("local-schema.json");
        expect(result.parts).toEqual(["definitions", "User"]);
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