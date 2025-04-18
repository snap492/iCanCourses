import { useCallback, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

import { CustomParagraphNode } from "./nodes/CustomParagraphNode";
import { TextNode } from "lexical";
import BlockHoverPlugin from "./plugins/BlockHoverPlugin";

import "./LexiaEditor.css";
import { BlockHoverToolbar } from "./ui/BlockHoverToolbar";
import BlockTypeSelector from "./ui/BlockTypeSelector";

const editorConfig = {
    namespace: "LexiaEditor",
    theme: {},
    onError(error: any) {
        console.error(error);
    },
    nodes: [
        CustomParagraphNode,
        TextNode,
    ],
};

export default function LexiaEditor() {
    const [hoveredNode, setHoveredNode] = useState<null | { key: string; element: HTMLElement }>(null);
    const [blockType, setBlockType] = useState("paragraph");

    const handleHoverNode = useCallback((node: { key: string; element: HTMLElement } | null) => {
        setHoveredNode(node);
    }, []);
    const handleBlockTypeChange = (type: string) => {
        setBlockType(type);
    };
    return (
        <LexicalComposer initialConfig={editorConfig}>
            <div className="editor-container">
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable
                            className="editor-input editor-container"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px",
                            }}
                        />
                    }
                    placeholder={<div>Начните писать...</div>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                <OnChangePlugin onChange={(editorState) => { }} />
                <BlockHoverPlugin onHoverNode={handleHoverNode} />               
            </div>
            <BlockHoverToolbar hoveredNode={hoveredNode} />
            <BlockTypeSelector onChange={handleBlockTypeChange} />
        </LexicalComposer>
    );
}
