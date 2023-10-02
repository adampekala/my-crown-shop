import { useContext } from 'react';
import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

import { CartContext } from '../../context/cart.context'

import './cart-icon.styles.scss';

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);

    const toggleIsCartOpen = () => {
        setIsCartOpen(!isCartOpen);
    }

    // moja wersja on w kontekście cart, przy uzyciu useEffect
    // const itemsNumber = cartItems.reduce((accumulator, item) => { return accumulator + item.quantity }, 0)

    return (
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{cartCount}</span>
        </div>

    )
}

export default CartIcon;