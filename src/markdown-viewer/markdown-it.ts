import MarkdownIt from "markdown-it";
import transformer, { components } from "./web-components-transformer";
const extensions = components.flatMap(c => c.extensions);

const listItemIsTabPanel = (listItem: ListItem) : boolean => {
    return extensions.some(extension => listItem.getLink()?.getPath()?.endsWith(extension));
};

const md = MarkdownIt();

import nestedHeadersRulePlugin from "./nested-headers-rule";
md.use(nestedHeadersRulePlugin, { isAriaExpanded: (level: number) => { 
    if(level > 2) {
        return false;
    }

    return undefined;
} });

import tabsRulePlugin from "./tabs-rule";
md.use(tabsRulePlugin, {
    listItemIsTabPanel
});

import linkTransformRulerPlugin from "./link-transform-ruler";
import { ListItem } from "./tabs-ruler";

md.use(linkTransformRulerPlugin, { transformer: transformer });

export default md;