import MarkdownIt from "markdown-it";
import transformer, { components } from "./web-components-transformer";
const extensions = components.flatMap(c => c.extensions);

const md = MarkdownIt();

import nestedHeadersRulePlugin from "./nested-headers-rule";
md.use(nestedHeadersRulePlugin);

import tabsRulePlugin from "./tabs-rule";
md.use(tabsRulePlugin, { extensions: extensions });

import linkTransformRulerPlugin from "./link-transform-ruler";
md.use(linkTransformRulerPlugin, { transformer: transformer });

export default md;