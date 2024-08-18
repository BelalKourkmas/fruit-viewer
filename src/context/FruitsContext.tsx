import { createContext, useContext, useState, useEffect } from "react";
import { Fruit, ModifiedFruit } from "../types/fruitTypes";

interface FruitsContextType {
    fruits: Fruit[];
    loading: boolean;
    error: string | null;
    selectedFruits: ModifiedFruit[];
    handleAddFruit: (fruit: Fruit) => void;
    handleAddFruits: (fruit: Fruit[]) => void;
    handleRemoveFruit: (index: number) => void;
}

const FruitsContext = createContext<FruitsContextType>({
    fruits: [],
    loading: true,
    error: null,
    selectedFruits: [],
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

    const [selectedFruits, setSelectedFruits] = useState<ModifiedFruit[]>([]);

    const handleAddFruit = (fruit: Fruit) => {
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
                // Use index to differentiate fruits in this batch
                const newIndex = prevCounter + index + 1;
                return { index: newIndex, ...fruit };
            });

            setSelectedFruits((prevFruits) => [...prevFruits, ...newFruits]);
            return prevCounter + fruits.length;
        });
    };

    const handleRemoveFruit = (index: number) => {
        setSelectedFruits((prevFruits) =>
            prevFruits.filter((fruit) => fruit.index !== index)
        );
    };

    const value: FruitsContextType = {
        fruits,
        loading,
        error,
        selectedFruits,
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
