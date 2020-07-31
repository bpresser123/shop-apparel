import React from 'react';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../CartIcon/CartIcon';
import CartDropdown from '../CartDropdown/CartDropdown';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartHidden } from '../../redux/Cart/cart.selectors';
import { selectCurrentUser } from '../../redux/User/user.selectors';

import './header.styles.scss';


const Header = ({ currentUser, hidden }) => (

  <div className="header">
    <Link to="/" className="logo-container">
      <Logo className="logo"></Logo>
    </Link>

    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/contact">
        CONTACT
      </Link>
      {currentUser ? <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div> : <Link className="option" to="/signin">
          SIGN IN
        </Link>}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser, 
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);