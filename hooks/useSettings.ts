import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
    searchEngine: string;
    setSearchEngine: (engine: string) => void;
    openInNewTab: boolean;
    setOpenInNewTab: (newTab: boolean) => void;
    searchHistoryActive: boolean;
    setSearchHistoryActive: (active: boolean) => void;
    sync: {
        id: string;
        createdAt: number;
    };
    setSyncId: (id: string) => void;
    setSyncCreatedAt: (createdAt: number) => void;
}

const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            searchEngine: 'google',
            setSearchEngine: (engine: string) => set({ searchEngine: engine }),
            openInNewTab: true,
            setOpenInNewTab: (openInNewTab: boolean) => set({ openInNewTab }),
            searchHistoryActive: true,
            setSearchHistoryActive: (searchHistoryActive: boolean) => set({ searchHistoryActive }),
            sync: {
                id: '',
                createdAt: 0,
            },
            setSyncId: (id: string) => set((state) => ({ sync: { ...state.sync, id } })),
            setSyncCreatedAt: (createdAt: number) => set((state) => ({ sync: { ...state.sync, createdAt } })),
        }),
        {
            name: 'settings-storage',
        }
    )
);

export default useSettingsStore;