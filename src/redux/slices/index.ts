import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import {combineReducers} from 'redux';

export const appReducers = combineReducers({authSlice, cartSlice})