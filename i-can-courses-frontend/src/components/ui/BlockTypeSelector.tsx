import { useState } from "react";

const BlockTypeSelector = ({ onChange }: { onChange: (blockType: string) => void }) => {
    const [selectedBlock, setSelectedBlock] = useState("paragraph");

    const handleBlockTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const blockType = event.target.value;
        setSelectedBlock(blockType);
        onChange(blockType); //Сообщаем родительскому компоненту о смене типа блока
    };

    return (
        <select value={selectedBlock} onChange={handleBlockTypeChange}>
            <option value="paragraph">Текст</option>
            <option value="heading1">Загаловок 1</option>
            <option value="heading2">Загаловок 2</option>
            <option value="list">Список</option>
        </select>
    );
};

export default BlockTypeSelector;
