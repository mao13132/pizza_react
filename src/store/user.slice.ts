import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { loadState } from './storate';
import { LoginResponse } from '../interfaces/auth.interface';
import axios from 'axios';
import { AUTH_URL, PREFIX } from '../helpers/API';
import { Profile } from '../interfaces/user.interface';
import { RootState } from './store';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistentState {
    jwt: string | null;
}

export interface UserState {
    jwt: string| null;
    LoginErrorMessage?: string;
    registerErrorMessage?: string;
    profile?: Profile;
};

/* Загружаю jwt из локалсторонаджа если его нет то null */
const initialState: UserState = {
    jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null
}

/* Обёртка которая позволяет запускать асинхронные функции - она дальше обрабатывается в extraReducer */
export const login = createAsyncThunk('user/login', 
    async (params: { email: string, password: string }) => {
        try {
            const { data } = await axios.post<LoginResponse>(`${AUTH_URL}`, {
                username: params.email,
                password: params.password
            });
    
            return data;
        } catch(error_) {
            if (error_ instanceof  axios.AxiosError) {
                
                throw new Error(error_.request.response);
            }
        }

    }
);

export const register = createAsyncThunk('user/register', 
    async (params: { email: string, password: string, name: string }) => {
        try {
            const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/users/`, {
                email: params.email,
                password: params.password,
                username: params.name
            });
    
            return data;
        } catch(error_) {
            if (error_ instanceof  axios.AxiosError) {
                
                throw new Error(error_.request.response);
            }
        }

    }
);

/* Способ как получить токен первый агрумент в функции идут аргументы, а вторым API */
export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>('user/getProfile', 
    async (_, thunkApi) => {
        const jwt = thunkApi.getState().user.jwt;

        const { data } = await axios.get<Profile>(`${PREFIX}/user/profile`, {
            headers: {
                'Authorization': `Token ${jwt}`,
            }
        });
        return data;
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        logout: (oldState) => {
            oldState.jwt = null;
        },
        clearLoginError: (oldState) => {
            oldState.LoginErrorMessage = undefined;
        },
        clearRegisterError: (oldState) => {
            oldState.registerErrorMessage = undefined;
        }
    },

    /* Ловим состояния-ответы из асинхронных оберток, в частности login */
    extraReducers: (builder) => {
        /* fulfilled успешный случай */
        builder.addCase(login.fulfilled, (oldState, action) => {
            if (!action.payload) {return}

            oldState.jwt = action.payload.auth_token;
        });

        builder.addCase(login.rejected, (oldState, action) => {

            oldState.LoginErrorMessage = action.error.message;

            console.log(action.error.message);
            

            return;

        });

        builder.addCase(getProfile.fulfilled, (state, action) => {

            state.profile = action.payload;

        });

        builder.addCase(register.fulfilled, (oldState, action) => {
            if (!action.payload) {return}

            oldState.jwt = action.payload.auth_token;
            

            console.log(action)


            
        });

        builder.addCase(register.rejected, (oldState, action) => {

            oldState.registerErrorMessage = action.error.message;

            console.log(action.error.message);
            

            return;

        });


    }
});


export default userSlice.reducer;
export const userActions =  userSlice.actions;