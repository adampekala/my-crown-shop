import { createContext, useEffect, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {

    //find if cartItems contain product to Add

    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id )
    

    if(existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === existingCartItem.id ? 
            {...cartItem, quantity: cartItem.quantity + 1}
            :
            cartItem
        )
    }

    return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, cartItemToRemove) => {

    //find if cartItems contain product to remove

    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id )
    
    if (existingCartItem.quantity === 1) {
        return cartItems.filter((element) => element.id !== cartItemToRemove.id)
    }

    
    return cartItems.map((cartItem) => 
            cartItem.id === cartItemToRemove.id ? 
            {...cartItem, quantity: cartItem.quantity - 1}
            :
            cartItem
        )

}

export const clearCardItem = (cartItems, cartItemToClear) => {

    return cartItems.filter((cartItem) => 
    cartItem.id !== cartItemToClear.id
    )
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemsToCart: () => {},
    removeItemsFromCart: () => {},
    clearItemFromCard: () => {},
    cartCount: 0,
    total: 0
}
);

export const CartContextProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(()=> {
        const newCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartCount(newCartCount);
    
    }, [cartItems])

    useEffect(()=> {
        
        const newTotal = cartItems.reduce((total, item) => {
            const value = item.quantity * item.price;
            return total + value;
          }, 0)

          setCartTotal(newTotal);

    }, [cartItems])

    const addItemToCart = (productToAdd) => {
            setCartItems(addCartItem(cartItems, productToAdd))
    }
    
    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove))
    }

    const clearItemFromCard = (cartItemToClear) => {
        setCartItems(clearCardItem(cartItems, cartItemToClear))
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCard, cartItems, cartCount, cartTotal};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
} 

