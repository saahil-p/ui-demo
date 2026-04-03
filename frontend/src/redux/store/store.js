import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from '../reducers';
import { loadState, saveState } from './helpers/localStorageHelper';

const persistedState = loadState();

const composeEnhancers = 
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

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