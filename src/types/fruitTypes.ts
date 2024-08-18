interface Nutritions {
    carbohydrates: number;
    protein: number;
    fat: number;
    calories: number;
    sugar: number;
}

export interface Fruit {
    genus: string;
    name: string;
    id: number;
    family: string;
    order: string;
    nutritions: Nutritions;
}

export interface ModifiedFruit {
    index: number;
    genus: string;
    name: string;
    id: number;
    family: string;
    order: string;
    nutritions: Nutritions;
}
