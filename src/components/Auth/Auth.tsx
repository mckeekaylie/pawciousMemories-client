import React from 'react';
import {Col, Row} from 'reactstrap';
import Signup from '../Auth/Signup';
import Signin from './Signin';
import Bored from './Bored';
import Taco from './Taco';
import Jokes from './Jokes';
import './Auth.css';

// PROPS TYPE ALIAS
type TokenProps = {
    setUserRole: (role: string) => void
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

    // TOGGLE BETWEEN SIGNUP/SIGNIN
    loginToggle = (event: any) => {
        event.preventDefault();
        if(this.state.showLogin === true){
            this.setState({
                showLogin: false
            })
        }

        if(this.state.showLogin === false){
            this.setState({
                showLogin: true
            })
        }
    };

    
    render(){
        return (
        <div className='authBody'>
            <h1 id='appTitle'>Pawcious Memories</h1>
            <div className='signInUp'>
                    {this.state.showLogin ?
                        <Signin setUserRole={this.props.setUserRole} updateToken={this.props.updateToken}/> :
                        <Signup setUserRole={this.props.setUserRole} updateToken={this.props.updateToken}/>
                    }
                <button id="toggle" onClick={(e) => this.loginToggle(e)}>{this.state.showLogin ? 'Click to switch to Signup' : 'Click to switch to Signin'}</button>
            </div>
            <Row id='sillyComponents'>
                <Col></Col>
                <Col><Bored /></Col>
                <Col><Taco /></Col>
                <Col><Jokes /></Col>
                <Col></Col>
            </Row>
        </div>
        
        )

    }
}

export default Auth;