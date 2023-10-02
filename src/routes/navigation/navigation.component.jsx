import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from '../../context/user.context';
import { CartContext } from '../../context/cart.context';
import { signOutUser } from '../../utils/firebase/firebase.utils'

import { ReactComponent as CrownLogo } from '../../assets/crown.svg' 
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles';
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);
    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrownLogo className="logo"/>
                </LogoContainer>
                <NavLinks>
                    <NavLink  to='/shop'>
                        SHOP
                    </NavLink>
                    {currentUser ? 
                    (<NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>) 
                    :
                    (<NavLink  to='/sign-in'>SIGN IN</NavLink>) 
                    }
                    <CartIcon />
                </NavLinks>
                {
                    isCartOpen && <CartDropdown />
                }
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation;