import React from 'react';
import APIURL from '../../helpers/environment'

// PROPS TYPE ALIAS
type AcceptedProps = {
    token: any
};
  
// STATE TYPE ALIAS
type PetinfoState = {
    pet: [],
    modal: boolean
};

class Petinfo extends React.Component<AcceptedProps, PetinfoState> {
    constructor(props: AcceptedProps){
        super(props);
        this.state = {
          pet: [],
          modal: false
        }
    }

    componentDidMount = () => {
        const fetchPetinfo = () => {
            const that = this;
            fetch(`${APIURL}/petinfo/pet`, { 
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
                })
            }) .then((res) => res.json())
                .then((petData) => {
                    that.setState({
                        pet: petData
                    })
                    console.log(petData)
                    console.log(that.state.pet)
                })
        }

        fetchPetinfo();

        const assignValues = () => {
            // const petName = this.state.pet.map(pet => pet.name)
        }

        // const editPetinfo = (pet: any) => {
        //     this.setState({
        //         pet: pet
        //     })
        //     console.log(pet)
        // }

        // const modalOn = () => {
        //     this.setState({
        //         modal: true
        //     })
        // }
    
        // const modalOff = () => {
        //     this.setState({
        //         modal: false
        //     })
        // }
    }

    render(){
        return(
            <div>
                <p></p>
                <ul>
                    {/* {this.state.pet.map(pet => pet.name)} */}
                </ul>
            </div>
        )
    }
}
export default Petinfo;