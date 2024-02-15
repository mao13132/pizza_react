import { useEffect, useState } from "react";
import Headling from "../../components/Headling/Headling";
import ProductCard from "../../components/ProductCard/ProductCard";
import Search from "../../components/Search/Search";
import { Product } from "../../interfaces/product.interface";
import styles from '../../pages/Menu/Menu.module.css';
import { PREFIX } from "../../helpers/API";


export function Menu() {

    const [products, setProducts] = useState<Product[]>([]);

    const getMenu = async () => {
        try {
            const res = await fetch(`${PREFIX}/products`);

            if (!res.ok) {
                return;
            };

            const data = await res.json() as Product[];

            setProducts(data);
        } catch(error_) {
            console.error(error_);
            
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
            {products.map(product_ => (
                <ProductCard
                id={product_.id}
                title={product_.name}
                description={product_.ingredients}
                rating={product_.rating}
                price={product_.price}
                image={product_.image}
            />
            ))}
            
        </div>

    </>
};