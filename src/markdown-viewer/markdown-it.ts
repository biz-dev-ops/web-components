import MarkdownIt from "markdown-it";
import webComponents from "./web-components";

const md = MarkdownIt();

import tabsRuler from "./tabs-ruler";
md.use(tabsRuler, { extensions: webComponents.flatMap(c => c.extensions) });

import tabsRule from "./tabs-rule";
md.use(tabsRule);

import webComponentLinkRule from "./webcomponent-link-rule";
md.use(webComponentLinkRule, { mappings: webComponents });

export default md;