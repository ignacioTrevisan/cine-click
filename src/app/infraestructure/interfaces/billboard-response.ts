export interface BillboardResponse {
    ok: boolean;
    data: Datum[];
}

export interface Datum {
    id: string;
    movieId: string;
    date: string;
    time: string;
    Price: number;
    movieTheaterId: string;
    movie: Movie;
    movieTheater: MovieTheater;
    TicketSold: number
}

export interface Movie {
    id: string;
    title: string;
    description: string;
    durationMin: number;
    isAdult: boolean;
    tags: string[];
    slug: string
}

export interface MovieTheater {
    id: string;
    capacity: number;
    name: string;
}



