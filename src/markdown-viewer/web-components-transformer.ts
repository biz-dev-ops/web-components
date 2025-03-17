import { Token } from "markdown-it";
import { Link } from "./link-transform-ruler";

export const components = [
    { extensions: [".bpmn"], tag: "bpmn-viewer" },
    { extensions: ["business-model-canvas.yml", "business-model-canvas.yaml"], tag: "business-model-canvas" },
    { extensions: ["business-reference-architecture.yml", "business-reference-architecture.yaml"], tag: "business-reference-architecture" },
    { extensions: [".command.yml", ".command.yaml"], tag: "command-viewer" },
    { extensions: [".dmn"], tag: "dmn-viewer" },
    { extensions: [".event.yml", ".event.yaml"], tag: "event-viewer" },
    { extensions: [".model.yml", ".model.yaml"], tag: "model-viewer" },
    { extensions: [".query.yml", ".query.yaml"], tag: "query-viewer" },
    { extensions: [".task.yml", ".task.yaml"], tag: "task-viewer" }
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
