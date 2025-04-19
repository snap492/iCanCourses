import { useState, useCallback } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { CustomParagraphNode } from "./nodes/CustomParagraphNode";
import { TextNode } from "lexical";

import { BlockHoverToolbar } from "./ui/BlockHoverToolbar";
import BlockTypeSelector from "./ui/BlockTypeSelector";

import "./LexiaEditor.css";
import { EditorContent } from "./EditorContent"; // 👈 Новый файл!

const editorConfig = {
    namespace: "LexiaEditor",
    theme: {},
    onError(error: any) {
        console.error(error);
    },
    nodes: [CustomParagraphNode, TextNode],
};

export default function LexiaEditor() {
    const [hoveredNode, setHoveredNode] = useState<null | { key: string; element: HTMLElement }>(null);
    const [blockType, setBlockType] = useState("paragraph");
    const [activeId, setActiveId] = useState<string | null>(null);

    const handleHoverNode = useCallback((node: { key: string; element: HTMLElement } | null) => {
        setHoveredNode(node);
    }, []);

    const handleBlockTypeChange = (type: string) => {
        setBlockType(type);
    };

    return (
        <LexicalComposer initialConfig={editorConfig}>
            <EditorContent
                hoveredNode={hoveredNode}
                setHoveredNode={setHoveredNode}
                blockType={blockType}
                setBlockType={handleBlockTypeChange}
                activeId={activeId}
                setActiveId={setActiveId}
            />        
        </LexicalComposer>
    );
}
