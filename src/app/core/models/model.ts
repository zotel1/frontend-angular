export interface Summary {
    cantidadLecturas: number;
    alertasMedias: number;
    alertasRojas: number;
    sensoresInactivos: number;
}
 
export interface Plant {
    id: number;
    nombre: string;
    countryName: string;
    countryFlagUrl: string;
    cantidadLecturas: number;
    alertasMedias: number;
    alertasRojas: number;
    sensoresInactivos: number;
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
