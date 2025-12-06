import type { Product, Category } from './api.tsx'

export interface AppState {
    likedItems: number[];
    basketItems: Record<string, number>; 
    cards: Product[];
    types: Category[];
}