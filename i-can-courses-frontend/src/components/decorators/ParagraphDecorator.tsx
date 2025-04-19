// src/components/decorators/ParagraphDecorator.tsx

import React, { useEffect, useRef } from "react";

interface ParagraphDecoratorProps {
    nodeKey: string; // The unique key of the node
}

export const ParagraphDecorator: React.FC<ParagraphDecoratorProps> = ({ nodeKey }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const handleFocus = () => {
            ref.current?.classList.add("focused");
        };

        const handleBlur = () => {
            ref.current?.classList.remove("focused");
        };

        const element = ref.current;
        element.addEventListener("focus", handleFocus);
        element.addEventListener("blur", handleBlur);

        return () => {
            element.removeEventListener("focus", handleFocus);
            element.removeEventListener("blur", handleBlur);
        };
    }, []);

    return (
        <div
            ref={ref}
            className="paragraph-decorator"
            tabIndex={0} // Makes the div focusable
        >
            Paragraph with key: {nodeKey}
        </div>
    );
};
