import { Dropdown } from "./Dropdown";
import { CollapsibleHeader } from "./CollapsibleHeader";
import { Fruit } from "../types/fruitTypes";
import { useFruitsContext } from "../context/FruitsContext";

const FruitViewer = () => {
    const { fruits } = useFruitsContext();
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
                console.log("group by none");
            },
        },
        {
            label: "Family",
            onClick: () => {
                console.log("group by family");
            },
        },
        {
            label: "Order",
            onClick: () => {
                console.log("group by order");
            },
        },
        {
            label: "Genus",
            onClick: () => {
                console.log("group by genus");
            },
        },
    ];
    return (
        <div>
            <Dropdown label={"Group By:"} options={groupByOptions} />
            <CollapsibleHeader />
        </div>
    );
};

export { FruitViewer };
