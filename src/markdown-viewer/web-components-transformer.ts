import { tag as BPMNTag } from "../bpmn-viewer";
import { tag as BusinessModelCanvasTag } from "../business-model-canvas";
import { tag as BusinessReferenceArchitecturesTag } from "../business-reference-architecture";
import { tag as CommandTag } from "../command-viewer";
import { tag as DMNTag } from "../dmn-viewer";
import { tag as EventTag } from "../event-viewer";
import { tag as QueryTag } from "../query-viewer";
import { tag as TaskTag } from "../task-viewer";

import { Link, TransformResultOrNull } from "./link-transform-rule";

export const components = [
    { extensions: [".bpmn"], tag: BPMNTag },
    { extensions: ["business-model-canvas.yml", "business-model-canvas.yaml"], tag: BusinessModelCanvasTag },
    { extensions: ["business-reference-architecture.yml", "business-reference-architecture.yaml"], tag: BusinessReferenceArchitecturesTag },
    { extensions: [".command.yml", ".command.yaml"], tag: CommandTag },
    { extensions: [".dmn"], tag: DMNTag },
    { extensions: [".event.yml", ".event.yaml"], tag: EventTag },
    { extensions: [".query.yml", ".query.yaml"], tag: QueryTag },
    { extensions: [".task.yml", ".task.yaml"], tag: TaskTag }
];

export default function (link: Link) : TransformResultOrNull {
    const href = link.getAttribute("href");
    if(!href) {
        return null;
    }

    const url = removeQueryStringAndAnchorsFrom(href);
    const tag = components.find(component => component.extensions.some(extension => url.endsWith(extension)))?.tag;

    if(!tag) {
        return null;
    }

    return {
        open: `<${tag} src="${href}" aria-label="${link.getText()}">`,
        close: `</${tag}>`
    }
}

function removeQueryStringAndAnchorsFrom(href: string) {
    return href.split('?')[0].split('#')[0];
}
