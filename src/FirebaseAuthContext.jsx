import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyBdMvLOkVLx-yuACqJJkeF0U-JBLRufZsg',
  authDomain: 'react-context-auth.firebaseapp.com',
  databaseURL: 'https://react-context-auth.firebaseio.com',
  projectId: 'react-context-auth',
  storageBucket: 'react-context-auth.appspot.com',
  messagingSenderId: '528062956514'
}

firebase.initializeApp(config)
const provider = new firebase.auth.GoogleAuthProvider()

// Set default context state
const defaultContext = {
  loaded: false,
  user: null,
  signIn: () => firebase.auth().signInWithPopup(provider),
  signOut: () => firebase.auth().signOut()
}

// Create the React Context and export the { Provider, Consumer } from it
export const { Provider, Consumer } = React.createContext(defaultContext)

// Set up and export Context Provider Component as default
class AuthProvider extends Component {
  state = defaultContext

  // have our component watch our firebase auth state
  componentDidMount() {
    firebase.auth().onAuthStateChanged(this.setUser)
  }

  // function for updating our user to our state
  setUser = user => this.setState({ loaded: true, user })

  render() {
    // wrap the app inside our provider so that the `Consumer` can have our auth data
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}

export default AuthProvider
