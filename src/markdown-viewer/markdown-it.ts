import MarkdownIt from "markdown-it";
import { components } from "./web-components-transformer"
import transformer from "./web-components-transformer";

const md = MarkdownIt();

import tabsRuler from "./tabs-ruler";
md.use(tabsRuler, { extensions: components.flatMap(c => c.extensions) });

import tabsRule from "./tabs-rule";
md.use(tabsRule);

import linkTransformRule from "./link-transform-rule";
md.use(linkTransformRule, { transformer: transformer });

export default md;