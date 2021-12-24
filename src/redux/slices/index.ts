import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import bookDetailSlice from "./bookDetailSlice";
import {combineReducers} from 'redux';

export const appReducers = combineReducers({authSlice, cartSlice, bookDetailSlice})