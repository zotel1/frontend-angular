export interface Summary {
    readingsOk: number;
    mediumAlerts: number;
    redAlerts: number;
    disabledSensors: number;
}
 
export interface Plant {
    id: number;
    nombre: string;
    country: Country;
    cantidadLecturas: number;
    alertasMedias: number;
    alertasRojas: number;
}

export interface Country {
    id: number;
    name: string;
    flagUrl: string;
}

export interface TokenPayload {
    username: string;
    role: string;
    exp: number; // Fecha de expiración
}
