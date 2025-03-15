import MarkdownIt from "markdown-it";
import transformer from "./web-components-transformer";
import { components } from "./web-components-transformer";
const extensions = components.flatMap(c => c.extensions);

const md = MarkdownIt();

import linkTransformRuler from "./link-transform-ruler";
md.use(linkTransformRuler, { extensions: extensions });

import linkTransformRule from "./link-transform-rule";
md.use(linkTransformRule, { transformer: transformer });

import tabsRuler from "./tabs-ruler";
md.use(tabsRuler, { extensions: extensions });

import tabsRule from "./tabs-rule";
md.use(tabsRule);


export default md;