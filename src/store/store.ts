import { configureStore } from "@reduxjs/toolkit";
import userSlice, { JWT_PERSISTENT_STATE } from "./user.slice";
import { saveState } from "./storate";
import cartSlice, { CART_PERSISTENT_STATE } from "./cart.slice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        cart: cartSlice
    }
});

/* Подписываемся на изменнения jwt и сохраняем его в стор */
store.subscribe(() => {
    /* saveState(store.getState().user.jwt, JWT_PERSISTENT_STATE) */
    saveState({ jwt: store.getState().user.jwt}, JWT_PERSISTENT_STATE);
    /* Сохранение корзины */
    saveState(store.getState().cart, CART_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispath = typeof store.dispatch;

