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
import { useDispatch, useSelector } from 'react-redux';
import { AppDispath, RootState } from "../../store/store";
import { JWT_PERSISTENT_STATE, login, userActions } from "../../store/user.slice";

export type LoginForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    }
}



export function Login() {

    /* const [isError, setIsError] = useState<string | null>(); */

    const [animateError, setAnimateError] = useState<boolean>(false);

    const navigate = useNavigate();

    /* Вытаскивает значения из state */

    const { jwt, LoginErrorMessage } = useSelector((s: RootState) => s.user);

    useEffect(() => {

        if (jwt) {
            navigate('/');
        }

    }, [jwt, navigate]);

    /* Подключаем стор и его состояния */
    const dispatch = useDispatch<AppDispath>();
    
    const submit = async (e: FormEvent) => {
        e.preventDefault();

        setAnimateError(false);

        /* setIsError(null); */

        dispatch(userActions.clearLoginError());
        
        const target = e.target as typeof e.target & LoginForm;

        const { email, password } = target;

        await sendLogin(email.value, password.value);
    };

    const errorClick = function() {
        setAnimateError(true);

        const timerid = setTimeout(()=>{
            dispatch(userActions.clearLoginError());
        }, 200);

        return () => {
            clearTimeout(timerid);
        };
    };


    const sendLogin = async (email: string, password: string) => {
            dispatch(login({ email, password }));
    };


    return <div className={styles['login']}>
        <Headling>
            Вход
        </Headling>
        {LoginErrorMessage && <div onClick={errorClick} className={cn(
            styles['error'], {
                [styles['play-over']]: animateError
            }
        )}>{LoginErrorMessage}</div>}
        <form className={styles['form']} onSubmit={submit}>

            <div className={styles['field']}>

                <label htmlFor="email">
                    Ваш Email
                </label>
                < Input name='email' id='email' placeholder="Email" />

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