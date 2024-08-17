import { Dropdown } from "./Dropdown";
import { Fruit } from "../types/fruitTypes";
import { useFruitsContext } from "../context/FruitsContext";
import { useEffect, useState } from "react";
import { SortableTable } from "./SortableTable";
import { CollapsibleHeader } from "./CollapsibleHeader";

const FruitViewer = () => {
    const { fruits, handleAddFruit } = useFruitsContext();
    const [groupBy, setGroupBy] = useState("None");
    useEffect(() => {
        console.log("groupBy changed to:", groupBy);
    }, [groupBy]);

    const getUniqueCategories = <Item,>(
        items: Item[],
        category: keyof Item
    ): string[] => {
        const uniques = new Set(
            items.map((item) => item[category] as unknown as string)
        );
        return Array.from(uniques);
    };

    const uniqueGenus = getUniqueCategories(fruits, "genus");
    const uniqueFamily = getUniqueCategories(fruits, "family");
    const uniqueOrder = getUniqueCategories(fruits, "order");

    const groupByOptions = [
        {
            label: "None",
            onClick: () => {
                setGroupBy("None");
            },
        },
        {
            label: "Family",
            onClick: () => {
                setGroupBy("Family");
            },
        },
        {
            label: "Order",
            onClick: () => {
                setGroupBy("Order");
            },
        },
        {
            label: "Genus",
            onClick: () => {
                setGroupBy("Genus");
            },
        },
    ];

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
        handleAddFruit(fruit);
    };

    const keyFn = (fruit: Fruit) => {
        return fruit.name;
    };

    const groupNoneLayout = (
        <SortableTable data={fruits} config={config} keyFn={keyFn} />
    );

    const groupGenusLayout = (
        <CollapsibleHeader headerLabels={uniqueGenus} groupBy={groupBy} />
    );

    const groupFamilyLayout = (
        <CollapsibleHeader headerLabels={uniqueFamily} groupBy={groupBy} />
    );
    const groupOrderLayout = (
        <CollapsibleHeader headerLabels={uniqueOrder} groupBy={groupBy} />
    );
    return (
        <div>
            <Dropdown label={"Group By:"} options={groupByOptions} />
            {groupBy === "None" ? groupNoneLayout : null}
            {groupBy === "Genus" ? groupGenusLayout : null}
            {groupBy === "Family" ? groupFamilyLayout : null}
            {groupBy === "Order" ? groupOrderLayout : null}
        </div>
    );
};

export { FruitViewer };
