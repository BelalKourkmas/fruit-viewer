import { useFruitsContext } from "../context/FruitsContext";
import { Fruit } from "../types/fruitTypes";

// hook to reduce reused code
const useSortableFruit = () => {
    const { handleAddFruit } = useFruitsContext();

    const handleAddClick = (fruit: Fruit) => {
        return handleAddFruit(fruit);
    };

    const addButton = (fruit: Fruit) => {
        return (
            <div
                onClick={() => handleAddClick(fruit)}
                className="inline-block border border-gray-500 px-2 py-1 m-1 cursor-pointer hover:bg-green-700"
            >
                Add
            </div>
        );
    };
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

    const keyFn = (fruit: Fruit) => {
        return fruit.name;
    };

    return { config, keyFn };
};

export { useSortableFruit };
