// ===src/extansions/ICParagraph.ts ============
import Paragraph from '@tiptap/extension-paragraph'
import { mergeAttributes } from '@tiptap/core'

export const ICParagraph = Paragraph.extend({
    renderHTML({ HTMLAttributes }) {
        // ВАЖНО: mergeAttributes должен учитывать переданные классы
        const baseClass = 'text-base leading-6 text-gray-800 text-wrap'
        const userClass = HTMLAttributes.class ?? ''
     
        const fullClass = [baseClass, userClass].filter(Boolean).join(' ')

        return ['p', { ...HTMLAttributes, class: fullClass }, 0]
    },
})
