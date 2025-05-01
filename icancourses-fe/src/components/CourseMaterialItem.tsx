import { FC } from 'react';
import { CourseMaterial } from '../types/course';
import { DocumentTextIcon, FilmIcon, NewspaperIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

interface CourseMaterialItemProps {
    material: CourseMaterial;
    onMaterialsChange: (newStructure: any[]) => void;
}

const iconMap = {
    longread: NewspaperIcon,
    exercise: PencilSquareIcon,
    video: FilmIcon,
    document: DocumentTextIcon,
};

export const CourseMaterialItem: FC<CourseMaterialItemProps> = ({ material }) => {
    const Icon = iconMap[material.type];

    return (
        <div className="flex items-center gap-3 rounded-md border border-gray-300 p-3 transition hover:bg-gray-50">
            <Icon className="h-6 w-6 text-gray-600" />
            <div>
                <div className="font-medium">{material.title}</div>
                {material.description && <div className="text-sm text-gray-500">{material.description}</div>}
            </div>
        </div>
    );
};
