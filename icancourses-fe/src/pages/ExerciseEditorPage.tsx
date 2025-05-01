// === src/pages/ExerciseEditorPage.tsx ================

import { useState } from 'react';

export default function ExerciseEditorPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [exerciseType, setExerciseType] = useState('quiz');

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8">Создание упражнения</h1>
            <div className="max-w-3xl bg-white p-6 rounded-2xl shadow-md space-y-6">
                {/* Выбор типа упражнения */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Тип упражнения</label>
                    <select
                        value={exerciseType}
                        onChange={(e) => setExerciseType(e.target.value)}
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="quiz">Викторина</option>
                        <option value="puzzle">Пазл</option>
                        <option value="matching">Найди пары</option>
                        <option value="hotspot">Выделенные области</option>
                        <option value="crossword">Кроссворд</option>
                        <option value="wordsearch">Поиск слова</option>
                        <option value="matching_text_image">Сопоставление текст+изображение</option>
                    </select>
                </div>

                {/* Название упражнения */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Название упражнения</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Введите название"
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Описание упражнения */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Описание</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Введите описание или инструкцию к упражнению"
                        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                        rows={4}
                    />
                </div>

                {/* Кнопка сохранения */}
                <div className="flex justify-end">
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg"
                    >
                        Сохранить упражнение
                    </button>
                </div>
            </div>
        </div>
    );
}
