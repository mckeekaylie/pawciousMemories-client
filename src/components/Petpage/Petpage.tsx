import React from 'react';
import Petinfo from './Petinfo';
import Sitebar from '../Sitebar';
import Photogallery from '../Petpage/Photogallery';
import Memory from '../Petpage/Memory';


// PROPS TYPE ALIAS
type AcceptedProps = {
    token: any
    clearToken: any
    id: any // PASSES ACTIVE PET ID
    match: any // REQUIRED FOR PASSING ACTIVE PET ID AS PROPS
    state: any
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
                <Sitebar clearToken={this.props.clearToken}/> 
                <Petinfo id={this.props.match.params.petId} token={this.props.token} />
                <Memory id={this.props.match.params.petId} token={this.props.token}/>
                <Photogallery id={this.props.match.params.petId} token={this.props.token} />
            </div>
        )
    }
}
export default Petpage;