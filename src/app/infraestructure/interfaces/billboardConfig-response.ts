export interface BillboardConfigResponse {
    soon: Soon[];
    newRelease: NewRelease[];
}
export interface Soon {
    movieId: string
}
export interface NewRelease {
    movieId: string;
}
