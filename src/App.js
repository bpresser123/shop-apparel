import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { xyz } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      console.log("User Auth: " + JSON.stringify(userAuth));

      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          xyz({
            id: snapshot.id,
            ...snapshot.data()
          });
        });

        console.log("App fb");
      }

      xyz(userAuth)

      console.log("App set: " + JSON.stringify(userAuth));

      // this.setState({ currentUser: user})
      // console.log(user);
      // console.log(this.state.currentUser.displayName);
      // this.showUser = createUserProfileDocument(this.state.currentUser)
    });

  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {

    console.log(JSON.stringify(this.props.currentUser));
    
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to ='/'/>) : (<SignInAndSignUp/>)}/>
        </Switch>
      </div>
    );
  }
  // console.log("current user: " + this.props.currentUser);
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})



const mapDispatchToProps = dispatch => ({
  xyz: user => {
    console.log("dispatch user: " + JSON.stringify(user))
    return dispatch(setCurrentUser(user))}
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
