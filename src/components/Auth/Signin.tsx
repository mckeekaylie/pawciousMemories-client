import React from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import APIURL from '../../helpers/environment';
// import Snackbar from './Snackbar';

// PROPS TYPE ALIAS
type AcceptedProps = {
    updateToken: (newToken: string) => void,
    setUserRole: (role: string) => void 
};
  
// STATE TYPE ALIAS
type SigninState = {
    email: string,
    password: string,
    userRole: string,
    incPassword: boolean,
    emailNotExist: boolean
};

class Signin extends React.Component<AcceptedProps, SigninState>{
    constructor(props: AcceptedProps){
        super(props);
        this.state = {
          email: '',
          password: '',
          userRole: '',
          incPassword: false,
          emailNotExist: false
        }
      }

    // HANDLE SUBMIT  
    handleSubmit = (event: any) => {
        event.preventDefault();
        fetch(`${APIURL}/user/signin`, {
            method: 'POST',
            body: JSON.stringify({email: this.state.email, password: this.state.password}),
            headers: new Headers ({
                'Content-Type': 'application/json'
            })
        }) .then(
            (response) => response.json()
        ) .then((data) => {
            console.log(data);
            console.log(data.user.role)
            
            this.props.setUserRole(data.user.role)

            this.props.updateToken(data.sessionToken)
        })
    }

    render(){
        return(
            <div className='signin'>
            <h1>Signin</h1>
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
                <Button className='signinUp'type='submit'>Signin</Button>
            </Form>
            {/* {this.state.incPassword === true ? <Snackbar incPassword={this.state.incPassword} /> : null}
            {this.state.emailNotExist === true ? <Snackbar emailNotExist={this.state.emailNotExist} /> : null} */}
        </div>
        )
    }
}

export default Signin;