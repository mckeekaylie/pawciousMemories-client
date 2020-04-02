import React, {Component} from 'react';
import './App.css';
import Auth from './components/Auth/Auth';
import Home from './components/Home';

// PROPS TYPE ALIAS
type TokenProps = {
  token: string
};

// STATE TYPE ALIAS
type TokenState = {
  sessionToken: string
};

class App extends React.Component<TokenProps, TokenState> {
  constructor(props: TokenProps){
    super(props);
    this.state = {
      sessionToken: ''
    }
  }

  setToken(token: string){
    localStorage.setItem('token', token);
    this.setState({ sessionToken: token })
  }
  
  componentWillMount() {
    const token = localStorage.getItem('token')
    if (token && !this.state.sessionToken) {
      this.setState({ sessionToken: token });
    }
  }

  // UPDATE TOKEN
   updateToken(newToken: string){
    localStorage.setItem('token', newToken);
    console.log(newToken);
    this.setState({
      sessionToken: newToken
    })
   }

   // CLEAR TOKEN
    clearToken(){
      localStorage.clear();
      this.setState({
        sessionToken: ''
      })
    }

  // PROTECTED VIEWS
    protectedViews(){
      if (this.state.sessionToken === localStorage.getItem('token')) {
        return(<Home token={this.state.sessionToken} clearToken={this.clearToken} />)
      } else {
        return(<Auth updateToken={this.updateToken} />)
      }
    }

  render(){
    return (
      <div>
        {this.protectedViews()}
      </div>
  
    );
  }
}
export default App;