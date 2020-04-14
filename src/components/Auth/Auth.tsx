import React from 'react';
import Taco from './Tacos'
import Signup from '../Auth/Signup';
import Signin from './Signin';
<<<<<<< HEAD
import '../Auth/Auth.css'

=======
import Bored from './Bored';
import Taco from './Taco';
import './Auth.css';
import {Col, Row} from 'reactstrap';
>>>>>>> 443427439275bcb4fd8c3718da44ded23c2b9981

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
<<<<<<< HEAD
                <Taco/>
=======
>>>>>>> 443427439275bcb4fd8c3718da44ded23c2b9981
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