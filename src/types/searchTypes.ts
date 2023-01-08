export interface CitiesSelect {
    value: number;
    label: string;
}

export interface Cities {
    value: number;
    label: string;
    state: string;
    country: string;
    coord: Coord;
}

export interface Coord {
    lon: number;
    lat: number;
}