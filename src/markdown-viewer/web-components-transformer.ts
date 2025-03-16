import { Token } from "markdown-it";
import { Link } from "./link-transform-ruler";

import { tag as BPMNTag } from "../bpmn-viewer";
import { tag as BusinessModelCanvasTag } from "../business-model-canvas";
import { tag as BusinessReferenceArchitecturesTag } from "../business-reference-architecture";
import { tag as CommandTag } from "../command-viewer";
import { tag as DMNTag } from "../dmn-viewer";
import { tag as EventTag } from "../event-viewer";
import { tag as ModelTag } from "../model-viewer";
import { tag as QueryTag } from "../query-viewer";
import { tag as TaskTag } from "../task-viewer";

export const components = [
    { extensions: [".bpmn"], tag: BPMNTag },
    { extensions: ["business-model-canvas.yml", "business-model-canvas.yaml"], tag: BusinessModelCanvasTag },
    { extensions: ["business-reference-architecture.yml", "business-reference-architecture.yaml"], tag: BusinessReferenceArchitecturesTag },
    { extensions: [".command.yml", ".command.yaml"], tag: CommandTag },
    { extensions: [".dmn"], tag: DMNTag },
    { extensions: [".event.yml", ".event.yaml"], tag: EventTag },
    { extensions: [".model.yml", ".model.yaml"], tag: ModelTag },
    { extensions: [".query.yml", ".query.yaml"], tag: QueryTag },
    { extensions: [".task.yml", ".task.yaml"], tag: TaskTag }
];

export default function (token: Token, link: Link) : void {
    if(!token.type.startsWith("link_")) {
        return;
    }

    const tag = getTag();
    if(!tag) {
        return;
    }

    token.tag = tag;
    token.block = true;
    replaceHrefWithSrcAttribute();

    function replaceHrefWithSrcAttribute() {
        token.attrPush(["src", link.getAttribute("href") as string]);
        const hrefIndex = token.attrIndex("href");
        token.attrs?.splice(hrefIndex, 1);
    }

    function getTag() : string | undefined | null {
        const path = link.getPath();
        return path ? components.find(component => component.extensions.some(extension => path.endsWith(extension)))?.tag : null;
    }
}
