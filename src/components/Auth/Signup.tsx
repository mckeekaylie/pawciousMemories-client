import React from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import APIURL from '../../helpers/environment';
// import Snackbar from './Snackbar';

// PROPS TYPE ALIAS
type AcceptedProps = {
    updateToken: (newToken: string) => void
};
  
// STATE TYPE ALIAS
type SignupState = {
    email: string,
    password: string,
    role: string
};

class Signup extends React.Component<AcceptedProps, SignupState>{
    constructor(props: AcceptedProps){
        super(props);
        this.state = {
          email: '',
          password: '',
          role: 'user'
        }
      }

    // HANDLE SUBMIT  
    handleSubmit = (event: any) => {
        event.preventDefault();
        fetch(`${APIURL}/user/signup`, {
            method: 'POST',
            body: JSON.stringify({email: this.state.email, password: this.state.password, role: 'user'}),
            headers: new Headers ({
                'Content-Type': 'application/json'
            })
        }) .then(
            (response) => response.json()
        ) .then((data) => {
            console.log(data);
            this.props.updateToken(data.sessionToken)
        })
    }

    render(){
        return(
            <div className='signin'>
            <h1>Signup</h1>
            <Form onSubmit={(e) => this.handleSubmit(e)}>
                <FormGroup>
                    <Label htmlFor='email'>Email</Label>
                    <Input placeholder='Email' type='email' onChange={
                        (e: React.FormEvent<HTMLInputElement>) => {
                        const emailEventElement = e.target as HTMLInputElement;
                        const emailValue = emailEventElement.value
                        this.setState({
                            email: emailValue
                        })  
                        }
                    }
                    name='email' value={this.state.email}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='password'>Password</Label>
                    <Input placeholder='Password' type='password' onChange={
                        (e: React.FormEvent<HTMLInputElement>) => {
                        const eventElement = e.target as HTMLInputElement;
                        const passValue = eventElement.value
                        this.setState({
                            password: passValue
                        })  
                        }
                    }
                    name='password' value={this.state.password}
                    />
                </FormGroup>
                <Button className='signinUp'type='submit'>Signup</Button>
            </Form>
        </div>
        )
    }
}

export default Signup;