import { useEffect } from "react";
import { $getNearestNodeFromDOMNode, LexicalEditor } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";


interface BlockHoverPluginProps {
    onHoverNode: (node: { key: string; element: HTMLElement } | null) => void;
}

export default function BlockHoverPlugin({ onHoverNode }: BlockHoverPluginProps) {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        const rootElement = editor.getRootElement();
        if (!rootElement) return;

        let lastKey: string | null = null;

        const handleMouseMove = (e: MouseEvent) => {
            editor.read(() => {
                const node = $getNearestNodeFromDOMNode(e.target as Node);
                if (node) {
                    const domElement = editor.getElementByKey(node.getKey());
                    if (domElement && node.getKey() !== lastKey) {
                        lastKey = node.getKey();
                        onHoverNode({ key: node.getKey(), element: domElement });
                    }
                } else {
                    if (lastKey !== null) {
                        lastKey = null;
                        onHoverNode(null);
                    }
                }
            });
        };

        rootElement.addEventListener("mousemove", handleMouseMove);

        return () => {
            rootElement.removeEventListener("mousemove", handleMouseMove);
        };
    }, [editor, onHoverNode]);

    return null;
}
