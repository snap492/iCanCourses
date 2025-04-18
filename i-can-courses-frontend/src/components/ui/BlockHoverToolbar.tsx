import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

export const BlockHoverToolbar = ({ hoveredNode }: { hoveredNode: { key: string, element: HTMLElement } | null }) => {
    const [blockPosition, setBlockPosition] = useState<{ top: number; left: number; height: number } | null>(null);
    const [visible, setVisible] = useState(false);
    const [rendered, setRendered] = useState(false); // чтобы держать DOM для плавного скрытия
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

    // Когда панель полностью скрыта, убираем её из DOM
    useEffect(() => {
        if (!visible) {
            const timeout = setTimeout(() => setRendered(false), 300); // Подождать окончания transition
            return () => clearTimeout(timeout);
        } else {
            setRendered(true);
        }
    }, [visible]);

    if (!hoveredNode || !blockPosition || !rendered) return null;

    return ReactDOM.createPortal(
        <div
            ref={toolbarRef}
            className={`block-hover-toolbar ${visible ? "visible" : ""}`}
            style={{
                top: blockPosition.top + window.scrollY + blockPosition.height / 2 - 20,
                left: blockPosition.left - 32,
            }}
        >
            <button>＋</button>
            <button>⠿</button>
        </div>,
        document.body
    );
};
