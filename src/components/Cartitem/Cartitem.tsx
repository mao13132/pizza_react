import styles from './Cartitem.module.css';
import { useDispatch } from 'react-redux';
import { AppDispath } from '../../store/store';
import { cartActions } from '../../store/cart.slice';
import { CartItemProps } from './Cartitem.props';

function CartItem(props: CartItemProps) {

    const dispatch = useDispatch<AppDispath>();

    const increase = () => {

        dispatch(cartActions.add(props.id));

    };

    const descrease = () => {

        dispatch(cartActions.remove(props.id));

    };

    const remove = () => {

        dispatch(cartActions.delete(props.id));

    };

    return (
        <div className={styles['item']} >

            <div className={styles['image']} style={{ backgroundImage: `url('${props.image}')` }}></div>

            <div className={styles['description']}>
                <div className={styles['name']}>{props.name}</div>
                <div className={styles['price']}>{props.price}&nbsp;₽</div>
            </div>

            <div className={styles['actions']}>

                <button className={styles['plus']} onClick={increase}>
                    <img className={styles['icon-add']} src="/plus.svg" alt="Добавить в корзину" />
                </button>

                <div className={styles['number']}>{props.count}</div>

                <button className={styles['minus']} onClick={descrease}>
                    <img className={styles['icon-add']} src="/minus.svg" alt="Удалить из корзины" />
                </button>

                <button className={styles['remove']} onClick={remove}>
                    <img className={styles['icon-add']} src="/add-icon.svg" alt="Удалить все" />
                </button>

            </div>

        </div>
    );
}

export default CartItem;