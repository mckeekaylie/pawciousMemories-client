import React from 'react';
import APIURL from '../../helpers/environment'
import './Petinfo.css'
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input } from 'reactstrap';
import { throws } from 'assert';

// PROPS TYPE ALIAS
type AcceptedProps = {
    token: any
    id: any
};
  
// STATE TYPE ALIAS
type PetinfoState = {
    pet: any
    modalOpen: boolean

    file: any
    name: string
    species: string
    breed: string
    dob: string
    dateOfAdoption: string
};

class Petinfo extends React.Component<AcceptedProps, PetinfoState> {
    constructor(props: AcceptedProps){
        super(props);
        this.state = {
          pet: [],

          modalOpen: false,
          file: '',
          name: '',
          species: '',
          breed: '',
          dob: '',
          dateOfAdoption: ''
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
    }

        // SUBMIT A NEW PET
        handlePetSubmit(e: any) {
            e.preventDefault();
    
            let formData = new FormData();
            formData.append('name', this.state.name);
            formData.append('species', this.state.species);
            formData.append('breed', this.state.breed);
            formData.append('dob', this.state.dob);
            formData.append('dateOfAdoption', this.state.dateOfAdoption);
            formData.append('file', this.state.file);
                    
            fetch(`${APIURL}/petinfo/pet/${this.props.id}`, {
                method: 'PUT',
                body: formData,
                headers: new Headers ({
                    'Authorization': this.props.token
                })
            }) 
            
                .then((response) => response.json())
                .then((newPetData) => console.log(newPetData));
        }

    render(){
        // UPLOAD IMAGE
        const uploadImg = (e: any) => {
            this.setState({ file: e.target.files[0] });
        }
            
        // TOGGLE MODAL OFF
        const toggle = () => this.setState({modalOpen: false});

        // SET PET TO EDIT
        const editPetinfo = (pet: any) => {
            this.setState({
                pet: pet
            })
            console.log(pet)
        }

        return(
            <Container className='petInfo'>
                <Row>
                    <Col xs="3">
                        <img id='avatar' src={this.state.pet.file}/>
                    </Col>

                    <Col xs="4" id='infoCol'>
                        <h1>{this.state.pet.name}</h1>
                        <ul>
                            <li>Species: {this.state.pet.species}</li>
                            <li>Breed: {this.state.pet.breed}</li>
                            <li>Date of Birth: {this.state.pet.dob}</li>
                            <li>Date of Adoption: {this.state.pet.dateOfAdoption}</li>
                            <li>Adopt or Foster: {this.state.pet.adoptOrFoster}</li>
                            <li style={{listStyleType: 'none', float: 'right'}}><Button onClick={(e) => this.setState({modalOpen: true})}>Edit</Button></li>
                        </ul>
                    </Col>
                </Row>


            {/* MODAL */}
            {this.state.modalOpen ? 
                <Modal isOpen={true} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Edit {this.state.pet.name}'s Info</ModalHeader>
                    <ModalBody>
                        <Form encType="multipart/form-data" onSubmit={(e) => this.handlePetSubmit(e)}>
                            <FormGroup>
                                <Input type='text' placeholder={this.state.pet.name} name='name' onChange={(e) => this.setState({name: e.target.value})} />
                            </FormGroup>
                            <FormGroup>
                                <Input type='text' placeholder={this.state.pet.species} name='species' onChange={(e) => this.setState({species: e.target.value})} />
                            </FormGroup>
                            <FormGroup>
                                <Input type='text' placeholder={this.state.pet.breed} name='breed' onChange={(e) => this.setState({breed: e.target.value})} />
                            </FormGroup>
                            <FormGroup>
                                <Input type='text' placeholder={this.state.pet.dob} name='dob' onChange={(e) => this.setState({dob: e.target.value})} />
                            </FormGroup>
                            <FormGroup>
                                <Input type='text' placeholder={this.state.pet.dateOfAdoption} name='dateOfAdoption' onChange={(e) => this.setState({dateOfAdoption: e.target.value})} />
                            </FormGroup>
                            <FormGroup>
                                <Input type='file' placeholder={this.state.pet.file} name='dateOfAdoption' onChange={e => uploadImg(e)} />
                            </FormGroup>
                            <Button type='submit'>Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                : null
                } 

            </Container>
        )
    }
}
export default Petinfo;