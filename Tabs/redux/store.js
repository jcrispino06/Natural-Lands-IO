import {createStore,combineReducers} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './account';
import themeReducer from './themeReducer';
import treeReducer from './tree'

const rootReducer = combineReducers({
    account:accountReducer,
    // themeReducer:themeReducer,
    trees:treeReducer
});

const store = createStore(rootReducer);

export default store;