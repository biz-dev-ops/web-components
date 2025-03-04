import { marked } from "marked";

export function titlelize(name: string) {
    if (!name)
        return name;

    return (name.charAt(0).toUpperCase() + name.slice(1))
        .replaceAll("_", " ")
        .replaceAll("-", " ");
}

export function parseMarkdown(markdown: string): string {
    return marked.parse(markdown) as string;
}