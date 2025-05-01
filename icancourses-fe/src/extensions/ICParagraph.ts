import Paragraph, { Paragraph as TiptapParagraph } from '@tiptap/extension-paragraph';

export const ICParagraph = TiptapParagraph.extend({
    name: 'paragraph',

    renderHTML({ node, HTMLAttributes }) {
        // Check if the parent is a list item by inspecting the node's attributes or context
        const isInsideListItem = node.attrs?.parentType === 'listItem';

        if (isInsideListItem) {
            return ['span', HTMLAttributes, 0]; // Render as <span> if inside <li>
        }

        // Default behavior: render as <p>
        return ['p', { ...HTMLAttributes, class: 'pl-4' }, 0];
    },
});
