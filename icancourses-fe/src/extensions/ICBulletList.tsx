// ICBulletList.ts
import { BulletList as TiptapBulletList } from '@tiptap/extension-bullet-list';

export const ICBulletList = TiptapBulletList.extend({
    name: 'bulletList',

    group: 'block list',

    parseHTML() {
        return [{ tag: 'ul' }];
    },

    renderHTML({ HTMLAttributes }) {
        return ['ul', { ...HTMLAttributes, class: 'list-disc list-inside pl-6' }, 0];
    },
});
