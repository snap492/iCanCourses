// Τΰιλ: src/App.tsx
import { Dashboard } from "./pages/Dashboard";
import { CourseEditor } from "./pages/CourseEditor";
import { useState } from "react";

export default function App() {
    const [page, setPage] = useState<"dashboard" | "editor">("dashboard");

    return (
        <div className="bg-[#F5F5F5] min-h-screen min-w-[1280px] max-w-full text-[#333333] font-[Open_Sans]">
            {page === "dashboard" ? (
                <Dashboard onOpenEditor={() => setPage("editor")} />
            ) : (
                <CourseEditor onBack={() => setPage("dashboard")} />
            )}
        </div>
    );
}