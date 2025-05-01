// Типы материалов в курсе
export type MaterialType = 'longread' | 'exercise' | 'video' | 'document';

// Описание одного материала курса
export interface CourseMaterial {
    id: string; // Уникальный id материала
    type: MaterialType; // Тип материала
    title: string; // Название материала
    description?: string; // (опционально) Описание
}
