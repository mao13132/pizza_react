import ProductCard from "../../../components/ProductCard/ProductCard";
import { MenuListProps } from "./MenuList.props";
import styles from './MenuList.module.css'

export function MenuList({ products }: MenuListProps) {
    return <div className={styles.wrapper}>
        {products.map(product_ => (
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
    </div>
};