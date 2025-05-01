import Heading from '@tiptap/extension-heading';

export const ICHeading = Heading.extend({
    renderHTML({ node, HTMLAttributes }) {
        const level = node.attrs.level;
        const tag = `h${level}`;

        const tailwindSize = {
            1: 'text-5xl ',
            2: 'text-4xl',
            3: 'text-3xl',
            4: 'text-2xl',
            5: 'text-xl',
            6: 'text-lg',
        }[level] || 'text-base';

        return [tag, { ...HTMLAttributes, class: tailwindSize }, 0];
    },
});
