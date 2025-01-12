export interface Country {
    id: number;
    name: string;
    flagUrl: String;
}

export interface Plant {
    id: number;
    name: string;
    countryId: number;
    readings: number;
    alerts: number;
}