export interface Country {
    id: number;
    name: string;
    country: Country;
}

export interface Plant {
    id: number;
    name: string;
    country: Country;
}