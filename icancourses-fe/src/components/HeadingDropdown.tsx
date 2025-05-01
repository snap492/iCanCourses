import Heading from '@tiptap/extension-heading';
import { mergeAttributes } from '@tiptap/react';
import { useState } from 'react';


const headingLevels = [1, 2, 3, 4, 5, 6];

export function HeadingDropdown({ editor }: { editor: any }) {
    const [showMenu, setShowMenu] = useState(false);
    const [activeLevel, setActiveLevel] = useState(1); // по умолчанию H1
        function toggleHeading(level: number) {
            editor.chain().focus().toggleHeading({ level }).run();             
        setActiveLevel(level); 
        setShowMenu(false);     
    }

    return (
        <div className="relative">
            <button
                onClick={() => setShowMenu(!showMenu)}
                className={`px-3 py-1 border rounded  transition hover:bg-gray-200 ${editor.isActive('heading', { level: activeLevel }) ? 'bg-gray-200 border-gray-300 text-blue-800 ' : 'border-gray-300'}`}
            >
                H{activeLevel}
            </button>

            {showMenu && (
                <div className="absolute top-full left-0 z-50 mt-1 flex space-x-1 rounded border border-gray-300 bg-white px-2 py-1 shadow">
                    {headingLevels.map((level) => (
                        <button
                            key={level}
                            onClick={() => toggleHeading(level)}
                            className={`px-3 py-1 text-sm rounded hover:bg-gray-100 transition ${editor.isActive('heading', { level }) ? 'bg-grey-600 text-blue-800' : ''}`}
                        >
                            H{level}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
