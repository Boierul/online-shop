/* Redux Toolkit is allowing to reduce the default boilerplate of Redux  */
import {createSlice} from "@reduxjs/toolkit";

/* Will instantiate the empty card. Global state. */
const initialState = {
    isCartOpen: false,
    cart: [],
    items: [],
};

/* Slices defines the reducer logic and performs state actions */
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setItems: (state, action) => {
            // Redux should not mutate the state, but
            // Redux Toolkit is designed to mutate the state
            state.items = action.payload;
        },

        addToCart: (state, action) => {
            state.cart = [...state.cart, action.payload.item];
        },

        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id);
        },

        increaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id) {
                    item.count++;
                }
                return item;
            });
        },

        decreaseCount: (state, action) => {
            state.cart = state.cart.map((item) => {
                if (item.id === action.payload.id && item.count > 1) {
                    item.count--;
                }
                return item;
            });
        },

        setIsCartOpen: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },

    }
})

export const {
    setItems,
    addToCart,
    removeFromCart,
    increaseCount,
    decreaseCount,
    setIsCartOpen
} = cartSlice.actions;

export default cartSlice.reducer