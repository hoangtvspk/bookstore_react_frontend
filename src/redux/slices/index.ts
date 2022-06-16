import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import addressSlice from "./addressSlice";
import keySearchSlice from "./keySearchSlice";
import bookDetailSlice from "./bookDetailSlice";
import {combineReducers} from 'redux';


export const appReducers = combineReducers({authSlice, cartSlice, bookDetailSlice,keySearchSlice,addressSlice})