import { createContext, useContext, useState, useEffect } from "react";
import { Fruit, ModifiedFruit } from "../types/fruitTypes";

interface FruitsContextType {
    fruits: Fruit[];
    loading: boolean;
    error: string | null;
    selectedFruits: ModifiedFruit[];
    calories: number;
    handleAddFruit: (fruit: Fruit) => void;
    handleAddFruits: (fruit: Fruit[]) => void;
    handleRemoveFruit: (fruit: ModifiedFruit) => void;
}

const FruitsContext = createContext<FruitsContextType>({
    fruits: [],
    loading: true,
    error: null,
    selectedFruits: [],
    calories: 0,
    handleAddFruit: () => {},
    handleAddFruits: () => {},
    handleRemoveFruit: () => {},
});

export const useFruitsContext = () => useContext(FruitsContext);

const FruitsProvider = ({ children }: { children: React.ReactNode }) => {
    const [fruits, setFruits] = useState<Fruit[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [counter, setCounter] = useState(0);
    const [calories, setCalories] = useState(0);
    const [selectedFruits, setSelectedFruits] = useState<ModifiedFruit[]>([]);

    // Instead of making multiple API calls, I use one and process it.
    // Considered saving response to a cookie.
    useEffect(() => {
        const fetchAllFruits = async (): Promise<Fruit[]> => {
            try {
                const response = await fetch("/api/fruit/all");

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data: Fruit[] = await response.json();
                console.log(data);
                return data;
            } catch (error) {
                console.error("Error fetching all fruits:", error);
                return [];
            }
        };

        const fetchData = async () => {
            setLoading(true);
            try {
                const fetchedFruits = await fetchAllFruits();
                setFruits(fetchedFruits);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unknown error has occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Modified fruit contains a key that can be used in Jar.
    const handleAddFruit = (fruit: Fruit) => {
        setCalories(calories + fruit.nutritions.calories);
        // prevent useState bugs with functional updates
        setCounter((prevCounter) => {
            const newFruit: ModifiedFruit = {
                index: prevCounter + 1,
                ...fruit,
            };
            setSelectedFruits((prevFruits) => [...prevFruits, newFruit]);
            return prevCounter + 1;
        });
    };

    const handleAddFruits = (fruits: Fruit[]) => {
        setCounter((prevCounter) => {
            const newFruits: ModifiedFruit[] = fruits.map((fruit, index) => {
                setCalories((prevCalories) => {
                    return fruit.nutritions.calories + prevCalories;
                });
                const newIndex = prevCounter + index + 1;
                return { index: newIndex, ...fruit };
            });

            setSelectedFruits((prevFruits) => [...prevFruits, ...newFruits]);
            return prevCounter + fruits.length;
        });
    };

    const handleRemoveFruit = (modifiedFruit: ModifiedFruit) => {
        setCalories((prevCalories) => {
            return prevCalories - modifiedFruit.nutritions.calories;
        });
        setSelectedFruits((prevFruits) =>
            prevFruits.filter((fruit) => fruit.index !== modifiedFruit.index)
        );
    };

    const value: FruitsContextType = {
        fruits,
        loading,
        error,
        selectedFruits,
        calories,
        handleAddFruit,
        handleAddFruits,
        handleRemoveFruit,
    };

    return (
        <FruitsContext.Provider value={value}>
            {children}
        </FruitsContext.Provider>
    );
};

export default FruitsProvider;
