import { Link } from 'react-router-dom';
import { ProductCardProps } from './ProductCard.Props';
import styles from './ProductCard.module.css';
import cn from 'classnames';
import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispath } from '../../store/store';
import { cartActions } from '../../store/cart.slice';

function ProductCard(props: ProductCardProps) {

    const dispatch = useDispatch<AppDispath>();

    const add = (e: MouseEvent) => {
        e.preventDefault();

        dispatch(cartActions.add(props.id));

    };

    return (
        <Link to={`/product/${props.id}`} className={styles['link']}>
            <div className={styles['card']} >

                <div className={styles['head']} style={{ backgroundImage: `url('${props.image}')` }}>

                    <div className={styles['price']}>
                        {props.price}&nbsp;
                        <span className={styles['currency']}>₽</span>
                    </div>

                    <button className={styles['add-to-cart']} onClick={add}>
                        <img className={styles['icon-add']} src="/add-icon.svg" alt="Добавить в корзину" />
                    </button>

                    <div className={styles['rating']}>

                        {props.rating}&nbsp;

                        <img className={styles['rating-icon']} src="/rating.svg" alt="Иконка рейтинга" />

                    </div>


                </div>

                <div className={styles['footer']}>
                    <div className={styles['title']}>{props.title}</div>
                    <div className={styles['description']}>{props.description}</div>
                </div>

            </div>
        </Link>
    );
}

export default ProductCard;