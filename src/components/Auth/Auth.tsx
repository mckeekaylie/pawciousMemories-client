import React from 'react';
import Signup from '../Auth/Signup';
import Signin from '../Auth/Signin';

class Auth extends React.Component {
    render(){
        return (
        <div>
            <h1 id='appTitle'>My Concert Log</h1>
            <div>
                <div className='authRow'>
                    <div className='signup'> 
                        <Signup updateToken={this.props.updateToken} />
                    </div>
                    <div className='signin'>
                        <Signin updateToken={this.props.updateToken}/>
                    </div>
                </div>
            </div>
        </div> 
        )
    }
}
export default Auth;