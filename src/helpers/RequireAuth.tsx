import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { loadState } from '../store/storate';
import { JWT_PERSISTENT_STATE, UserPersistentState } from '../store/user.slice';
import { RootState } from '../store/store';


export const RequireAuth = ( { children }: { children: ReactNode } ) => {
    

    /* const jwt = loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt; */

    /* Получаю из редакса данные jwt */
    const jwt = useSelector((s: RootState) => s.user.jwt);
    
    
    if (!jwt) {
        return <Navigate to='/auth/login' replace />
    }

    return children;
}