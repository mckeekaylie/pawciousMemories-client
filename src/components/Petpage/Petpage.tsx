import React from 'react';
import Petinfo from './Petinfo';
import Sitebar from '../Sitebar';
import Photogallery from '../Petpage/Photogallery';
import Memory from '../Petpage/Memory';


// PROPS TYPE ALIAS
type AcceptedProps = {
    id: any
    token: any
    state: any
    match: any
    clearToken: any
    modalOff: boolean
};


class Petpage extends React.Component<AcceptedProps, {}> {
    constructor(props: AcceptedProps){
        super(props);
        this.state = {
        }
      }
      
    render(){
        return(
            <div>
                {/* <Sitebar clearToken={this.props.clearToken}/> */}
                <Petinfo id={this.props.match.params.petId} token={this.props.token} />
                <Memory id={this.props.match.params.petId} token={this.props.token}/>
                <Photogallery id={this.props.match.params.petId} token={this.props.token} />
            </div>
        )
    }
}
export default Petpage;

