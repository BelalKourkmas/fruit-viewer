import { useState, useEffect } from "react";
import { Fruit } from "../types/fruitTypes";

const useFruits = () => {
    const [fruits, setFruits] = useState<Fruit[]>([]);

    useEffect(() => {
        const fetchAllFruits = async (): Promise<Fruit[]> => {
            try {
                const response = await fetch("/api/fruit/all");

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data: Fruit[] = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching all fruits:", error);
                return [];
            }
        };

        const fetchData = async () => {
            const fetchedFruits = await fetchAllFruits();
            setFruits(fetchedFruits);
        };

        fetchData();
    }, []);

    return fruits;
};

export { useFruits };
