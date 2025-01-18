export interface TicketsBYIDAPIResponse {
    ok: boolean;
    data: Datum[];
}

export interface Datum {
    id: string;
    movieTransmitionId: string;
    quantity: number;
    userId: string;
    createdAt: Date;
    paidAt: Date;
    totalPrice: string;
    movieTransmition: MovieTransmition;
}

export interface MovieTransmition {
    id: string;
    movieId: string;
    date: Date;
    time: string;
    Price: number;
    movieTheaterId: string;
    TicketSold: number;
    movie: Movie;
    movieTheater: MovieTheater;
}

export interface Movie {
    id: string;
    title: string;
    description: string;
    durationMin: number;
    slug: string;
    isAdult: boolean;
    tags: string[];
}

export interface MovieTheater {
    id: string;
    capacity: number;
    name: string;
}
