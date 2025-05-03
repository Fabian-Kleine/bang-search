import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
    searchEngine: string;
    setSearchEngine: (engine: string) => void;
    openInNewTab: boolean;
    setOpenInNewTab: (newTab: boolean) => void;
}

const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            searchEngine: 'google',
            setSearchEngine: (engine: string) => set({ searchEngine: engine }),
            openInNewTab: false,
            setOpenInNewTab: (openInNewTab: boolean) => set({ openInNewTab }),
        }),
        {
            name: 'settings-storage',
        }
    )
);

export default useSettingsStore;