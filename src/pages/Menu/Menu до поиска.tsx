import { ChangeEvent, useEffect, useState } from "react";
import Headling from "../../components/Headling/Headling";
import ProductCard from "../../components/ProductCard/ProductCard";
import Search from "../../components/Search/Search";
import { Product } from "../../interfaces/product.interface";
import styles from '../../pages/Menu/Menu.module.css';
import { PREFIX } from "../../helpers/API";
import axios from "axios";
import { MenuList } from "./MenuList/MenuList";
import { useNavigate } from "react-router-dom";
import { loadState } from "../../store/storate";
import { JWT_PERSISTENT_STATE, UserPersistentState } from "../../store/user.slice";


export function Menu() {

    const [products, setProducts] = useState<Product[]>([]);
    
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [isError, setIsError] = useState<string | undefined>();

    const navigate = useNavigate();

    useEffect(() => {
        getMenu();
    }, []);

    const getMenu = async () => {
        try {
            
            setIsLoading(true);
            
            const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
                headers: {
                    'Authorization': `Token ${loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt}`
                }
            });

            setProducts(data);
            
            setIsLoading(false);

        } catch(error_) {
            console.log(error_);

            if (error_ instanceof axios.AxiosError) {
                if (error_.response?.statusText === 'Unauthorized') {
                    setIsError('Требуется авторизация')
                    
                    navigate('/auth/login/');

                } else {
                    setIsError(error_.message)
                }

                
            }

            setIsLoading(false);
            return;
        }

    };

    const updateFilter = (event: ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    };

    return <>
        <div className={styles['head']}>
            <Headling>Меню</Headling>
            <Search placeholder='Введите блюдо или состав' onChange={updateFilter} />
        </div>

        <div>
            {isError && <>{isError}</>}
            
            {!isLoading && <MenuList products={products} />}
            {isLoading && <>Загрузка...</>}
            
        </div>

    </>
};

export default Menu;