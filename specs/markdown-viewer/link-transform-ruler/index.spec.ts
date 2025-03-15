import { test, expect } from "@sand4rt/experimental-ct-web";
import MarkdownIt from "markdown-it";
import linkTransformRuler from "../../../src/markdown-viewer/link-transform-ruler"; // Adjust the import path

test.describe("linkTransformRuler Plugin", () => {
  test("should move link tokens with specified extensions out of inline", async ({}) => {
    const md = new MarkdownIt();
    md.use(linkTransformRuler, { extensions: [".pdf"] });

    const markdown = "[Link to PDF](document.pdf) Some other text.";
    const result = md.render(markdown);

    expect(result).toContain(`<a href="document.pdf">Link to PDF</a>`);
    expect(result).not.toContain(`<p><a href="document.pdf">Link to PDF</a></p>`);
    expect(result).toContain("Some other text.");
  });

  test("should not move link tokens with other extensions", async ({}) => {
    const md = new MarkdownIt();
    md.use(linkTransformRuler, { extensions: [".pdf"] });

    const markdown = "[Link to image](image.jpg) Some other text.";
    const result = md.render(markdown);

    expect(result).toContain(`<p><a href="image.jpg">Link to image</a> Some other text.</p>`);
  });

  test("should handle multiple links with the specified extension", async ({}) => {
    const md = new MarkdownIt();
    md.use(linkTransformRuler, { extensions: [".pdf", ".doc"] });

    const markdown = "[PDF link](doc.pdf) [DOC link](report.doc) Some text. [Image link](image.jpg)";
    const result = md.render(markdown);

    expect(result).toContain(`<a href="doc.pdf">PDF link</a>`);
    expect(result).toContain(`<a href="report.doc">DOC link</a>`);
    expect(result).toContain(`<p>  Some text. <a href="image.jpg">Image link</a></p>`);
  });

  test("should remove empty paragraphs when link is moved", async ({}) => {
    const md = new MarkdownIt();
    md.use(linkTransformRuler, { extensions: [".pdf"] });

    const markdown = "[PDF link](doc.pdf)\n\nSome text.";
    const result = md.render(markdown);

    expect(result).toContain(`<a href="doc.pdf">PDF link</a>`);
    expect(result).toContain("<p>Some text.</p>");
    expect(result).not.toContain("<p></p>");
  });

  test("should handle links inside of other inline elements", async ({}) => {
    const md = new MarkdownIt();
    md.use(linkTransformRuler, { extensions: [".pdf"] });

    const markdown = "**[PDF link](doc.pdf)**\n\nSome text.";
    const result = md.render(markdown);

    expect(result).toContain(`<a href="doc.pdf">PDF link</a>`);
    expect(result).toContain("<p>Some text.</p>");
  });

  test("should handle multiple links within a single paragraph", async ({}) => {
    const md = new MarkdownIt();
    md.use(linkTransformRuler, { extensions: [".pdf"] });

    const markdown = "[PDF link](doc.pdf) and [another PDF link](report.pdf) and some text";
    const result = md.render(markdown);

    expect(result).toContain(`<a href="doc.pdf">PDF link</a>`);
    expect(result).toContain(`<a href="report.pdf">another PDF link</a>`);
    expect(result).toContain("and some text");

  });

  test("should handle links with query parameters", async ({}) => {
    const md = new MarkdownIt();
    md.use(linkTransformRuler, { extensions: [".pdf"] });

    const markdown = "[PDF link](doc.pdf?param=value)";
    const result = md.render(markdown);

    expect(result).not.toContain(`<p>`);
  });

  test("should handle links with hashes", async ({}) => {
    const md = new MarkdownIt();
    md.use(linkTransformRuler, { extensions: [".pdf"] });

    const markdown = "[PDF link](doc.pdf#section)";
    const result = md.render(markdown);

    expect(result).not.toContain(`<p>`);
  });
});