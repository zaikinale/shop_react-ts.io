// import { createStore } from 'redux';
// import appReducer from './reducer';

// const store = createStore(
//     appReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
// );

// export default store;

// store/index.js


import { createStore } from 'redux';
import appReducer from './reducer';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('reduxState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error("Could not load state from localStorage", err);
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify({
            likedItems: state.likedItems,
            basketItems: state.basketItems,
        });
        localStorage.setItem('reduxState', serializedState);
    } catch (err) {
        console.error("Could not save state to localStorage", err);
    }
};

const persistedState = loadState();

const store = createStore(
    appReducer,
    persistedState, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
);

store.subscribe(() => {
    saveState(store.getState());
});

export default store;