import React from 'react';

// PROPS TYPE ALIAS
type AcceptedProps = {
    updateToken: string
};
  
// STATE TYPE ALIAS
type SigninState = {
    email: '',
    password: ''
};

class Signin extends React.Component<AcceptedProps, SigninState>{
    constructor(props: AcceptedProps){
        super(props);
        this.state = {
          email: '',
          password: ''
        }
      }

    // HANDLE SUBMIT  
    handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
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
            this.props.updateToken = (data.sessionToken);
        })

    render(){
        return(
            <div className='signin'>
            <h1>Signin</h1>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input placeholder='user@email.com' onChange = {(e) => setState(email: e.target.value)} name='email' value={this.state.email} />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input placeholder='Password' type='password' onChange={(e) => setState(password: e.target.value)} name='password' value={this.state.password} />
                </div>
                <button className='signinUp'type='submit'>Signin</button>
            </form>
        </div>
        )
    }
}
export default Signin;