import { create } from "zustand";

export interface SideBarState {
    isOpenSideBar: boolean;
    openSideBar: () => void;
    closeSideBar: () => void;
}

export const SideBarStore = create<SideBarState>()((set, get) => ({
    isOpenSideBar: false,
    openSideBar: () => { set({ isOpenSideBar: true }) },
    closeSideBar: () => { set({ isOpenSideBar: false }) },
}));