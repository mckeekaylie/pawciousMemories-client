import React from 'react';
import './App.css';
import Auth from './components/Auth/Auth';
import Home from './components/Home';
import Petpage from './components/Petpage/Petpage';
import { Redirect, Route, Switch } from 'react-router-dom'
import AdminDashboard from './components/Admin/AdminDashboard';

// PROPS TYPE ALIAS
type AppProps = {
}

// STATE TYPE ALIAS
type TokenState = {
  sessionToken: string,
  userRole: string
};

class App extends React.Component<AppProps, TokenState> {
  constructor(props: AppProps){
    super(props);
    this.state = {
      sessionToken: '',
      userRole: ''
    }
  }

  setUserRole(role: string){
    this.setState({userRole: role})
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
    if(this.state.sessionToken === localStorage.getItem('token') && this.state.userRole !== 'admin'){
      return (
        <div>
          <Switch>
            <Route exact path="/" render={(TokenProps) => <Home {...TokenProps} token={this.state.sessionToken} clearToken={this.clearToken.bind(this)} modalOff={null} />} />
            <Route exact path="/petpage/:petId" render={(AcceptedProps) => <Petpage {...AcceptedProps} token={this.state.sessionToken} clearToken={this.clearToken.bind(this)} id={null} state={null} />} />
          </Switch>
          <Redirect to='/'/>
        </div>
      );
    } else if (this.state.sessionToken === localStorage.getItem('token') && this.state.userRole === 'admin'){
      console.log('this is the admin portal')
      return (
        <div>
          <Switch>
            <Route exact path='/dashboard' render={(AdminProps) => <AdminDashboard {...AdminProps} token={this.state.sessionToken} clearToken={this.clearToken.bind(this)}/>}/>
          </Switch>
          <Redirect to='/dashboard' />
        </div>
      )
    } else {
      return(<Auth setUserRole={this.setUserRole.bind(this)} updateToken={this.updateToken.bind(this)} />)
    }
  }
}
export default App;