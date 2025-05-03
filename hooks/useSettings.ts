import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
    searchEngine: string;
    setSearchEngine: (engine: string) => void;
}

const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            searchEngine: 'google',
            setSearchEngine: (engine: string) => set({ searchEngine: engine }),
        }),
        {
            name: 'settings-storage',
        }
    )
);

export default useSettingsStore;