import React from 'react';
import APIURL from '../../helpers/environment'
import './Petinfo.css'
import { Container, Row, Col } from 'reactstrap';

// PROPS TYPE ALIAS
type AcceptedProps = {
    token: any
    id: any
};
  
// STATE TYPE ALIAS
type PetinfoState = {
    pet: any,
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
            fetch(`${APIURL}/petinfo/pet/${this.props.id}`, { 
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
            <Container className='petInfo'>
                <Row>
                    <Col xs="3">
                        <img id='avatar' src={this.state.pet.file}/>
                    </Col>

                    <Col xs="6" id='infoCol'>
                        <h1>{this.state.pet.name}</h1>
                        <ul>
                            <li>Species: {this.state.pet.species}</li>
                            <li>Breed: {this.state.pet.breed}</li>
                            <li>Date of Birth: {this.state.pet.dob}</li>
                            <li>Date of Adoption: {this.state.pet.dateOfAdoption}</li>
                            <li>Adopt or Foster: {this.state.pet.adoptOrFoster}</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default Petinfo;