// store/useMovieStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
    userId: string | null;
    setUserId: (id: string) => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            userId: null,
            setUserId: (id: string) => set({ userId: id }),
        }), { name: "user-id" }));