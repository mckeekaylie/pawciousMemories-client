import React from 'react';
import {
    Navbar,
    NavbarBrand,
    NavItem
} from 'reactstrap';

import './Sitebar.css'
import logoutImg from '../assets/logout.svg'

type TokenProps = {
    clearToken: any
};

class Sitebar extends React.Component<TokenProps, {}>{
    render(){
        return(
            <div>
                <Navbar className='nav' light expand='md'>
                    <NavbarBrand href='/' title='Home' className='brand'>Pawcious Memories</NavbarBrand>
                    
                        <NavItem className='logout' onClick={this.props.clearToken}><img id='logoutImg' title='Logout' src={logoutImg}/></NavItem>
                    
                </Navbar>
            </div>
        )
    }
}
export default Sitebar;