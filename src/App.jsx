import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import AuthProvider, { Consumer } from './FirebaseAuthContext'

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Consumer>
          {auth => (
            <Router>
              <main>
                <Header {...auth} />
                <Route exact path="/" component={() => <div>Home</div>} />
                <Route path="/public" component={() => <div>Public</div>} />
                <Route
                  path="/login"
                  component={() =>
                    !!auth.user ? (
                      <Redirect to="/private" />
                    ) : (
                      <button onClick={auth.signIn}>Log In</button>
                    )
                  }
                />
                <PrivateRoute
                  auth={auth}
                  path="/private"
                  component={({ user }) => (
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                  )}
                />
              </main>
            </Router>
          )}
        </Consumer>
      </AuthProvider>
    )
  }
}

const Header = ({ user, signOut }) => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/public">Public</Link>
      </li>
      <li>
        <Link to="/private">Private</Link>
      </li>
      {!!user && (
        <li>
          <button onClick={signOut}>Log Out</button>
        </li>
      )}
    </ul>
  )
}

const PrivateRoute = ({ component: Component, auth: { user }, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !!user ? (
        <Component user={user} {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

export default App
