// ICListItem.ts
import { ListItem as TiptapListItem } from '@tiptap/extension-list-item';

export const ICListItem = TiptapListItem.extend({
    name: 'listItem',

    content: 'paragraph block*', // ��� ������� ��������� �������

    parseHTML() {
        return [{ tag: 'li' }];
    },

    renderHTML({ HTMLAttributes }) {
        return ['li', HTMLAttributes, 0];
    },
});
