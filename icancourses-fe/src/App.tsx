// ============ src/App.tsx ============
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router';
import CoursesPage from './pages/CoursesPage';
import CourseEditorPage from './pages/CourseEditorPage';
import LongreadEditorPage from './pages/LongreadEditorPage';
import ExerciseTemplateSelectorPage from './pages/ExerciseTemplateSelectorPage';
import ExerciseEditorPage from './pages/ExerciseEditorPage';

export default function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <nav className="bg-white shadow p-4 flex gap-4">
                    <Link to="/courses" className="text-blue-500 hover:underline">Курсы</Link>
                    <Link to="/course-editor/1" className="text-blue-500 hover:underline">Редактор курса</Link>
                    <Link to="/longread-editor/1" className="text-blue-500 hover:underline">Редактор лонгрида</Link>
                    <Link to="/exercise-template-selector" className="text-blue-500 hover:underline">Выбор шаблона упражнения</Link>
                    <Link to="/exercise-editor/1" className="text-blue-500 hover:underline">Редактор упражнения</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Navigate to="/courses" replace />} />
                    <Route path="/courses" element={<CoursesPage />} />
                    <Route path="/course-editor/:courseId" element={<CourseEditorPage />} />
                    <Route path="/longread-editor/:longreadId" element={<LongreadEditorPage />} />
                    <Route path="/exercise-template-selector" element={<ExerciseTemplateSelectorPage />} />
                    <Route path="/exercise-editor/:exerciseId" element={<ExerciseEditorPage />} />
                </Routes>
            </div>
        </Router>
    );
}
