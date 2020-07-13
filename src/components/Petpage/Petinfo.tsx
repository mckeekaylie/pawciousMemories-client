import React from 'react';
import APIURL from '../../helpers/environment'
import './Petinfo.css'
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, ModalFooter } from 'reactstrap';
import {Redirect} from 'react-router-dom'

// PROPS TYPE ALIAS
type AcceptedProps = {
    token: any
    id: any
};
  
// STATE TYPE ALIAS
type PetinfoState = {
    // STORES ACTIVE PET'S INFO
    pet: any
    file: any
    name: string
    species: string
    breed: string
    dob: string
    rainbowBridge: string
    dateOfAdoption: string

    // EDIT MODAL STATE VARIABLES
    petToEdit: any
    editPetName: string
    editPetSpecies: string
    editPetBreed: string
    editPetDob: string
    editPetDateOfAdopt: string
    editRainbowBridge: string
    editAdoptOrFoster: string
    editFile: string

    // EVENT STATE VARIABLES
    modalOpen: boolean
    fireRedirect: boolean
};

class Petinfo extends React.Component<AcceptedProps, PetinfoState> {
    constructor(props: AcceptedProps){
        super(props);
        this.state = {
          pet: [],
          file: '',
          name: '',
          species: '',
          breed: '',
          dob: '',
          rainbowBridge: '',
          dateOfAdoption: '',

          petToEdit: [],
          editPetName: '',
          editPetSpecies: '',
          editPetBreed: '',
          editPetDob: '',
          editPetDateOfAdopt: '',
          editRainbowBridge: '',
          editAdoptOrFoster: '',
          editFile: '',

          fireRedirect: false,
          modalOpen: false
        }
    }

    componentDidMount = () => {
        // FETCH THE PET INFO FOR THE ACTIVE PET
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

    // EDIT PET
    handlePetEdit(e: any) {
        e.preventDefault();
    
        let formData = new FormData();
        formData.append('name', this.state.editPetName);
        formData.append('species', this.state.editPetSpecies);
        formData.append('breed', this.state.editPetBreed);
        formData.append('dob', this.state.editPetDob);
        formData.append('dateOfAdoption', this.state.editPetDateOfAdopt);
        formData.append('rainbowBridge', this.state.editRainbowBridge);
        formData.append('adoptOrFoster', this.state.editAdoptOrFoster);
        formData.append('file', this.state.file);
                    
        fetch(`${APIURL}/petinfo/pet/${this.props.id}`, {
            method: 'PUT',
            body: formData,
            headers: new Headers ({
                    'Authorization': this.props.token
                })
            }) 
            .then((response) => response.json())
            .then((newPetData) => {
                console.log(newPetData);

                this.setState({
                    modalOpen: false
                })
            })
    }

    // DELETE A PET
    handlePetDelete(e: any) {
        e.preventDefault();
                
        fetch(`${APIURL}/petinfo/pet/${this.props.id}`, {
            method: 'DELETE',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }) 
            .then((response) => response.json())
            .then((deletePet) => {
                console.log(deletePet);

                this.setState({
                    modalOpen: false
                })
            })
    }


    render(){
        // UPLOAD IMAGE
        const uploadImg = (e: any) => {
            this.setState({ file: e.target.files[0] });
        }
            
        // TOGGLE MODAL OFF
        const toggle = () => this.setState({modalOpen: false});

        // SET PET TO EDIT
        const editPetinfo = (editPet: any) => {
            this.setState({
                petToEdit: editPet,
                editPetName: editPet.name,
                editPetSpecies: editPet.species,
                editPetBreed: editPet.breed,
                editPetDob: editPet.dob,
                editRainbowBridge: editPet.rainbowBridge,
                editPetDateOfAdopt: editPet.dateOfAdoption,
                editAdoptOrFoster: editPet.adoptOrFoster,
                file: editPet.file
            })
            console.log(editPet)
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
                            <li>Crossed the Rainbow Bridge: {this.state.pet.rainbowBridge}</li>
                            <li>Adopt or Foster: {this.state.pet.adoptOrFoster}</li>
                            <li style={{listStyleType: 'none', float: 'right'}}>
                                <Button onClick={(e) => {
                                    this.setState({modalOpen: true}) 
                                    editPetinfo(this.state.pet);
                                } 
                                }>Edit
                                </Button>
                            </li>
                        </ul>
                    </Col>
                </Row>


            {/* MODAL */}
            {this.state.modalOpen ? 
                <Modal isOpen={true} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Edit {this.state.pet.name}'s Info</ModalHeader>
                    <ModalBody>
                        <Form encType="multipart/form-data" onSubmit={(e) => this.handlePetEdit(e)}>
                            <FormGroup>
                                <Input type='text' value={this.state.editPetName} name='name'/>
                            </FormGroup>
                            <FormGroup>
                                <Input type='text' value={this.state.editPetSpecies} name='species' onChange={(e) => this.setState({editPetSpecies: e.target.value})} />
                            </FormGroup>
                            <FormGroup>
                                <Input type='text' value={this.state.editPetBreed} name='breed' onChange={(e) => this.setState({editPetBreed: e.target.value})} />
                            </FormGroup>
                            <FormGroup>
                                <Input type='text' value={this.state.editPetDob} name='dob' onChange={(e) => this.setState({editPetDob: e.target.value})} />
                            </FormGroup>
                            <FormGroup>
                                <Input type='text' value={this.state.editPetDateOfAdopt} name='dateOfAdoption' onChange={(e) => this.setState({editPetDateOfAdopt: e.target.value})} />
                            </FormGroup>
                            <FormGroup>
                                <Input type='text' value={this.state.editRainbowBridge} name='dateOfAdoption' onChange={(e) => this.setState({editRainbowBridge: e.target.value})} />
                            </FormGroup>
                            <FormGroup>
                                <Input type='select' value={this.state.editAdoptOrFoster} name='adoptOrFoster' onChange={(e) => this.setState({editAdoptOrFoster: e.target.value})}>
                                    <option>Select One</option>
                                    <option>Adopt</option>
                                    <option>Foster</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Input type='file' name='profileImg' onChange={e => uploadImg(e)} />
                            </FormGroup>
                            <Button type='submit' style={{marginBottom: 0}}>Submit</Button>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Col>
                            <h3>REMOVE PET</h3>
                        </Col>
                        <Col>
                            <Button id='deletePet' onClick={(e) => {
                                this.handlePetDelete(e)
                                this.setState({fireRedirect: true})
                                }}>Delete
                            </Button>
                            {this.state.fireRedirect ? <Redirect to={'/'}/> : null}
                        </Col>
                    </ModalFooter>
                </Modal>
                : null
                } 

            </Container>
        )
    }
}
export default Petinfo;