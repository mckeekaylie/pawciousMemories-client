import React from 'react';
import Sitebar from './Sitebar'

// PROPS TYPE ALIAS
type TokenProps = {
    token: any,
    clearToken: any
};

class Home extends React.Component<TokenProps, {}> {
    render(){
        return(
            <div>
                <Sitebar clearToken={this.props.clearToken} />
                <h1>Home page</h1>
            </div>
        )
    }
}
export default Home;