import MarkdownIt, { Token } from "markdown-it";
import { nestedHeadersRulePlugin } from "./nested-headers-rule";
import { tabsRulePlugin } from "./tabs-rule";
import { moveBlockItemsRulerPlugin } from "./move-block-items-ruler";
import { ListItem } from "./tabs-ruler";
import { driverRulerPlugin } from "./driver-ruler";
import { rewriteUrlRulerPlugin } from "./rewrite-url-ruler";

export function createMarkdownIt(src: string) {
    const md = MarkdownIt();
    md.use(nestedHeadersRulePlugin, {
        isAriaExpanded: (level: number) => {
            if (level > 2) {
                return false;
            }

            return undefined;
        }
    });

    md.use(tabsRulePlugin, {
        listItemIsTabPanel: (listItem: ListItem): boolean => {
            const link = listItem.findToken("link_open");
            if(!link) {
                return false;
            }

            const href = gerHrefFromToken(link);
            if(!href) {
                return false;
            }

            return components.some(component => component.extensions.some(extension => href.endsWith(extension)));
        }
    });

    md.use(rewriteUrlRulerPlugin, { src });

    md.use(driverRulerPlugin, {
        tokenToHtml: (token: Token) => {
            const href = gerHrefFromToken(token);
            if(!href) {
                return;
            }

            const component = components.find(component => component.extensions.some(extension => href.endsWith(extension)));
            if(!component) {
                return;
            }

            const drivers =  actions.filter(action => component.actions?.includes(action.action));
            if(drivers.length === 0) {
                return `<${component.tag} src="${href}"></${component.tag}>`;
            }

            return `
                <bdo-driver>
                    ${drivers
                        .map(driver => `
                            <bdo-button slot="driver" data-action="${driver.action}" title="${driver.title}">
                                <bdo-icon icon="${driver.icon}"></bdo-icon>
                            </bdo-button>
                        `)
                        .join("\n")}
                    <${component.tag} src="${href}"></${component.tag}>
                </bdo-driver>
            `;
        }
    });

    md.use(moveBlockItemsRulerPlugin);

    return md;
}

export const components = [
    { extensions: [".bpmn"], tag: "bpmn-viewer", actions: ["toggle-fullscreen", "zoom-in", "zoom-out", "zoom-reset"] },
    { extensions: ["business-model-canvas.yml", "business-model-canvas.yaml"], tag: "business-model-canvas", actions: ["toggle-fullscreen"] },
    { extensions: ["business-reference-architecture.yml", "business-reference-architecture.yaml"], tag: "business-reference-architecture", actions: ["toggle-fullscreen"] },
    { extensions: [".command.yml", ".command.yaml"], tag: "command-viewer", actions: ["toggle-fullscreen"] },
    { extensions: [".dmn"], tag: "dmn-viewer", actions: ["toggle-fullscreen"] },
    { extensions: [".event.yml", ".event.yaml"], tag: "event-viewer", actions: ["toggle-fullscreen"] },
    { extensions: [".feature"], tag: "feature-viewer", actions: ["toggle-fullscreen"] },
    { extensions: [".mmd"], tag: "mermaid-viewer", actions: ["toggle-fullscreen"] },
    { extensions: [".model.yml", ".model.yaml"], tag: "model-viewer", actions: ["toggle-fullscreen"] },
    { extensions: [".query.yml", ".query.yaml"], tag: "query-viewer" },
    { extensions: [".task.yml", ".task.yaml"], tag: "task-viewer" }
];

const actions = [
    { action: "toggle-fullscreen", title: "Toggle Fullscreen", icon: "mat-fullscreen" },
    { action: "zoom-in", title: "Zoom In", icon: "mat-zoom_in" },
    { action: "zoom-out", title: "Zoom Out", icon: "mat-zoom_out" },
    { action: "zoom-reset", title: "Zoom Reset", icon: "mat-reset_focus" }
];

function gerHrefFromToken(token: Token): string | undefined {
    return token.attrGet("href")?.split("?")[0]?.split("#")[0];
}
