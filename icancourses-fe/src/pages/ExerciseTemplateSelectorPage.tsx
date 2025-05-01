// === src/pages/ExerciseTemplateSelectorPage.tsx ================

export default function ExerciseTemplateSelectorPage() {
    const templates = [
        { id: 'quiz', title: 'Викторина', description: 'Создайте тест с вопросами и вариантами ответов.' },
        { id: 'puzzle', title: 'Пазл', description: 'Соберите картинку из частей.' },
        { id: 'matching', title: 'Найди пары', description: 'Соедините соответствующие элементы.' },
        { id: 'hotspot', title: 'Выделенные области', description: 'Отметьте области на изображении.' },
        { id: 'crossword', title: 'Кроссворд', description: 'Создайте интерактивный кроссворд.' },
        { id: 'wordsearch', title: 'Поиск слова', description: 'Найдите слова в матрице букв.' },
        { id: 'matching_text_image', title: 'Сопоставление текст+изображение', description: 'Сопоставьте текст с изображением.' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8">Выберите шаблон упражнения</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition cursor-pointer"
                    >
                        <h2 className="text-xl font-bold mb-2">{template.title}</h2>
                        <p className="text-gray-600 text-sm">{template.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
