// === src/components/ToolbarBubble.tsx ================

import React, { useEffect, useRef, useState } from 'react';

interface Option {
    label: React.ReactNode | string;
    value: string;
    onClick: () => void;
}

interface Props {
    selectedLabel: React.ReactNode | string;
    options: Option[];
}

export default function ToolbarBubble({ selectedLabel, options }: Props) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="px-3 py-1 border rounded border-gray-300 hover:bg-gray-200"
            >
                {selectedLabel}
            </button>
            {open && (
                <div className="absolute top-full left-0 z-50 mt-1 flex rounded border border-gray-300 bg-white shadow-md">
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => {
                                opt.onClick();
                                setOpen(false);
                            }}
                            className="px-4 py-2 hover:bg-gray-100 border-gray-300 border-r last:border-r-0"
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
        