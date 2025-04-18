import { ParagraphNode, SerializedParagraphNode, Spread } from "lexical";
import { ReactNode } from "react";

export class CustomParagraphNode extends ParagraphNode {
    static getType(): string {
        return "custom-paragraph";
    }

    static clone(node: CustomParagraphNode): CustomParagraphNode {
        return new CustomParagraphNode(node.__key);
    }

    createDOM(): HTMLElement {
        const dom = document.createElement("div");
        dom.className = "editor-block";
        return dom;
    }

    updateDOM(): boolean {
        return false;
    }
}

export function $createCustomParagraphNode(): CustomParagraphNode {
    return new CustomParagraphNode();
}

export function $isCustomParagraphNode(node: unknown): node is CustomParagraphNode {
    return node instanceof CustomParagraphNode;
}
