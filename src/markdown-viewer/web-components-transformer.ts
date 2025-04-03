import path from "node:path";
import { Link } from "./link-transform-ruler";

export const components = [
    { extensions: [".bpmn"], tag: "bpmn-viewer" },
    { extensions: ["business-model-canvas.yml", "business-model-canvas.yaml"], tag: "business-model-canvas" },
    { extensions: ["business-reference-architecture.yml", "business-reference-architecture.yaml"], tag: "business-reference-architecture" },
    { extensions: [".command.yml", ".command.yaml"], tag: "command-viewer" },
    { extensions: [".dmn"], tag: "dmn-viewer" },
    { extensions: [".event.yml", ".event.yaml"], tag: "event-viewer" },
    { extensions: [".feature"], tag: "feature-viewer" },
    { extensions: [".mmd"], tag: "mermaid-viewer" },
    { extensions: [".model.yml", ".model.yaml"], tag: "model-viewer" },
    { extensions: [".query.yml", ".query.yaml"], tag: "query-viewer" },
    { extensions: [".task.yml", ".task.yaml"], tag: "task-viewer" }
];

export function urlRewriterFactory(src: string) : (link: Link) => void {
    return (link: Link) => {
        const href = link.getAttribute("href")!;
        if(!href) {
            return;
        }
        const newHref = path.join(path.dirname(src), href);
        link.tokens.find(token => token.type === "link_open")?.attrSet("href", newHref);
    }
}

export function transformComponentLink(link: Link) : void {
    const tag = getTag();

    if(!tag) {
        return;
    }

    const href = link.getAttribute("href")!;

    link.tokens
        .filter(token => token.type.startsWith("link_"))
        .forEach(token => {
            token.tag = tag;
            token.block = true;
            token.attrPush(["src", href]);
            const hrefIndex = token.attrIndex("href");
            if(hrefIndex > -1) {
                token.attrs?.splice(hrefIndex, 1);
            }
        });

    function getTag() : string | undefined | null {
        const path = link.getPath();
        if(!path) {
            return null;
        }

        return components.find(component => component.extensions.some(extension => path.endsWith(extension)))?.tag;
    }
}
