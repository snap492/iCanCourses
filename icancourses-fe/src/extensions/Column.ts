import { Node, mergeAttributes } from '@tiptap/core';

export const Column = Node.create({
    name: 'column',

    group: 'block',
    content: 'block+',
    defining: true,

    parseHTML() {
        return [
            {
                tag: 'div[data-type="column"]',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'div',
            mergeAttributes(HTMLAttributes, {
                'data-type': 'column',
                class: 'tiptap-column flex-1 p-3 border border-gray-300 rounded min-w-[0]',
            }),
            0,
        ];
    },
});
