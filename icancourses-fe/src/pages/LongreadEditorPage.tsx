// === src/pages/LongreadEditorPage.tsx ================

import { useEffect, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TaskList from '@tiptap/extension-task-list';
//import TaskItem from '@tiptap/extension-task-item';
import TextAlign from '@tiptap/extension-text-align';
import Typography from '@tiptap/extension-typography';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';   
import Paragraph from '@tiptap/extension-paragraph';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import CodeBlock from '@tiptap/extension-code-block';
import Blockquote from '@tiptap/extension-blockquote';
import { Placeholder } from '@tiptap/extension-placeholder'; 
import { Columns } from '../extensions/Columns';
import { Column } from '../extensions/Column';

import ToolbarBubble from '../components/ToolbarBubble';
import listItem from '@tiptap/extension-list-item'; 
import { ICTaskListItem } from '../extensions/ICTaskListItem';  
import { ICHeading } from '../extensions/ICHeading';
//import {ICParagraph } from '../extensions/ICParagraph'

export default function LongreadEditorPage() {
    const [pages, setPages] = useState([{ id: 1, title: 'Страница 1' }]);
    const [currentPage, setCurrentPage] = useState(1);
    const [listLabel, setListLabel] = useState('Списки');
    const [alignLabel, setAlignLabel] = useState('Выравн.');
    const [headingLabel, setHeadingLabel] = useState('H1');

    
    
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                paragraph: false,
                heading: false,
                listItem: false,
                bulletList: false,
                orderedList: false,
                strike: false,
                codeBlock: false, 
                blockquote: false,
            }),
            Placeholder.configure({
                placeholder: 'Начните редактировать контент...',
               
            }),
            ICHeading,
            Paragraph.configure({
                HTMLAttributes: {
                    class: 'text-base leading-6 text-gray-800 text-wrap',
                },  
            }) ,
            //ICParagraph,
            listItem,
            BulletList.configure({
                HTMLAttributes: {
                    class: 'list-disc  pl-6 text-wrap ',
                    role: 'list',   
                },
            }),
            OrderedList.configure({
                HTMLAttributes: {
                    class: 'list-decimal pl-6 text-wrap ',
                    role: 'list',
                }
            }),
            Image,
            TaskList,
            ICTaskListItem,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Typography,
            Underline,
            Strike,
            CodeBlock,
            Blockquote,
            Columns,
            Column,
            
        ],
        
        //content: '<p>Начните редактировать контент...</p>',
    });
    const [columnsLabel, setColumnsLabel] = useState('Колонки');

    useEffect(() => {
        if (!editor) return;

        const updateColumnsLabel = () => {
            if (editor.isActive('columns', { count: 2 })) return setColumnsLabel('2 колонки');
            if (editor.isActive('columns', { count: 3 })) return setColumnsLabel('3 колонки');
            setColumnsLabel('Колонки');
        };

        editor.on('selectionUpdate', updateColumnsLabel);
        editor.on('transaction', updateColumnsLabel);

        return () => {
            editor.off('selectionUpdate', updateColumnsLabel);
            editor.off('transaction', updateColumnsLabel);
        };
    }, [editor]);

    useEffect(() => {
        if (!editor) return;

        const updateHeadingLabel = () => {
            for (let level = 1; level <= 6; level++) {
                if (editor.isActive('heading', { level })) {
                    setHeadingLabel(`H${level}`);
                    return;
                }
            }
            setHeadingLabel('Текст');
        };

        editor.on('selectionUpdate', updateHeadingLabel);
        editor.on('transaction', updateHeadingLabel);

        return () => {
            editor.off('selectionUpdate', updateHeadingLabel);
            editor.off('transaction', updateHeadingLabel);
        };
    }, [editor]);

    useEffect(() => {
        if (!editor) return;

        const updateListLabel = () => {
            if (editor.isActive('taskList')) return setListLabel('Задачи');
            if (editor.isActive('bulletList')) return setListLabel('Маркированный');
            if (editor.isActive('orderedList')) return setListLabel('Нумерованный');
            setListLabel('Списки');
        };

        editor.on('selectionUpdate', updateListLabel);
        editor.on('transaction', updateListLabel);

        return () => {
            editor.off('selectionUpdate', updateListLabel);
            editor.off('transaction', updateListLabel);
        };
    }, [editor]);
    useEffect(() => {
        if (!editor) return;

        const updateAlignLabel = () => {
            const style = ['left', 'center', 'right'];
            for (const align of style) {
                if (editor.isActive({ textAlign: align })) {
                    setAlignLabel(
                        align === 'left' ? 'Слева' : align === 'center' ? 'По центру' : 'Справа'
                    );
                    return;
                }
            }
            setAlignLabel('Слева');
        };

        editor.on('selectionUpdate', updateAlignLabel);
        editor.on('transaction', updateAlignLabel);

        return () => {
            editor.off('selectionUpdate', updateAlignLabel);
            editor.off('transaction', updateAlignLabel);
        };
    }, [editor]);



    const isActive = (name: string, options: Record<string, any> = {}) =>
        editor?.isActive(name, options) ? 'bg-blue-200' : '';



    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Левая панель содержания */}
            <div className="w-1/4 bg-white p-4 shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-bold">Содержание</h2>
                    <button
                        onClick={addPage}
                        className="rounded bg-blue-500 px-3 py-1 text-sm font-semibold text-white hover:bg-blue-600"
                    >
                        + Страница
                    </button>
                </div>
                <ul className="space-y-2">
                    {pages.map((page) => (
                        <li
                            key={page.id}
                            onClick={() => setCurrentPage(page.id)}
                            className={`p-2 rounded cursor-pointer ${currentPage === page.id ? 'bg-blue-100 font-semibold' : 'hover:bg-gray-100'}`}
                        >
                            {page.title}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Правая панель редактора */}
            <div className="flex-1 p-6">
                <h1 className="mb-4 text-2xl font-bold">
                    Редактирование: {pages.find(p => p.id === currentPage)?.title}
                </h1>

                {/* Закрепленное меню форматирования */}
                {editor && (
                    <div className="sticky top-0 z-10 mb-4 flex flex-wrap gap-2 rounded-t-xl border-b border-gray-200 bg-white px-4 py-2 shadow-sm">
                        {/* Форматирование */}
                        <div className="relative">   <button onClick={() => editor.chain().focus().toggleBold().run()} className={`px-3 py-1 border rounded hover:bg-gray-200 ${isActive('bold') ? 'bg-gray-200 border-gray-300 text-blue-800' : 'border-gray-300'}`}>Жирный</button>
                        </div>
                        <div className="relative">
                            <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`px-3 py-1 border rounded hover:bg-gray-200 ${isActive('italic') ? 'bg-gray-200 border-gray-300 text-blue-800' : 'border-gray-300'}`}>Курсив</button>
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => editor.chain().focus().toggleUnderline().run()}
                                className={`px-3 py-1 border rounded hover:bg-gray-200 ${isActive('underline') ? 'bg-gray-200 border-gray-300 text-blue-800' : 'border-gray-300'}`}
                            >
                                Подчеркнутый
                            </button>
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => editor.chain().focus().toggleStrike().run()}
                                className={`px-3 py-1 border rounded hover:bg-gray-200 ${isActive('strike') ? 'bg-gray-200 border-gray-300 text-blue-800' : 'border-gray-300'}`}
                            >
                                Перечеркнутый
                            </button>
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                                className={`px-3 py-1 border rounded hover:bg-gray-200 ${isActive('codeBlock') ? 'bg-gray-200 border-gray-300 text-blue-800' : 'border-gray-300'}`}
                            >
                                Код
                            </button>
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                                className={`px-3 py-1 border rounded hover:bg-gray-200 ${isActive('blockquote') ? 'bg-gray-200 border-gray-300 text-blue-800' : 'border-gray-300'}`}
                            >
                                Цитата
                            </button>
                        </div>

                        {/* Блоки */}
                        <div className="relative"> <button onClick={() => editor.chain().focus().setParagraph().run()}
                            className={`px-3 py-1 border rounded  transition hover:bg-gray-200 ${isActive('paragraph') ? 'bg-gray-200 border-gray-300 text-blue-800' : 'border-gray-300'}`}>
                            Текст
                        </button>
                        </div>
                        <ToolbarBubble
                            selectedLabel={headingLabel}
                            options={[
                                {
                                    label: 'H1',
                                    value: '1',
                                    onClick: () => {
                                        editor.chain().focus().toggleHeading({ level: 1 }).run();
                                        setHeadingLabel('H1');
                                    },
                                },
                                {
                                    label: 'H2',
                                    value: '2',
                                    onClick: () => {
                                        editor.chain().focus().toggleHeading({ level: 2 }).run();
                                        setHeadingLabel('H2');
                                    },
                                },
                                {
                                    label: 'H3',
                                    value: '3',
                                    onClick: () => {
                                        editor.chain().focus().toggleHeading({ level: 3 }).run();
                                        setHeadingLabel('H3');
                                    },
                                },
                                {
                                    label: 'H4',
                                    value: '4',
                                    onClick: () => {
                                        editor.chain().focus().toggleHeading({ level: 4 }).run();
                                        setHeadingLabel('H4');
                                    },
                                },
                                {
                                    label: 'H5',
                                    value: '5',
                                    onClick: () => {
                                        editor.chain().focus().toggleHeading({ level: 5 }).run();
                                        setHeadingLabel('H5');
                                    },
                                },
                                {
                                    label: 'H6',
                                    value: '6',
                                    onClick: () => {
                                        editor.chain().focus().toggleHeading({ level: 6 }).run();
                                        setHeadingLabel('H6');
                                    },
                                },
                            ]}
                        />

                        <ToolbarBubble
                            selectedLabel={listLabel}
                            options={[
                                {
                                    label: '• Список',
                                    value: 'bulletList',
                                    onClick: () => {
                                        editor.chain().focus().toggleBulletList().run();
                                        setListLabel('• Список');
                                    },
                                },
                                {
                                    label: '1. Нумер.',
                                    value: 'orderedList',
                                    onClick: () => {
                                        editor.chain().focus().toggleOrderedList().run();
                                        setListLabel('1. Нумер.');
                                    },
                                },
                                {
                                    label: '☑️ Задачи',
                                    value: 'taskList',
                                    onClick: () => {
                                        editor.chain().focus().toggleTaskList().run();
                                        setListLabel('☑️ Задачи');
                                    },
                                },
                            ]}
                        />
                        <ToolbarBubble
                            selectedLabel={columnsLabel}
                            options={[
                                {
                                    label: '1 колонка',
                                    value: '1',
                                    onClick: () => {
                                        editor.chain().focus().removeColumns().run();
                                        setColumnsLabel('1 колонка');
                                    },
                                },
                                {
                                    label: '2 колонки',
                                    value: '2',
                                    onClick: () => {
                                        editor.chain().focus().insertColumns(2).run();
                                        setColumnsLabel('2 колонки');
                                    },
                                },
                                {
                                    label: '3 колонки',
                                    value: '3',
                                    onClick: () => {
                                        editor.chain().focus().insertColumns(3).run();
                                        setColumnsLabel('3 колонки');
                                    },
                                },
                            ]}
                        />

                        <ToolbarBubble
                            selectedLabel={alignLabel}
                            options={[
                                {
                                    label: '⬅️ Лево',
                                    value: 'left',
                                    onClick: () => {
                                        editor.chain().focus().setTextAlign('left').run();
                                        setAlignLabel('⬅️ Лево');
                                    },
                                },
                                {
                                    label: '↔️ Центр',
                                    value: 'center',
                                    onClick: () => {
                                        editor.chain().focus().setTextAlign('center').run();
                                        setAlignLabel('↔️ Центр');
                                    },
                                },
                                {
                                    label: '➡️ Право',
                                    value: 'right',
                                    onClick: () => {
                                        editor.chain().focus().setTextAlign('right').run();
                                        setAlignLabel('➡️ Право');
                                    },
                                },
                            ]}
                        />


                        {/* Медиа */}
                        <div className="relative">
                            <button
                            onClick={() => {
                                const url = window.prompt('Введите URL изображения');
                                if (url) {
                                    editor.chain().focus().setImage({ src: url }).run();
                                }
                            }}
                                className="px-3 py-1 border rounded border-gray-300 hover:bg-gray-200">
                            Изображение
                        </button>
                        </div>
                    </div>
                )}
                {/* Редактор */}
                <div className="prose min-h-[600px] bg-white p-4 shadow shadow-amber-100 outline-0">
                    {editor && <EditorContent editor={editor} />}
                </div>
            </div>
        </div>
    );

    function addPage() {
        const newId = pages.length + 1;
        setPages([...pages, { id: newId, title: `Страница ${newId}` }]);
        setCurrentPage(newId);
    }
}
