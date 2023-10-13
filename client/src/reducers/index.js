import { combineReducers } from "redux";
import { createProductReducer, productDetailsReducer, productReducer } from "./productReducer";
import { profileReducer, userReducer } from "./userReducer";
import { cartReducer } from "./cartReducer";



export default combineReducers({
    products: productReducer, productDetails: productDetailsReducer, createProduct: createProductReducer, user: userReducer, profile: profileReducer, cart: cartReducer,
});
