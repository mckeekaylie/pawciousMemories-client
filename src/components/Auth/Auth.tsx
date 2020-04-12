import React from 'react';
import Signup from '../Auth/Signup';
import Signin from './Signin';
import Bored from './Bored';

// PROPS TYPE ALIAS
type TokenProps = {
    updateToken: (newToken: string) => void
};

// STATE TYPE ALIAS
type ToggleState = {
    showLogin: any
}

class Auth extends React.Component<TokenProps, ToggleState> {
    constructor(props: TokenProps){
        super(props);
        this.state = {
          showLogin: false
        }
      }

    loginToggle = (event: any) => {
        event.preventDefault();
        if(this.state.showLogin == true){
            this.setState({
                showLogin: false
            })
        }

        if(this.state.showLogin == false){
            this.setState({
                showLogin: true
            })
        }
    };
    
    render(){
        return (
        <div>
            <h1 id='appTitle'>Pawcious Memories</h1>
            <Bored />
            <div>
                {this.state.showLogin ?
                    <Signin updateToken={this.props.updateToken} /> :
                    <Signup updateToken={this.props.updateToken}/>
                }
                <button id="toggle" onClick={(e) => this.loginToggle(e)}>{this.state.showLogin ? 'Click to switch to Signup' : 'Click to switch to Login'}</button>
            </div>
        </div> 
        
        )

    }
}

export default Auth;