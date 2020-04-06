import React from 'react';

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

class Petpage extends React.Component<AcceptedProps, SignupState> {
    constructor(props: AcceptedProps){
        super(props);
        this.state = {
          email: '',
          password: '',
          role: 'user'
        }
      }
      
    render(){
        return(
            <div>
                
            </div>
        )
    }
}
export default Petpage;