// === src/exctentions/ICTaskListItem.tsx ================

import { TaskItem } from '@tiptap/extension-task-item'
import { mergeAttributes } from '@tiptap/core'

export const ICTaskListItem = TaskItem.extend({
  renderHTML({ node, HTMLAttributes }) {
    return [
      'li',
      mergeAttributes(HTMLAttributes, {
        class: 'flex items-start gap-2 text-wrap break-words',
      }),
      [
        'label',
        { class: 'flex items-start gap-2 w-full' },
        [
          'input',
          {
            type: 'checkbox',
            checked: node.attrs.checked,
            'data-node-view-wrapper': '',
          },
        ],
        ['div', { class: 'flex-1', 'data-node-view-content': '' }],
      ],
    ]
  },
})
