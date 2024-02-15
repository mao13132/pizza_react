import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Headling from "../../components/Headling/Headling";
import Input from "../../components/Input/Input.";
import styles from './Register.module.css';
import { FormEvent, useEffect, useState } from "react";
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispath, RootState } from "../../store/store";
import { login, register, userActions } from "../../store/user.slice";

export type RegisterForm = {
    email: {
        value: string;
    };
    password: {
        value: string;
    };
    name: {
        value: string;
    }
}



export function Register() {

    /* const [isError, setIsError] = useState<string | null>(); */

    const [animateError, setAnimateError] = useState<boolean>(false);

    const navigate = useNavigate();

    /* Вытаскивает значения из state */

    const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);

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

        dispatch(userActions.clearRegisterError());
        
        const target = e.target as typeof e.target & RegisterForm;

        const { email, password, name } = target;

        

        dispatch(register({ email: email.value, password: password.value, name: name.value }));
    };

    const errorClick = function() {
        setAnimateError(true);

        const timerid = setTimeout(()=>{
            dispatch(userActions.clearRegisterError());
        }, 200);

        return () => {
            clearTimeout(timerid);
        };
    };



    return <div className={styles['login']}>
        <Headling>
            Регистрация
        </Headling>
        {registerErrorMessage && <div onClick={errorClick} className={cn(
            styles['error'], {
                [styles['play-over']]: animateError
            }
        )}>{registerErrorMessage}</div>}
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

            <div className={styles['field']}>

                <label htmlFor="name">
                    Ваше имя
                </label>
                < Input name='name' id='name' placeholder="Имя" />

            </div>

            < Button appearence="big">Зарегистрироваться</Button>


        </form>



        <div className={styles['links']}>
            <div>Есть аккаунт?</div>
            <Link to="/auth/login">Войти</Link>
        </div>

    </div>
};