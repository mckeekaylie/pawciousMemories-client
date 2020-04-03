import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem
} from 'reactstrap';

type TokenProps = {
    clearToken: any
};

class Sitebar extends React.Component<TokenProps, {}>{
    render(){
        return(
            <div>
                <Navbar className='nav' light expand='md'>
                    <NavbarBrand href='/' className='brand'>Pawcious Memories</NavbarBrand>
                        <Nav className='ml-auto' navbar>
                            <NavItem className='logout' onClick={this.props.clearToken}>> Logout</NavItem>
                        </Nav>
                </Navbar>
            </div>
        )
    }
}
export default Sitebar;

