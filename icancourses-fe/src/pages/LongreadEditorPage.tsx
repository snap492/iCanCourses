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
import listItem from '@tiptap/extension-list-item';

import { Columns } from '../extensions/Columns';
import { Column } from '../extensions/Column';
import { ICTaskListItem } from '../extensions/ICTaskListItem';  
import { ICHeading } from '../extensions/ICHeading';
//import {ICParagraph } from '../extensions/ICParagraph'

import ToolbarBubble from '../components/ToolbarBubble';

import { FaAlignLeft, FaAlignCenter, FaAlignRight, FaListUl, FaListOl, FaTasks, FaRegSave, } from 'react-icons/fa';
import { TbColumns1, TbColumns2, TbColumns3, TbColumns } from "react-icons/tb";
import { LuHeading1, LuHeading2, LuHeading3, LuHeading4, LuHeading5, LuHeading6, LuBold, LuItalic, LuUnderline,
         LuStrikethrough, LuCodeXml, LuMessageSquareQuote, LuHeading, LuImage } from "react-icons/lu";
import { RiText } from "react-icons/ri";

export default function LongreadEditorPage() {
    const [pages, setPages] = useState([{ id: 1, title: 'Страница 1' }]);
    const [currentPage, setCurrentPage] = useState(1);
    const [listLabel, setListLabel] = useState(<span><FaListUl /></span>);
    const [alignLabel, setAlignLabel] = useState(<span><FaAlignLeft /></span>);
    const [headingLabel, setHeadingLabel] = useState(<span><LuHeading /></span>);
    const [pagesContent, setPagesContent] = useState<{ [id: number]: string }>({});
    const [columnsLabel, setColumnsLabel] = useState(<span><TbColumns /></span>);

    
    
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
        
    });

    useEffect(() => {
        if (!editor) return;

        const updateColumnsLabel = () => {
            if (editor.isActive('columns', { count: 2 })) return setColumnsLabel(<span><TbColumns2 /></span>);
            if (editor.isActive('columns', { count: 3 })) return setColumnsLabel(<span><TbColumns3 /></span>);
            setColumnsLabel(<span><TbColumns /></span>);
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
            if (editor.isActive('heading', {level: 1})) return setHeadingLabel(<span><LuHeading1 /></span>);
            if (editor.isActive('heading', {level: 2})) return setHeadingLabel(<span><LuHeading2 /></span>);
            if (editor.isActive('heading', {level: 3})) return setHeadingLabel(<span><LuHeading3 /></span>);
            if (editor.isActive('heading', {level: 4})) return setHeadingLabel(<span><LuHeading4 /></span>);
            if (editor.isActive('heading', {level: 5})) return setHeadingLabel(<span><LuHeading5 /></span>);
            if (editor.isActive('heading', {level: 6})) return setHeadingLabel(<span><LuHeading6 /></span>); 
            setHeadingLabel(<span><LuHeading /></span>);
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
            if (editor.isActive('taskList')) return setListLabel(<span><FaTasks /></span>);
            if (editor.isActive('bulletList')) return setListLabel(<span><FaListUl /></span>);
            if (editor.isActive('orderedList')) return setListLabel(<span><FaListOl /></span>);
            setListLabel(<span><FaListUl /></span>);
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
                        align === 'left' ? (<span><FaAlignLeft /></span>) : align === 'center' ? <span><FaAlignCenter /></span> : <span><FaAlignRight /></span>
                    );
                    return;
                }
            }
            setAlignLabel(<span><FaAlignLeft /></span>);
        };

        editor.on('selectionUpdate', updateAlignLabel);
        editor.on('transaction', updateAlignLabel);

        return () => {
            editor.off('selectionUpdate', updateAlignLabel);
            editor.off('transaction', updateAlignLabel);
        };
    }, [editor]);

    useEffect(() => {
        if (!editor) return;
        const html = pagesContent[currentPage] || '';
        editor.commands.setContent(html);
    }, [currentPage, editor]);

    const saveCurrentPage = () => {
        if (!editor) return;
        setPagesContent(prev => ({
            ...prev,
            [currentPage]: editor.getHTML(),
        }));
        console.log('Сохранено:', editor.getHTML()); // или сохранение в файл/сервер позже
    };


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
                <button
                    onClick={saveCurrentPage}
                    className="rounded bg-gray-300 px-4 py-2 text-2xl hover:bg-gray-600">
                    <FaRegSave /> 
                </button>
                {/* Закрепленное меню форматирования */}
                {editor && (
                    <div className="sticky top-0 z-10 mb-4 flex flex-wrap gap-2 rounded-t-xl border-b border-gray-200 bg-white px-4 py-2 shadow-sm">
                        {/* Форматирование */}
                        <div className="relative">   <button onClick={() => editor.chain().focus().toggleBold().run()} className={`px-3 py-1 border rounded hover:bg-gray-200 ${isActive('bold') ? 'bg-gray-200 border-gray-300 text-blue-800' : 'border-gray-300'}`}>
                            <LuBold />
                        </button>
                        </div>
                        <div className="relative">
                            <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`px-3 py-1 border rounded hover:bg-gray-200 ${isActive('italic') ? 'bg-gray-200 border-gray-300 text-blue-800' : 'border-gray-300'}`}>
                                <LuItalic />
                            </button>
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => editor.chain().focus().toggleUnderline().run()}
                                className={`px-3 py-1 border rounded hover:bg-gray-200 ${isActive('underline') ? 'bg-gray-200 border-gray-300 text-blue-800' : 'border-gray-300'}`}>
                                <LuUnderline />
                            </button>
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => editor.chain().focus().toggleStrike().run()}
                                className={`px-3 py-1 border rounded hover:bg-gray-200 ${isActive('strike') ? 'bg-gray-200 border-gray-300 text-blue-800' : 'border-gray-300'}`}>
                                <LuStrikethrough />
                            </button>
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                                className={`px-3 py-1 border rounded hover:bg-gray-200 ${isActive('codeBlock') ? 'bg-gray-200 border-gray-300 text-blue-800' : 'border-gray-300'}`}>
                                <LuCodeXml />
                            </button>
                        </div>
                        <div className="relative">
                            <button
                                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                                className={`px-3 py-1 border rounded hover:bg-gray-200 ${isActive('blockquote') ? 'bg-gray-200 border-gray-300 text-blue-800' : 'border-gray-300'}`}>
                                <LuMessageSquareQuote />
                            </button>
                        </div>

                        {/* Блоки */}
                        <div className="relative"> <button onClick={() => editor.chain().focus().setParagraph().run()}
                            className={`px-3 py-1 border rounded  transition hover:bg-gray-200 ${isActive('paragraph') ? 'bg-gray-200 border-gray-300 text-blue-800' : 'border-gray-300'}`}>
                            <RiText />
                        </button>
                        </div>
                        <ToolbarBubble
                            selectedLabel={headingLabel}
                            options={[
                                {
                                    label: (<span><LuHeading1 /></span>),
                                    value: '1',
                                    onClick: () => {
                                        editor.chain().focus().toggleHeading({ level: 1 }).run();
                                        setHeadingLabel(<span><LuHeading1 /></span>);
                                    },
                                },
                                {
                                    label: (<span><LuHeading2 /></span>),
                                    value: '2',
                                    onClick: () => {
                                        editor.chain().focus().toggleHeading({ level: 2 }).run();
                                        setHeadingLabel(<span><LuHeading2 /></span>);
                                    },
                                },
                                {
                                    label: (<span><LuHeading3 /></span>),
                                    value: '3',
                                    onClick: () => {
                                        editor.chain().focus().toggleHeading({ level: 3 }).run();
                                        setHeadingLabel(<span><LuHeading3 /></span>);
                                    },
                                },
                                {
                                    label: (<span><LuHeading4 /></span>),
                                    value: '4',
                                    onClick: () => {
                                        editor.chain().focus().toggleHeading({ level: 4 }).run();
                                        setHeadingLabel(<span><LuHeading4 /></span>);
                                    },
                                },
                                {
                                    label: (<span><LuHeading5 /></span>),
                                    value: '5',
                                    onClick: () => {
                                        editor.chain().focus().toggleHeading({ level: 5 }).run();
                                        setHeadingLabel(<span><LuHeading5 /></span>);
                                    },
                                },
                                {
                                    label: (<span><LuHeading6 /></span>),
                                    value: '6',
                                    onClick: () => {
                                        editor.chain().focus().toggleHeading({ level: 6 }).run();
                                        setHeadingLabel(<span><LuHeading6 /></span>);
                                    },
                                },
                            ]}
                        />

                        <ToolbarBubble
                            selectedLabel={listLabel}
                            options={[
                                {
                                    label: (<span><FaListUl /></span> ),
                                    value: 'bulletList',
                                    onClick: () => {
                                        editor.chain().focus().toggleBulletList().run();
                                        setListLabel(<span><FaListUl /></span>);
                                    },
                                },
                                {
                                    label: (<span><FaListOl /></span>),
                                    value: 'orderedList',
                                    onClick: () => {
                                        editor.chain().focus().toggleOrderedList().run();
                                        setListLabel(<span><FaListOl /></span>);
                                    },
                                },
                                {
                                    label: (<span><FaTasks /></span>), 
                                    value: 'taskList',
                                    onClick: () => {
                                        editor.chain().focus().toggleTaskList().run();
                                        setListLabel(<span><FaTasks /></span>);
                                    },
                                },
                            ]}
                        />
                        <ToolbarBubble
                            selectedLabel={columnsLabel}
                            options={[
                                {
                                    label: (<span><TbColumns1 /></span>),
                                    value: '1',
                                    onClick: () => {
                                        editor.chain().focus().removeColumns().run();
                                        setColumnsLabel(<span><TbColumns1 /></span>);
                                    },
                                },
                                {
                                    label: (<span><TbColumns2 /></span>),
                                    value: '2',
                                    onClick: () => {
                                        editor.chain().focus().insertColumns(2).run();
                                        setColumnsLabel(<span><TbColumns2 /></span>);
                                    },
                                },
                                {
                                    label: (<span><TbColumns3 /></span>),
                                    value: '3',
                                    onClick: () => {
                                        editor.chain().focus().insertColumns(3).run();
                                        setColumnsLabel(<span><TbColumns1 /></span>);
                                    },
                                },
                            ]}
                        />

                        <ToolbarBubble
                            selectedLabel={alignLabel}
                            options={[
                                {
                                    label: (<span><FaAlignLeft /></span>),
                                    value: 'left',
                                    onClick: () => {
                                        editor.chain().focus().setTextAlign('left').run();
                                        setAlignLabel(<span><FaAlignLeft /></span>);
                                    },
                                },
                                {
                                    label: (<span><FaAlignCenter /></span>),
                                    value: 'center',
                                    onClick: () => {
                                        editor.chain().focus().setTextAlign('center').run();
                                        setAlignLabel(<span><FaAlignCenter /></span>);
                                    },
                                },
                                {
                                    label: (<span><FaAlignRight /></span>),
                                    value: 'right',
                                    onClick: () => {
                                        editor.chain().focus().setTextAlign('right').run();
                                        setAlignLabel(<span><FaAlignRight /></span>);
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
                                <LuImage />
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
