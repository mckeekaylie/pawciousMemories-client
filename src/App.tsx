import React, {Component} from 'react';
import './App.css';
import Auth from './components/Auth/Auth';
import Home from './components/Home';
import Petpage from './components/Petpage/Petpage';
import { useLocation, BrowserRouter, Router, Route, Switch } from 'react-router-dom';


// STATE TYPE ALIAS
type TokenState = {
  sessionToken: string,
  location: boolean
};

class App extends React.Component<{}, TokenState> {
  constructor(props: {}){
    super(props);
    this.state = {
      sessionToken: '',
      location: false
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



  render(){
    console.log(this.state.sessionToken)
    if(this.state.sessionToken === localStorage.getItem('token')){
      return (
        <div>
          <Switch>
            <Route exact path="/" render={(TokenProps) => <Home {...TokenProps} token={this.state.sessionToken} clearToken={this.clearToken.bind(this)} modalOff={null} />} />
            <Route exact path="/petpage/:petId" render={(AcceptedProps) => <Petpage {...AcceptedProps} token={this.state.sessionToken} clearToken={this.clearToken.bind(this)} id={null} state={null} />} />
          </Switch>
        </div>
      );
    } else {
      return(<Auth updateToken={this.updateToken.bind(this)} />)
    }
  }
}
export default App;