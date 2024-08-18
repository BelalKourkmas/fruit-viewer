import { SortableTable } from "./SortableTable";
import { useFruitsContext } from "../context/FruitsContext";
import { Fruit } from "../types/fruitTypes";
import { Accordion } from "./Accordion";
import { useSortableFruit } from "../hooks/useSortableFruit";

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

    const renderedAccordions = headerLabels.map((label) => (
        <Accordion
            key={label}
            title={label}
            content={handleClick(label)}
            button={groupAddButton(label)}
        />
    ));

    return <div>{renderedAccordions}</div>;
};

export { CollapsibleHeader };
