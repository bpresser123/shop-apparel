import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { SignInAndSignUp } from './pages/sign-in-and-sign-up/SignInAndSignUp';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCollectionsForPreview } from './redux/shop/shop.selector';

import { Homepage } from './pages/homepage/Homepage';
import ShopPage from './pages/shop-page/ShopPage';
import CheckoutPage from './pages/checkout-page/CheckoutPage';
import Header from './components/header/Header';

import { GlobalStyle } from './global.styles';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { xyz } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      console.log("User Auth: " + JSON.stringify(userAuth));

      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapshot) => {
          xyz({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });

        console.log("App fb");
      }

      xyz(userAuth);

      console.log("App set: " + JSON.stringify(userAuth));
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    console.log(JSON.stringify(this.props.currentUser));

    return (
      <div>
        <GlobalStyle />
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
});

const mapDispatchToProps = (dispatch) => ({
  xyz: (user) => {
    console.log("dispatch user: " + JSON.stringify(user));
    return dispatch(setCurrentUser(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
