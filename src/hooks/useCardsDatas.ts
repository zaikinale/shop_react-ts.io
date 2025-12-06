import { useSelector } from 'react-redux';
import type { AppState } from '../types/state'; 
import type { Product } from '../types/api';

export function useCardsDatas() {
    const cards = useSelector((state: AppState) => state.cards) || [];
    const likedItems = useSelector((state: AppState) => state.likedItems) || [];
    const basketItems = useSelector((state: AppState) => state.basketItems) || {};
    const typesItems = useSelector((state: AppState) => state.types) || [];

    const likedCards = (cards as Product[]).filter(item =>
        likedItems.includes(item.id)
    );

    const basketCards = (cards as Product[]).filter(item =>
        (basketItems[String(item.id)] || 0) > 0
    );

    return {
        cards,
        likedItems,
        basketItems,
        typesItems,
        likedCards,
        basketCards,
    };
}