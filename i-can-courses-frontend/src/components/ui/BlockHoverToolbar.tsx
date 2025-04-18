import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
interface BlockHoverToolbarProps {
    hoveredNode: { key: string; element: HTMLElement } | null;
   
}

export const BlockHoverToolbar = ({ hoveredNode }: BlockHoverToolbarProps) => {
    const [blockPosition, setBlockPosition] = useState<{ top: number; left: number; height: number } | null>(null);
    const [visible, setVisible] = useState(false);
    const [rendered, setRendered] = useState(false);
    const toolbarRef = useRef<HTMLDivElement>(null);
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!hoveredNode) {
            scheduleHide();
            return;
        }

        const rect = hoveredNode.element.getBoundingClientRect();
        setBlockPosition({
            top: rect.top,
            left: rect.left,
            height: rect.height,
        });
        setRendered(true);
        setVisible(true);
    }, [hoveredNode]);

    const scheduleHide = () => {
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = setTimeout(() => {
            setVisible(false);
        }, 1000);
    };

    const cancelHide = () => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }
    };

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const toolbar = toolbarRef.current;
            const block = hoveredNode?.element;
            const target = event.target as Node;

            const isOverToolbar = toolbar?.contains(target) ?? false;
            const isOverBlock = block?.contains(target) ?? false;

            if (isOverToolbar || isOverBlock) {
                cancelHide();
            } else {
                scheduleHide();
            }
        };

        const handleMouseDown = (event: MouseEvent) => {
            const toolbar = toolbarRef.current;
            const block = hoveredNode?.element;
            const target = event.target as Node;

            const isInsideToolbar = toolbar?.contains(target) ?? false;
            const isInsideBlock = block?.contains(target) ?? false;

            if (!isInsideToolbar && !isInsideBlock) {
                setVisible(false);
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mousedown", handleMouseDown);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mousedown", handleMouseDown);
        };
    }, [hoveredNode]);

    useEffect(() => {
        if (!visible) {
            const timeout = setTimeout(() => setRendered(false), 300);
            return () => clearTimeout(timeout);
        } else {
            setRendered(true);
        }
    }, [visible]);

    if (!hoveredNode || !blockPosition || !rendered) return null;
  
    // Add a new block below the hovered block
        return ReactDOM.createPortal(
        <div
            ref={toolbarRef}
            className={`block-hover-toolbar ${visible ? "visible" : ""}`}
            style={{
                top: blockPosition.top + blockPosition.height / 2,
                left: blockPosition.left - 50,
            }}
        >
            <button >＋</button>
            <button >⠿</button>
        </div>,
        document.body
    );
};
