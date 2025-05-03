import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchHistoryState {
  history: string[];
  addSearch: (term: string) => void;
  removeSearch: (index: number) => void; // Add removeSearch signature
}

const useSearchHistoryStore = create<SearchHistoryState>()(
  persist(
    (set) => ({
      history: [],
      addSearch: (term: string) => {
        if (!term || term.trim() === '') return; // Ignore empty searches
        const trimmedTerm = term.trim();
        set((state) => {
          // Remove existing term if it exists, then add to the beginning
          const filteredHistory = state.history.filter(
            (item) => item !== trimmedTerm
          );
          // Limit history size to 10 items
          const newHistory = [trimmedTerm, ...filteredHistory].slice(0, 10);
          return { history: newHistory };
        });
      },
      // Implement removeSearch action
      removeSearch: (index: number) => {
        set((state) => {
          if (index < 0 || index >= state.history.length) {
            // Index out of bounds, do nothing or handle error
            return {};
          }
          const newHistory = state.history.filter((_, i) => i !== index);
          return { history: newHistory };
        });
      },
    }),
    {
      name: 'search-history',
    }
  )
);

export default useSearchHistoryStore;
