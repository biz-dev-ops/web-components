import MarkdownIt from "markdown-it";
import transformer, { components } from "./web-components-transformer";
const extensions = components.flatMap(c => c.extensions);

const md = MarkdownIt();

import nestedHeadersRule from "./nested-headers-rule";
md.use(nestedHeadersRule);

import tabsRuler from "./tabs-ruler";
md.use(tabsRuler, { extensions: extensions });

import linkTransformRuler from "./link-transform-ruler";
md.use(linkTransformRuler, { transformer: transformer });

import tabsRule from "./tabs-rule";
md.use(tabsRule);

export default md;