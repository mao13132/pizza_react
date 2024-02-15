import { useEffect, useState } from "react";
import Headling from "../../components/Headling/Headling";
import ProductCard from "../../components/ProductCard/ProductCard";
import Search from "../../components/Search/Search";
import { Product } from "../../interfaces/product.interface";
import styles from '../../pages/Menu/Menu.module.css';
import { PREFIX } from "../../helpers/API";
import axios from "axios";


export function Menu() {

    const [products, setProducts] = useState<Product[]>([]);
    
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [isError, setIsError] = useState<string | undefined>();

    const getMenu = async () => {
        try {
            
            setIsLoading(true);

            /* Имитация долгой загрузки */
            await new Promise<void>(resolve => {
                setTimeout(() => {
                    resolve();
                }, 2000);
            });
            /* Имитация долгой загрузки */
            
            const { data } = await axios.get<Product[]>(`${PREFIX}/productss`);

            setProducts(data);
            
            setIsLoading(false);

        } catch(error_) {
            console.log(error_);

            if (error_ instanceof axios.AxiosError) {
                setIsError(error_.message)
            }

            setIsLoading(false);
            return;
        }

    };


    useEffect(() => {
        getMenu();
    }, []);

    return <>
        <div className={styles['head']}>
            <Headling>Menu</Headling>
            <Search placeholder='Введите блюдо или стостав' />
        </div>

        <div>
            {isError && <>{isError}</>}
            
            {!isLoading && products.map(product_ => (
                <ProductCard
                key={product_.id}
                id={product_.id}
                title={product_.name}
                description={product_.ingredients}
                rating={product_.rating}
                price={product_.price}
                image={product_.image}
            />
            ))}
            {isLoading && <>Загрузка...</>}
            
        </div>

    </>
};