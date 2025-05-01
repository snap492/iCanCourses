// === src/pages/CourseEditorPage.tsx ================

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CourseMaterialList } from "../components/CourseMaterialList";
export default function CourseEditorPage() {
    const navigate = useNavigate();
    const [course, setCourse] = useState({
        title: '',
        description: '',
        coverUrl: '',
        structure: [],
    });

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <header className="mb-6 flex items-center justify-between">
                <div className="space-x-4">
                    <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-black">Назад</button>
                    <button className="rounded bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-600">Сохранить</button>
                    <button className="rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600">Экспортировать в SCORM</button>
                </div>
            </header>
            <div className="space-y-6 rounded-2xl bg-white p-6 shadow-md">
                <div>
                    <label className="mb-1 block font-semibold">Название курса:</label>
                    <input
                        type="text"
                        className="w-full rounded border p-2"
                        value={course.title}
                        onChange={(e) => setCourse({ ...course, title: e.target.value })}
                    />
                </div>
                <div>
                    <label className="mb-1 block font-semibold">Описание курса:</label>
                    <textarea
                        className="w-full rounded border p-2"
                        rows={4}
                        value={course.description}
                        onChange={(e) => setCourse({ ...course, description: e.target.value })}
                    ></textarea>
                </div>
                <div>
                    <label className="mb-1 block font-semibold">Обложка курса:</label>
                    <input type="file" className="w-full" />
                </div>
            </div>
            <div className="mt-8">
                <h2 className="mb-4 text-xl font-bold">Структура курса</h2>
                <div className="space-y-4 rounded-2xl bg-white p-6 shadow-md">
                    <CourseMaterialList
                        materials={course.structure}
                        onMaterialsChange={(newStructure) => setCourse({ ...course, structure: newStructure })}
                    />
                </div>
            </div>
        </div>
    );
}