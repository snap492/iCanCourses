// ===src/extansions/Columns.ts ============

import { Node, mergeAttributes, RawCommands, CommandProps } from '@tiptap/core';
import { TextSelection, Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

export const Columns = Node.create({
    name: 'columns',

    group: 'block',
    content: 'column+',

    parseHTML() {
        return [
            {
                tag: 'div[data-type="columns"]',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return [
            'div',
            mergeAttributes(HTMLAttributes, {
                'data-type': 'columns',
                class: 'flex gap-4',
            }),
            0,
        ];
    },

    addCommands() {
        return {
            insertColumns:
                (count: number = 2) =>
                    ({ commands, state }) => {
                        const { $from } = state.selection;
                        for (let i = $from.depth; i >= 0; i--) {
                            if ($from.node(i).type.name === 'column') return false;
                        }

                        const columnsContent = [];
                        for (let i = 0; i < count; i++) {
                            columnsContent.push({
                                type: 'column',
                                content: [
                                    {
                                        type: 'paragraph',
                                        content: [
                                            {
                                                type: 'text',
                                                text: ' ',
                                            },
                                        ],
                                    },
                                ],
                            });
                        }

                        return commands.insertContent([
                            {
                                type: this.name,
                                content: columnsContent,
                            },
                            { type: 'paragraph', content: [] },
                        ]);
                    },

            removeColumns:
                () =>
                    ({ editor, state }) => {
                        const { $from } = state.selection;

                        let columnsDepth = -1;
                        for (let i = $from.depth; i >= 0; i--) {
                            if ($from.node(i).type.name === 'columns') {
                                columnsDepth = i;
                                break;
                            }
                        }
                        if (columnsDepth === -1) return false;

                        const columnsNode = $from.node(columnsDepth);
                        let combinedContent: any;

                        for (let i = 0; i < columnsNode.childCount; i++) {
                            const column = columnsNode.child(i);
                            if (isNodeEmpty(column)) continue;
                            combinedContent = combinedContent ? combinedContent.append(column.content) : column.content;
                        }

                        const tr = state.tr;
                        const pos = $from.before(columnsDepth);
                        tr.replaceWith(pos, pos + columnsNode.nodeSize, combinedContent || state.schema.nodes.paragraph.create());

                        editor.view.dispatch(tr);
                        return true;
                    },
        } satisfies Partial<RawCommands>;
    },
    addProseMirrorPlugins() {
        return [
            new Plugin({
                props: {
                    decorations: ({ doc, selection, tr }) => {
                        const decorations = [];
                        const { $from } = selection;

                        // Находим глубину колонки
                        let columnDepth = -1;
                        for (let i = $from.depth; i >= 0; i--) {
                            if ($from.node(i).type.name === 'column') {
                                columnDepth = i;
                                break;
                            }
                        }

                        if (columnDepth === -1) return null;

                        const columnNode = $from.node(columnDepth);
                        const currentNode = $from.node();

                        // Проверяем, что текущий узел - это параграф
                        if (currentNode.type.name !== 'paragraph') return null;

                        // Проверяем, является ли параграф последним в колонке
                        const isLastParagraph = columnNode.child(columnNode.childCount - 1) === currentNode;

                        if (isLastParagraph) {
                            const paragraphPos = $from.pos - currentNode.nodeSize;
                            decorations.push(
                                Decoration.node(
                                    paragraphPos,
                                    paragraphPos + currentNode.nodeSize,
                                    {
                                        class: [
                                            'text-base',
                                            'leading-6',
                                            'text-gray-800',
                                            'text-wrap',
                                            'exit-hint'
                                        ].join(' ')
                                    }
                                )
                            );
                        }

                        return DecorationSet.create(doc, decorations);
                    }
                }
            })

        ];
    },
    addKeyboardShortcuts() {
        return {
            Enter: ({ editor }) => {
                const { state } = editor;
                const { $from } = state.selection;

                // Проверка: есть ли в иерархии родитель columns
                let insideColumns = false;
                for (let i = $from.depth; i >= 0; i--) {
                    if ($from.node(i).type.name === 'columns') {
                        insideColumns = true;
                        break;
                    }
                }

                if (!insideColumns) {
                    return false; // не в columns — не обрабатываем
                }

                // Проверка: находимся ли мы внутри column и columns
                let columnDepth = -1;
                let columnsDepth = -1;

                for (let i = $from.depth; i >= 0; i--) {
                    const node = $from.node(i);
                    if (node.type.name === 'column' && columnDepth === -1) {
                        columnDepth = i;
                    }
                    if (node.type.name === 'columns') {
                        columnsDepth = i;
                        break;
                    }
                }

                if (columnsDepth === -1 || columnDepth === -1) {
                    return false;
                }

                const currentNode = $from.node();
                const columnNode = $from.node(columnDepth);

                if (currentNode.type.name !== 'paragraph') {
                    return false;
                }

                const isEmpty = isNodeEmpty(currentNode);
                const isLastInColumn = columnNode.lastChild === currentNode;

                if (isEmpty && isLastInColumn) {
                    // Выход из блока columns                  
                    const posAfterColumns = $from.after(columnsDepth);
                    const tr = state.tr;

                    tr.insert(posAfterColumns, state.schema.nodes.paragraph.create());
                    tr.setSelection(TextSelection.near(tr.doc.resolve(posAfterColumns + 1)));
                    editor.view.dispatch(tr);

                    return true;
                }

                if (isEmpty && !isLastInColumn) {
                    // Просто добавить новый параграф ниже внутри колонки
                    const tr = state.tr;
                    const insertPos = $from.end(); // конец текущего параграфа
                    tr.insert(insertPos, state.schema.nodes.paragraph.create());
                    tr.setSelection(TextSelection.near(tr.doc.resolve(insertPos + 1)));
                    editor.view.dispatch(tr);

                    return true;
                }

                return false;
            },
        };
    }
,
});

function isNodeEmpty(node: any): boolean {
    if (node.isText) {
        return node.textContent.trim().length === 0;
    }

    if (node.content && node.content.childCount > 0) {
        for (let i = 0; i < node.content.childCount; i++) {
            const child = node.content.child(i);
            if (!isNodeEmpty(child)) {
                return false;
            }
        }
    }

    return true;
}
