import { create } from 'zustand';

interface TransmitionsSelectedState {
    movieId: string | null;
    setMovieId: (id: string) => void;
    clearMovieId: () => void;
}

const useTransmitionsSelectedStore = create<TransmitionsSelectedState>((set) => ({
    movieId: null,
    setMovieId: (id: string) => set({ movieId: id }),
    clearMovieId: () => set({ movieId: null }),
}));

export default useTransmitionsSelectedStore;