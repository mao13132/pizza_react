import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Headling from "../../components/Headling/Headling";
import Input from "../../components/Input/Input.";
import styles from './Login.module.css';
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { AUTH_URL, PREFIX } from "../../helpers/API";
import cn from 'classnames';
import { LoginResponse } from "../../interfaces/auth.interface";
import { useDispatch } from 'react-redux';
import { AppDispath } from "../../store/store";
import { JWT_PERSISTENT_STATE, userActions } from "../../store/user.slice";

export type LoginForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    }
}



export function Login() {

    const [isError, setIsError] = useState<string | null>();

    const [animateError, setAnimateError] = useState<boolean>(false);

    const navigate = useNavigate();

    /* Подключаем стор и его состояния */
    const dispatch = useDispatch<AppDispath>();
    
    const submit = async (e: FormEvent) => {
        e.preventDefault();

        setAnimateError(false);

        setIsError(null);
        
        const target = e.target as typeof e.target & LoginForm;

        const { email, password } = target;

        await sendLogin(email.value, password.value);
    };

    const errorClick = function() {
        setAnimateError(true);

        const timerid = setTimeout(()=>{
            setIsError(null);
        }, 200);

        return () => {
            clearTimeout(timerid);
        };
    };


    const sendLogin = async (email: string, password: string) => {
            try {
                const { data } = await axios.post<LoginResponse>(`${AUTH_URL}`, {
                    username: email,
                    password: password
                });
    
                console.log(data);

                /* localStorage.setItem(JWT_PERSISTENT_STATE, data.auth_token); */
                
                /* Добавляю токен в стейт */
                dispatch(userActions.addJwt(data.auth_token));

                navigate('/');

            } catch(error_) {
                if (error_ instanceof axios.AxiosError) {
                    setIsError(error_.request.response);
                }
            }
    };


    return <div className={styles['login']}>
        <Headling>
            Вход
        </Headling>
        {isError && <div onClick={errorClick} className={cn(
            styles['error'], {
                [styles['play-over']]: animateError
            }
        )}>{isError}</div>}
        <form className={styles['form']} onSubmit={submit}>

            <div className={styles['field']}>

                <label htmlFor="email">
                    Ваш Email
                </label>
                < Input name='name' id='email' placeholder="Email" />

            </div>

            <div className={styles['field']}>

                <label htmlFor="passowrd">
                    Ваш пароль
                </label>
                < Input name='password' id='passowrd' type='password' placeholder="Пароль" />

            </div>

            < Button appearence="big">Вход</Button>


        </form>



        <div className={styles['links']}>
            <div>Нет аккаунта?</div>
            <Link to="/auth/register">Зарегистрироваться</Link>
        </div>

    </div>
};