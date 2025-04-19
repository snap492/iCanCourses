import { DecoratorNode, LexicalEditor, NodeKey, SerializedLexicalNode, EditorConfig } from "lexical";
import * as React from "react";
import { JSX } from "react";

type SerializedCustomParagraphNode = SerializedLexicalNode;

export class CustomParagraphNode extends DecoratorNode<JSX.Element> {
    static getType(): string {
        return "custom-paragraph";
    }

    static clone(node: CustomParagraphNode): CustomParagraphNode {
        return new CustomParagraphNode(node.__key);
    }

    constructor(key?: NodeKey) {
        super(key);
    }

    createDOM(config: EditorConfig, editor: LexicalEditor): HTMLElement {
        const div = document.createElement("div");
        div.className = "custom-paragraph";
        return div;
    }

    updateDOM(prevNode: CustomParagraphNode, dom: HTMLElement): boolean {
        return false;
    }

    decorate(): JSX.Element {
        return <div>Пустой параграф</div>;
    }

    static importJSON(serializedNode: SerializedCustomParagraphNode): CustomParagraphNode {
        return new CustomParagraphNode();
    }

    exportJSON(): SerializedCustomParagraphNode {
        return {
            type: "custom-paragraph",
            version: 1,
        };
    }
}
