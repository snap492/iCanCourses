// ICListItem.ts
import { ListItem as TiptapListItem } from '@tiptap/extension-list-item';

export const ICListItem = TiptapListItem.extend({
    name: 'listItem',

    content: 'paragraph block*', // как требует структура списков

    parseHTML() {
        return [{ tag: 'li' }];
    },

    renderHTML({ HTMLAttributes }) {
        return ['li', HTMLAttributes, 0];
    },
});
