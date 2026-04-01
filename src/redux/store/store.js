import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from '../reducers';

const loadState = () => {
    try{
        const serializedState = localStorage.getItem('reduxState'); 

        if(serializedState === null){
            return undefined; 
        }

        return JSON.parse(serializedState);
    } catch(err){
        console.error("Error loading the state: " , err); 
        return undefined;
    }
};


const saveState = (state) => {
    try{
        const serializedState = JSON.stringify(state); 
        localStorage.setItem('reduxState', serializedState);
    } catch (err){
        console.error("Error saving the state: " , err);
    }
};

const persistedState = loadState();

// Redux DevTools Extension setup
const composeEnhancers = 
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// Create store with thunk middleware and DevTools
const store = createStore(
  rootReducer,
  persistedState, 
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
    saveState({
        cart: store.getState().cart, 
    });
});

export default store;