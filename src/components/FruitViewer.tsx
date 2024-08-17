import { Dropdown } from "./Dropdown";
import { CollapsibleHeader } from "./CollapsibleHeader";
import { Fruit } from "../types/fruitTypes";
import { useFruitsContext } from "../context/FruitsContext";
import { useState } from "react";
import { Table } from "./Table";
import { SortableTable } from "./SortableTable";

const FruitViewer = () => {
    const { fruits } = useFruitsContext();
    const [groupBy, setGroupBy] = useState("None");
    console.log(fruits);

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
    ];

    const keyFn = (fruit: Fruit) => {
        return fruit.name;
    };
    return (
        <div>
            <Dropdown label={"Group By:"} options={groupByOptions} />
            <SortableTable data={fruits} config={config} keyFn={keyFn} />
        </div>
    );
};

export { FruitViewer };
