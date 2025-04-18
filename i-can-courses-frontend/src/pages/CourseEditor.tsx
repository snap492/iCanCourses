// Файл: src/pages/CourseEditor.tsx

//import  LessonEditor  from "../components/LessonEditor";
import { LessonEditor } from "../components/LessonEditor";

export function CourseEditor({ onBack }: { onBack: () => void }) {
    return (
        <div className="flex h-screen">
            <aside className="w-1/3 p-6 bg-white border-r overflow-y-auto">
                <div className="font-bold text-lg mb-4">Структура курса</div>
                <button className="mb-2 bg-[#2ECC71] text-white px-4 py-2 rounded">+ Урок</button>
                <button className="mb-4 bg-[#2ECC71] text-white px-4 py-2 rounded">+ Упражнение</button>
                {/* Иерархия курса */}
                <ul>
                    <li>Урок 1
                        <ul className="ml-4">
                            <li>– Тест</li>
                            <li>– Горячие точки</li>
                        </ul>
                    </li>
                </ul>
            </aside>

            <main className="w-2/3 p-10 overflow-y-auto">
                <div className="flex justify-between items-center">
                    <div className="text-xl font-bold">Редактор урока</div>
                    <button onClick={onBack} className="text-[#3498DB] underline">← Назад</button>
                </div>
                <div className="mt-6 bg-white p-6 rounded-xl shadow">
                    <LessonEditor />
                </div>
            </main>
        </div>
    );
}
