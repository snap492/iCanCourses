import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import  BlockHoverPlugin  from "./plugins/BlockHoverPlugin";
import { BlockHoverToolbar } from "./ui/BlockHoverToolbar";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { $getRoot, ElementNode } from "lexical";

type Props = {
    hoveredNode: { key: string; element: HTMLElement } | null;
    setHoveredNode: (node: { key: string; element: HTMLElement } | null) => void;
    activeId: string | null;
    setActiveId: (id: string | null) => void;
    blockType: string;
    setBlockType: (type: string) => void;
};

export function EditorContent({
    hoveredNode,
    setHoveredNode,
    activeId,
    setActiveId,
}: Props) {
    const [editor] = useLexicalComposerContext();

    const handleDragStart = (event: any) => {
        if (event.active?.id) {
            setActiveId(event.active.id as string);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { over } = event;

        if (activeId && over && activeId !== over.id) {
            editor.update(() => {
                const root = $getRoot();
                const children = root.getChildren();

                const activeNode = children.find((node) => node.getKey() === activeId) as ElementNode | undefined;
                const overNode = children.find((node) => node.getKey() === over.id) as ElementNode | undefined;

                if (activeNode && overNode) {
                    activeNode.remove();
                    overNode.insertBefore(activeNode);
                }
            });
        }

        setActiveId(null);
    };

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="editor-container">
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable
                            className="editor-content"
                            style={{
                                marginLeft: "25px",
                            }}
                        />
                    }
                    placeholder={<div className="editor-placeholder">Начните писать...</div>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                <OnChangePlugin onChange={() => { }} />
                <BlockHoverPlugin onHoverNode={setHoveredNode} />
                <BlockHoverToolbar hoveredNode={hoveredNode} />
            </div>
        </DndContext>
    );
}
