import { test, expect } from "@sand4rt/experimental-ct-web";
import { titlelize, parseMarkdown, appendFontFaceDefinitionToDom } from "../../../src/shared/util";

test.describe("Utility Functions", () => {
  test.describe("titlelize", () => {
    test("should capitalize first letter and replace underscores with spaces", () => {
      expect(titlelize("hello_world")).toBe("Hello world");
    });

    test("should capitalize first letter and replace hyphens with spaces", () => {
      expect(titlelize("hello-world")).toBe("Hello world");
    });

    test("should handle empty string", () => {
      expect(titlelize("")).toBe("");
    });

    test("should handle undefined input", () => {
      expect(titlelize(undefined as any)).toBe(undefined);
    });

    test("should handle null input", () => {
      expect(titlelize(null as any)).toBe(null);
    });
  });

  test.describe("parseMarkdown", () => {
    test("should convert markdown to HTML", () => {
      const markdown = "# Hello World\nThis is a **bold** text.";
      const expected = "<h1>Hello World</h1>\n<p>This is a <strong>bold</strong> text.</p>\n";
      expect(parseMarkdown(markdown)).toBe(expected);
    });

    test("should handle empty markdown", () => {
      expect(parseMarkdown("")).toBe("");
    });
  });
});