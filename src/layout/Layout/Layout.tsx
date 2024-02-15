import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from './Layout.module.css'
import Button from "../../components/Button/Button";
import { useEffect } from "react";
import cn from 'classnames';
import axios from "axios";
import { LOGOUT_URL } from "../../helpers/API";
import { loadState } from "../../store/storate";
import { JWT_PERSISTENT_STATE, UserPersistentState, getProfile, profile, userActions } from "../../store/user.slice"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispath, RootState } from "../../store/store";

export function Layout() {
    /* Объект возращающий адресную строку */
    /* const location = useLocation();

    useEffect(() => {
        console.log(location)
    }, [location]); */
    /* Объект возращающий адресную строку */

    const naviget = useNavigate();

    const dispatch = useDispatch<AppDispath>();

    const profileData = useSelector((s: RootState) => s.user.profile);

    const items = useSelector((s: RootState) => s.cart.items);



    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    const logout = async () => {

        try {


            await axios.post(`${LOGOUT_URL}`, {}, {
                headers: {
                    'Authorization': `Token ${loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt}`
                }
            });
        } catch (error_) {
            console.error(error_)
        }

        dispatch(userActions.logout());

        naviget('/auth/login/');
    }


    return <>
        <div className={styles['layout']}>
            <div className={styles['sidebar']}>

                <div className={styles['user']}>

                    <img className={styles['avatar']} src="/avatar.png" alt="Аватар" />
                    <div className={styles['name']}>{profileData?.username}</div>
                    <div className={styles['email']}>{profileData?.email}</div>
                </div>

                <div className={styles['menu']}>


                    <NavLink to="/" className={({ isActive }) => cn(
                        styles['link'], {
                            /* [styles.active]: location.pathname === '/'
 */                            [styles.active]: isActive
                    }
                    )}>
                        <img src="/menu-icon.svg" alt="Иконка меню" className={styles['img-icon']} />
                        Меню</NavLink>
                    <div className={styles['cart-item']}>
                        <NavLink to="/cart" className={({ isActive }) => cn(
                            styles['link'], {
                            /* [styles.active]: location.pathname === '/'
 */                            [styles.active]: isActive
                        }
                        )}>
                            <img src="/cart-icon.svg" alt="Иконка корзины" className={styles['img-icon']} />
                            Корзина</NavLink>
                        <span className={styles['count-cart']}>{items.reduce((accum, item) => accum += item.count, 0)}</span>
                    </div>


                </div>

                <Button className={styles['exit']} onClick={logout}>

                    <img src="/exit-icon.svg" alt="Иконка выхода" className={styles['img-exit']} />Выход
                </Button>

            </div>

            <div className={styles['content']}>
                <Outlet />
            </div>

        </div>


    </>;
}