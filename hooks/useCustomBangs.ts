import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Bang } from '@/lib/bangs';

interface CustomBangsState {
    bangs: Bang[];
    addBang: (bang: Bang) => void;
    removeBang: (index: number) => void;
    setBangDisabled: (index: number, disabled: boolean) => void;
}

const useCustomBangsStore = create<CustomBangsState>()(
    persist<CustomBangsState>(
        (set) => ({
            bangs: [],
            addBang: (bang: Bang) => {
                set((state) => ({ bangs: [...state.bangs, bang] }));
            },
            removeBang: (index: number) => {
                set((state) => {
                    const newBangs = [...state.bangs];
                    newBangs.splice(index, 1);
                    return { bangs: newBangs };
                });
            },
            setBangDisabled: (index: number, disabled: boolean) => {
                set((state) => {
                    const newBangs = [...state.bangs];
                    if (newBangs[index]) {
                        newBangs[index].disabled = disabled;
                    }
                    return { bangs: newBangs };
                });
            },
        }),
        {
            name: 'bangs-storage',
        }
    )
);

export default useCustomBangsStore;