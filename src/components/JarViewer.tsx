import { useSortableFruit } from "../hooks/useSortableFruit";
import { SortableTable } from "./SortableTable";
import { useFruitsContext } from "../context/FruitsContext";
import { ModifiedFruit } from "../types/fruitTypes";

const JarViewer = () => {
    const removeButton = (fruit: ModifiedFruit) => {
        return (
            <div
                onClick={() => handleRemoveFruit(fruit.index)}
                className="inline-block border border-gray-500 px-2 py-1 m-1 cursor-pointer"
            >
                Remove
            </div>
        );
    };
    const config = [
        {
            label: "Name",
            render: (fruit: ModifiedFruit) => fruit.name,
            sortValue: (fruit: ModifiedFruit) => fruit.name,
        },
        {
            label: "Calories",
            render: (fruit: ModifiedFruit) => fruit.nutritions.calories,
            sortValue: (fruit: ModifiedFruit) => fruit.nutritions.calories,
        },
        {
            label: " ",
            render: (fruit: ModifiedFruit) => removeButton(fruit),
        },
    ];
    const { selectedFruits, handleRemoveFruit } = useFruitsContext();

    const keyFn = (fruit: ModifiedFruit) => {
        // Generate a unique key using the fruit's ID and its position in the array
        return fruit.index.toString();
    };

    return (
        <SortableTable data={selectedFruits} config={config} keyFn={keyFn} />
    );
};

export { JarViewer };
