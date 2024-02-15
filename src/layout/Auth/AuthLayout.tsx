import { Outlet } from "react-router-dom";
import styles from './AuthLayout.module.css'
import cn from 'classnames';

export function AuthLayout() {


    return <div className={styles['layout']}>
            <div className={styles['logo']}>
                <img className={styles['logo-img']} src="/auth-logo.svg" alt="Логотип компании" />
            </div>

            <div className={styles['content']}>
                <Outlet />
            </div>

        </div>;
}