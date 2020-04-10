import React, {Component} from 'react';
import './App.css';
import Auth from './components/Auth/Auth';
import Home from './components/Home';
import Petpage from './components/Petpage/Petpage';
import { useLocation, BrowserRouter, Router, Route, Switch } from 'react-router-dom';


// STATE TYPE ALIAS
type TokenState = {
  sessionToken: string,
  location: boolean,
  clearToken: string,
  modalOff: boolean,
};

class App extends React.Component<{}, TokenState> {
  constructor(props: {}){
    super(props);
    this.state = {
      sessionToken: '',
      location: false,
      clearToken: '',
      modalOff: true
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
            <Route exact path="/" render={(TokenProps) => <Home {...TokenProps} token={this.state.sessionToken} clearToken={this.clearToken.bind(this)} />} />
            <Route exact path="/petpage/:petId" render={(AcceptedProps) => <Petpage {...AcceptedProps} token={this.state.sessionToken} id={null} state={null} clearToken={this.state.clearToken} modalOff={true}/>} />
          </Switch>
        </div>
      );
    } else {
      return(<Auth updateToken={this.updateToken.bind(this)} />)
    }
  }
}
export default App;