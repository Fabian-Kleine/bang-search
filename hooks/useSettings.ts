import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
    searchEngine: string;
    setSearchEngine: (engine: string) => void;
    openInNewTab: boolean;
    setOpenInNewTab: (newTab: boolean) => void;
    searchHistoryActive: boolean;
    setSearchHistoryActive: (active: boolean) => void;
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
        }),
        {
            name: 'settings-storage',
        }
    )
);

export default useSettingsStore;