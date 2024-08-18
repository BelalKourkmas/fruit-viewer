import { SortableTable } from "./SortableTable";
import { useFruitsContext } from "../context/FruitsContext";
import { ModifiedFruit } from "../types/fruitTypes";

const JarViewer = () => {
    const { selectedFruits, handleRemoveFruit, calories } = useFruitsContext();

    const removeButton = (fruit: ModifiedFruit) => {
        return (
            <div
                onClick={() => handleRemoveFruit(fruit)}
                className="inline-block border border-gray-500 px-2 py-1 m-1 cursor-pointer hover:bg-red-700"
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

    const keyFn = (fruit: ModifiedFruit) => {
        return fruit.index;
    };

    return (
        <div>
            <div className="text-3xl">Jar: {calories} Calories</div>
            <SortableTable
                data={selectedFruits}
                config={config}
                keyFn={keyFn}
            />
        </div>
    );
};

export { JarViewer };
