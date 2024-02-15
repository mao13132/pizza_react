import { Link, Outlet, useLocation } from "react-router-dom";
import styles from './Layout.module.css'
import Button from "../../components/Button/Button";
import { useEffect } from "react";
import cn from 'classname';

export function Layout() {
    /* Объект возращающий адресную строку */
    const location = useLocation();

    useEffect(() => {
        console.log(location)
    }, [location]);
    /* Объект возращающий адресную строку */


    return <>
        <div className={styles['layout']}>
            <div className={styles['sidebar']}>

                <div className={styles['user']}>

                    <img className={styles['avatar']} src="/avatar.png" alt="Аватар" />
                    <div className={styles['name']}>Имя пользователя</div>
                    <div className={styles['email']}>x1@bk.ru</div>
                </div>

                <div className={styles['menu']}>


                    <Link to="/" className={cn(
                        styles['link'], {
                            [styles.active]: location.pathname === '/'
                        }
                    )}>
                        <img src="/menu-icon.svg" alt="Иконка меню" className={styles['img-icon']} />
                        Меню</Link>
                    <Link to="/cart" className={styles['link']}>

                        <img src="/cart-icon.svg" alt="Иконка корзины" className={styles['img-icon']} />
                        Корзина</Link>

                </div>

                <Button className={styles['exit']}>

                    <img src="/exit-icon.svg" alt="Иконка выхода" className={styles['img-exit']} />Выход
                </Button>

            </div>
        </div>

        <div>
            <Outlet />
        </div>
    </>;
}