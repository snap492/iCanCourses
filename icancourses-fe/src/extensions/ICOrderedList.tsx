// ICOrderedList.ts
import { OrderedList as TiptapOrderedList } from '@tiptap/extension-ordered-list';

export const ICOrderedList = TiptapOrderedList.extend({
    name: 'orderedList',

    group: 'block list',

    parseHTML() {
        return [{ tag: 'ol' }];
    },

    renderHTML({ HTMLAttributes }) {
        return ['ol', { ...HTMLAttributes, class: 'list-decimal list-inside pl-6' }, 0];
    },
});
