import { Dropdown } from "./Dropdown";
import { useFruitsContext } from "../context/FruitsContext";
import { useEffect, useState } from "react";
import { SortableTable } from "./SortableTable";
import { CollapsibleHeader } from "./CollapsibleHeader";
import { useSortableFruit } from "../hooks/useSortableFruit";

const FruitViewer = () => {
    const { fruits } = useFruitsContext();
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

    const { config, keyFn } = useSortableFruit();

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
            <div className="text-2xl p-3">
                <Dropdown label={"Group By:"} options={groupByOptions} />
            </div>
            {groupBy === "None" ? groupNoneLayout : null}
            {groupBy === "Genus" ? groupGenusLayout : null}
            {groupBy === "Family" ? groupFamilyLayout : null}
            {groupBy === "Order" ? groupOrderLayout : null}
        </div>
    );
};

export { FruitViewer };
