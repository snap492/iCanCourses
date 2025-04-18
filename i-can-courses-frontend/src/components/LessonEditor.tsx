// src/components/LessonEditor.tsx

import React from "react";
//import { ContentEditableEditor } from "./ContentEditableEditor";
import  LexiaEditor   from "./LexiaEditor";

export const LessonEditor: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4"></h1>
            <LexiaEditor />
        </div>
    );
};
