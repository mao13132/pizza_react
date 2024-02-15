import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storate';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistentState {
    jwt: string | null;
}

export interface UserState {
    jwt: string| null;
};

/* Загружаю jwt из локалсторонаджа если его нет то null */
const initialState: UserState = {
    jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        addJwt: (oldState, action:PayloadAction<string>) => {
            oldState.jwt = action.payload;
        },
        logout: (oldState) => {
            oldState.jwt = null;
        }
    }
});


export default userSlice.reducer;
export const userActions =  userSlice.actions;