export interface Summary {
    readingsOk: number;
    mediumAlerts: number;
    redAlerts: number;
    disabledSensors: number;
}
 
export interface Plant {
    id: number;
    nombre: string;
    countryName: string;
    okReadings?: number;
    mediumAlerts?: number;
    redAlerts?: number;
}


export interface Country {
    name: string; // Nombre del país
    flagUrl: string; // URL de la bandera
    flags?: { // Estructura opcional para cumplir con la API
        png: string;
        svg?: string;
        alt?: string;
    };
}

export interface TokenPayload {
    username: string;
    role: string;
    exp: number; // Fecha de expiración
}
