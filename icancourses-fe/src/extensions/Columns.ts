import { Node, mergeAttributes } from '@tiptap/core';
import { RawCommands, CommandProps } from '@tiptap/core'; // важно для типов

export const Columns = Node.create({
    name: 'columns',

    group: 'block',
    content: 'column+',

    parseHTML() {
        return [
            {
                tag: 'div[data-type="columns"]',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'columns', class: 'flex gap-4' }), 0];
    },

    addCommands() {
        return {
            insertColumns:
                (count: number = 2) =>
                    ({ commands }: CommandProps) => {
                        const columnsContent = [];

                        for (let i = 0; i < count; i++) {
                            columnsContent.push({
                                type: 'column',
                                content: [
                                    {
                                        type: 'paragraph',
                                        content: [
                                            {
                                                type: 'text',
                                                text: ` `,
                                            },
                                        ],
                                    },
                                ],
                            });
                        }

                        return commands.insertContent({
                            type: this.name,
                            content: columnsContent,
                        });
                    },
        } satisfies Partial<RawCommands>; // <-- ключевая часть
    },
});
