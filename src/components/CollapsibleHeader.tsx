import { SortableTable } from "./SortableTable";
import { useFruitsContext } from "../context/FruitsContext";
import { Fruit } from "../types/fruitTypes";
import { AccordionWithButton } from "./AccordionWithButton";
import { useSortableFruit } from "../hooks/useSortableFruit";

// Considered refactoring to be generic, but it wasn't being reused.
interface CollapsibleHeaderProps {
    headerLabels: string[];
    groupBy: string;
}

const CollapsibleHeader = ({
    headerLabels,
    groupBy,
}: CollapsibleHeaderProps) => {
    const { fruits, handleAddFruits } = useFruitsContext();
    const normalizedGroupBy = groupBy.toLowerCase() as keyof Fruit;
    const handleExpand = (label: string) => {
        const relevantFruits: Fruit[] = fruits.filter(
            (fruit) => fruit[normalizedGroupBy as keyof Fruit] === label
        );
        return (
            <td>
                <SortableTable
                    data={relevantFruits}
                    config={config}
                    keyFn={keyFn}
                />
            </td>
        );
    };
    const handleAddGroup = (label: string) => {
        const relevantFruits: Fruit[] = fruits.filter(
            (fruit) => fruit[normalizedGroupBy as keyof Fruit] === label
        );
        handleAddFruits(relevantFruits);
    };

    const handleClick = (label: string) => {
        return handleExpand(label);
    };

    const { config, keyFn } = useSortableFruit();
    const groupAddButton = (label: string) => {
        return <div onClick={() => handleAddGroup(label)}>Add</div>;
    };

    const renderedAccordionWithButtons = headerLabels.map((label) => (
        <AccordionWithButton
            key={label}
            title={label}
            content={handleClick(label)}
            button={groupAddButton(label)}
        />
    ));

    return <div>{renderedAccordionWithButtons}</div>;
};

export { CollapsibleHeader };
