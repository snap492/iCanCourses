// === src/pages/CoursesPage.tsx ================
import { useNavigate } from 'react-router-dom';
export default function CoursesPage() {
    const navigate = useNavigate();
    const courses = [
        { id: 1, title: 'Курс 1', coverUrl: '/covers/course1.jpg' },
        { id: 2, title: 'Курс 2', coverUrl: '/covers/course2.jpg' },
        { id: 3, title: 'Курс 3', coverUrl: '/covers/course3.jpg' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <header className="flex justify-between items-center mb-6">
                <div className="text-2xl font-bold">Courses</div>
                <div className="space-x-4">
                    <button className="text-gray-600 hover:text-black">Профиль</button>
                    <button className="text-gray-600 hover:text-black">Настройки</button>
                    <button className="text-gray-600 hover:text-black">Помощь</button>
                </div>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div
                    onClick={() => navigate('/course-editor')}
                    className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-2xl p-6 cursor-pointer hover:bg-gray-200"
                >
                    <div className="text-6xl text-gray-400 mb-2">+</div>
                    <div className="text-lg font-semibold text-gray-600">Создать курс</div>
                </div>
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="bg-white rounded-2xl shadow hover:shadow-lg cursor-pointer overflow-hidden"
                    >
                        <img src={course.coverUrl} alt="cover" className="h-40 w-full object-cover" />
                        <div className="p-4 text-center font-semibold">{course.title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

