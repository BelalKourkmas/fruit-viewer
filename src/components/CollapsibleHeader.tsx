import { SortableTable } from "./SortableTable";
import { useFruitsContext } from "../context/FruitsContext";
import { Fruit } from "../types/fruitTypes";
import { Accordion } from "./Accordion";

interface CollapsibleHeaderProps {
    headerLabels: string[];
    groupBy: string;
}

const CollapsibleHeader = ({
    headerLabels,
    groupBy,
}: CollapsibleHeaderProps) => {
    const { fruits, handleAddFruit, handleAddFruits } = useFruitsContext();
    const normalizedGroupBy = groupBy.toLowerCase() as keyof Fruit;
    const handleExpand = (label: string) => {
        const relevantFruits: Fruit[] = fruits.filter(
            (fruit) => fruit[normalizedGroupBy as keyof Fruit] === label
        );
        const config = [
            {
                label: "Name",
                render: (fruit: Fruit) => fruit.name,
                sortValue: (fruit: Fruit) => fruit.name,
            },
            {
                label: "Calories",
                render: (fruit: Fruit) => fruit.nutritions.calories,
                sortValue: (fruit: Fruit) => fruit.nutritions.calories,
            },
            {
                label: " ",
                render: (fruit: Fruit) => addButton(fruit),
            },
        ];
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
    const addButton = (fruit: Fruit) => {
        return (
            <div
                onClick={() => handleAddClick(fruit)}
                className="inline-block border border-gray-500 px-2 py-1 m-1 cursor-pointer"
            >
                Add
            </div>
        );
    };
    const handleAddClick = (fruit: Fruit) => {
        return handleAddFruit(fruit);
    };

    const handleClick = (label: string) => {
        return handleExpand(label);
    };
    const keyFn = (fruit: Fruit) => {
        return fruit.name;
    };

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

    return (
        <table>
            <tbody>{renderedAccordions}</tbody>
        </table>
    );
};

export { CollapsibleHeader };
