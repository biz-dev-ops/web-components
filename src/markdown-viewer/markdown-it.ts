import MarkdownIt from "markdown-it";
import { urlRewriterFactory, transformComponentLink, components } from "./web-components-transformer";
import nestedHeadersRulePlugin from "./nested-headers-rule";
import tabsRulePlugin from "./tabs-rule";
import linkTransformRulerPlugin from "./link-transform-ruler";
import { ListItem } from "./tabs-ruler";

const extensions = components.flatMap(c => c.extensions);

const listItemIsTabPanel = (listItem: ListItem): boolean => {
    return extensions.some(extension => listItem.getLink()?.getPath()?.endsWith(extension));
};

export default function mdFactory(src: string) {
    const md = MarkdownIt();
    md.use(nestedHeadersRulePlugin, {
        isAriaExpanded: (level: number) => {
            if (level > 2) {
                return false;
            }

            return undefined;
        }
    });

    md.use(tabsRulePlugin, {
        listItemIsTabPanel
    });

    md.use(linkTransformRulerPlugin, { transformers: [ urlRewriterFactory(src), transformComponentLink ] });

    return md;
}