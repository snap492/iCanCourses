// Файл: src/pages/Dashboard.tsx
import { Button } from "../components/ui/Button";

export function Dashboard({ onOpenEditor }: { onOpenEditor: () => void }) {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex justify-between items-center px-10 py-4 bg-white shadow">
                <div className="text-2xl font-bold">iCanCourses</div>
                <nav className="space-x-4">
                    <a href="#">Профиль</a>
                    <a href="#">Настройки</a>
                    <a href="#">Помощь</a>
                </nav>
            </header>

            <main className="flex flex-1 overflow-hidden">
                <section className="w-3/4 p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
                    {/* Карточки курсов */}
                    <div className="aspect-[4/3] rounded-xl shadow bg-white border flex items-center justify-center text-lg font-semibold">
                        Курс 1
                    </div>
                    <div className="aspect-[4/3] rounded-xl shadow bg-white border flex items-center justify-center text-lg font-semibold">
                        Курс 2
                    </div>
                    <div className="aspect-[4/3] rounded-xl shadow bg-white border flex items-center justify-center text-lg font-semibold">
                        Курс 3
                    </div>
                </section>

                <aside className="w-1/4 p-6 bg-white border-l overflow-y-auto">
                    <div className="mb-4 font-bold">Уведомления</div>
                    <div>– Новое обновление редактора</div>
                    <div className="mt-6 font-bold">Статистика</div>
                    <div>– Курсов: 5</div>
                    <div>– Ученики: 124</div>
                </aside>
            </main>

            <footer className="px-10 py-4 bg-[#E8E8E8] flex justify-between items-center">
                <Button onClick={onOpenEditor}>Создать курс</Button>
                <div className="text-sm text-[#7F7F7F]">© 2025 iCanCourses</div>
            </footer>
        </div>
    );
}