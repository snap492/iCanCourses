// ===src/extansions/ICParagraph.ts ============
import Paragraph from '@tiptap/extension-paragraph'

export const ICParagraph = Paragraph.extend({
    renderHTML({ node, HTMLAttributes }) {
        const baseClass = 'text-base leading-6 text-gray-800 text-wrap';
        const userClass = HTMLAttributes.class ?? '';

        //const isEmpty = node.content.size === 0;
        const hintClass = HTMLAttributes['data-exit-hint'] ? 'exit-hint' : '';

        const fullClass = [baseClass, userClass, hintClass].filter(Boolean).join(' ');

        // Удалим data-exit-hint из HTMLAttributes, чтобы не рендерилось
        const { ['data-exit-hint']: _, ...restAttrs } = HTMLAttributes;

        return ['p', { ...restAttrs, class: fullClass }, 0];
    },

})

