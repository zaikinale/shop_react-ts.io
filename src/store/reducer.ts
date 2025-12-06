const initialState = {
    likedItems: [],
    basketItems: {},
    cards: [],
    types: []
};

function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'RESET_APP':
            return {
                ...initialState,
                cards: state.cards,
                types: state.types,
                likedItems: [],
                basketItems: {}
            };

        case 'SET_TYPES':
            return {
                ...state,
                types: action.payload
            };

        case 'SET_CARDS':
            return {
                ...state,
                cards: action.payload
            };

        case 'LIKE_ITEM': {
            const id = action.payload.id;
            const isLiked = state.likedItems.includes(id);
            return {
                ...state,
                likedItems: isLiked
                    ? state.likedItems.filter(item => item !== id)
                    : [...state.likedItems, id]
            };
        }

        case 'SET_BASKET_ITEM_COUNT': {
            const { id, count } = action.payload;

            if (count <= 0) {
                const newBasket = { ...state.basketItems };
                delete newBasket[id];
                return {
                    ...state,
                    basketItems: newBasket
                };
            }

            return {
                ...state,
                basketItems: {
                    ...state.basketItems,
                    [id]: count
                }
            };
        }

        case 'ADD_TO_BASKET': {
            const id = action.payload.id;
            const currentCount = state.basketItems[id] || 0;
            const newCount = currentCount > 0 ? 0 : 1; 

            if (newCount === 0) {
                const newBasket = { ...state.basketItems };
                delete newBasket[id];
                return { ...state, basketItems: newBasket };
            }

            return {
                ...state,
                basketItems: {
                    ...state.basketItems,
                    [id]: newCount
                }
            };
        }

        default:
            return state;
    }
}

export default appReducer;