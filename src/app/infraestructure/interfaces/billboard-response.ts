export interface BillboardResponse {
    ok: boolean;
    data: Datum[];
}

export interface Datum {
    id: string;
    movieId: string;
    date: Date;
    time: string;
    Price: number;
    movieTheaterId: string;
    movie: Movie;
    movieTheater: MovieTheater;
}

export interface Movie {
    id: string;
    title: string;
    description: string;
    durationMin: number;
    isAdult: boolean;
    tags: string[];
}

export interface MovieTheater {
    id: string;
    capacity: number;
    name: string;
}
