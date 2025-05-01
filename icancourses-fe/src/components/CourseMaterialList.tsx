import { FC } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
    useSortable,
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from '@dnd-kit/sortable';
import { CourseMaterial } from '../types/course';
import { CourseMaterialItem } from './CourseMaterialItem';

interface CourseMaterialListProps {
    materials: CourseMaterial[];
    setMaterials: (materials: CourseMaterial[]) => void;
}

export const CourseMaterialList: FC<CourseMaterialListProps> = ({ materials, setMaterials }) => {
    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = materials.findIndex((item) => item.id === active.id);
            const newIndex = materials.findIndex((item) => item.id === over.id);
            setMaterials(arrayMove(materials, oldIndex, newIndex));
        }
    };

    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={materials.map((m) => m.id)} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col gap-2">
                    {materials.map((material) => (
                        <SortableMaterialItem
                            key={material.id}
                            material={material}
                            onMaterialsChange={setMaterials}
                        />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
};

interface SortableMaterialItemProps {
    material: CourseMaterial;
    onMaterialsChange: (materials: CourseMaterial[]) => void;
}

const SortableMaterialItem: FC<SortableMaterialItemProps> = ({ material, onMaterialsChange }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: material.id });

    const style = {
        transform: transform ? `translateY(${transform.y}px)` : undefined,
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <CourseMaterialItem material={material} onMaterialsChange={onMaterialsChange} />
        </div>
    );
};
