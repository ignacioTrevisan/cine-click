export interface GetAllMoviesResponse {
    ok: boolean;
    movies: Movie[];
}

export interface Movie {
    id: string;
    title: string;
    description: string;
    durationMin: number;
    isAdult: boolean;
    tags: string[];
    PrincipalImage: Image[];
    Images: Image[];
}

export interface Image {
    id: number;
    Url: string;
    movieId: string;
}
