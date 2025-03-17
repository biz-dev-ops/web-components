import { LitElement } from "lit";
import MarkdownIt from "markdown-it";
const md = MarkdownIt();

export function titlelize(name: string) {
    if (!name)
        return name;

    return (name.charAt(0).toUpperCase() + name.slice(1))
        .replaceAll("_", " ")
        .replaceAll("-", " ");
}

export function parseMarkdown(markdown: string): string {
    return md.render(markdown);
}

const appendedFontToDomFaceForElements: string[] = [];

export function appendFontFaceDefinitionToDom(element: LitElement) {
    if(appendedFontToDomFaceForElements.some(tag => tag == element.tagName)) {
        return;
    }

    appendedFontToDomFaceForElements.push(element.tagName);

    [...element.shadowRoot?.adoptedStyleSheets as any, ...element.shadowRoot?.styleSheets as any]
      .flatMap(styleSheet => [...styleSheet.cssRules])
      .filter(rule => rule.constructor === CSSFontFaceRule)
      .map(rule => addFontRuleToHeadIfItDoesNotExist(rule.cssText));
}

const randomStyleId = `style-${Math.random().toString(36).substring(2)}`;

function addFontRuleToHeadIfItDoesNotExist(css: string) {
    const style = document.querySelector(`head style[data-style-id="${randomStyleId}"]`);

    if (!style) {
      const newStyle = document.createElement("style");
      newStyle.setAttribute("data-style-id", randomStyleId);
      document.head.appendChild(newStyle);
      newStyle.textContent = css;
      return;
    }

    if(!style.textContent) {
        style.textContent = css;
        return;
    }

    if (!style.textContent.includes(css)) {
        style.textContent += `\n\n${css}`;
        return;
    }
  }