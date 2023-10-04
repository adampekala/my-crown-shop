import { useContext } from 'react';

import { CartContext } from '../../context/cart.context'

import {ShoppingIcon, CartIconContainer, ItemCount} from './cart-icon.styles.jsx';

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);

    const toggleIsCartOpen = () => {
        setIsCartOpen(!isCartOpen);
    }

    // moja wersja on w kontekście cart, przy uzyciu useEffect
    // const itemsNumber = cartItems.reduce((accumulator, item) => { return accumulator + item.quantity }, 0)

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>

    )
}

export default CartIcon;