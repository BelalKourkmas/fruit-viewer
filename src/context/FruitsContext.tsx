import { createContext, useContext, useState, useEffect } from "react";
import { Fruit } from "../types/fruitTypes";

interface FruitsContextType {
    fruits: Fruit[];
    loading: boolean;
    error: string | null;
}

const FruitsContext = createContext<FruitsContextType>({
    fruits: [],
    loading: true,
    error: null,
});

export const useFruitsContext = () => useContext(FruitsContext);

const FruitsProvider = ({ children }: { children: React.ReactNode }) => {
    const [fruits, setFruits] = useState<Fruit[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
                    setError("An unknown error has occured");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const value: FruitsContextType = { fruits, loading, error };

    return (
        <FruitsContext.Provider value={value}>
            {children}
        </FruitsContext.Provider>
    );
};

export default FruitsProvider;
