import React from 'react';
import Taco from './Taco'
import Signup from '../Auth/Signup';
import Signin from './Signin';
import Bored from './Bored';
import './Auth.css';
import {Col, Row} from 'reactstrap';

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
        <div className='authBody'>
            <h1 id='appTitle'>Pawcious Memories</h1>
            <div className='signInUp'>
                    {this.state.showLogin ?
                        <Signin updateToken={this.props.updateToken} /> :
                        <Signup updateToken={this.props.updateToken}/>
                    }
                <button id="toggle" onClick={(e) => this.loginToggle(e)}>{this.state.showLogin ? 'Click to switch to Signup' : 'Click to switch to Signin'}</button>
            </div>
            <Row id='sillyComponents'>
                <Col></Col>
                <Col><Bored /></Col>
                <Col><Taco /></Col>
                <Col></Col>
                <Col></Col>
            </Row>
        </div>
        
        )

    }
}

export default Auth;