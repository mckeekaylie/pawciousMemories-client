import React from 'react';
import {Row, Col, Card, CardImg, CardGroup, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import Sitebar from './Sitebar'
import APIURL from '../helpers/environment';
import './Home.css'

// PROPS TYPE ALIAS
type TokenProps = {
    token: any,
    clearToken: any,
    modalOff: any
};

// STATE TYPE ALIAS
type HomeState = {
    token: ''

    // HOLDS ALL OF THE USER'S PETS WHEN FETCHED
    pet: Array<any>

    // USED TO DETERMINE ACTIVE PET
    petId: string

    // STATE VARIABLES FOR HOLDING PET INFO DATA
    file: any
    name: string
    species: string
    breed: string
    dob: string
    dateOfAdoption: string
    rainbowBridge: string
    adoptOrFoster: string

    // EVENT STATE VARIABLES
    modalOpen: boolean
    showPetPage: boolean

    // TOGGLING DIFFERENT PETS
    showAllPets: boolean
    showFosters: boolean
    showAdoptions: boolean
}

class Home extends React.Component<TokenProps, HomeState> {
    constructor(props: TokenProps){
        super(props)
        this.state = {
          token: '',
          pet: [],
          petId: '',
          file: '',
          name: '',
          species: '',
          breed: '',
          dob: '',
          dateOfAdoption: '',
          rainbowBridge: '',
          adoptOrFoster: '',

          modalOpen: false,
          showPetPage: false,

          showAllPets: true,
          showFosters: false,
          showAdoptions: false,
        }
      }


    // SETTING TOKEN AND CALLING FETCH PET INFO  
    componentDidMount() {
        this.setState({
            token: this.props.token
        })

        this.fetchPetinfo()
    }

    // FETCH PET INFO
    fetchPetinfo(){
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

    // PET PAGE TOGGLER
     petPageToggler(id: any) {
        if(this.state.showPetPage === false){
            this.setState({
                showPetPage: true,
                petId: id
            })
        }

        if(this.state.showPetPage === true){
            this.setState({
                showPetPage: false,
                petId: id
            })
        }
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
        formData.append('rainbowBridge', this.state.rainbowBridge);
        formData.append('adoptOrFoster', this.state.adoptOrFoster);
        formData.append('file', this.state.file);
                
        fetch(`${APIURL}/petinfo/pet`, {
            method: 'POST',
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

    // RENDER    
    render(){
        // ALPHABETIZING PETS
        this.state.pet.sort((a: any, b: any) => {
            if(a.name < b.name){
                return -1
            }

            if(a.name > b.name) {
                return 1
            }

            else {
                return 0
            }
        })

        // MAPPING PETS
        const petMapper = this.state.pet.map(pet =>
            <Col md='4' className='petCol'>
                <Card className='petCard'>  
                    <CardImg width="100%" height="100%" src={pet.file} alt="Card image cap" onClick={(e) => this.petPageToggler(pet.id)} />
                    <div id='petNameContainer'>
                        <h1 className='petName' onClick={(e) => this.petPageToggler(pet.id)}>{pet.name}</h1>
                    </div> 
                </Card>
            </Col>          
        )

        // TOGGLE FOSTERS
        let toggleFosters = this.state.pet.filter((petToFilter: any) => {
            if(petToFilter.adoptOrFoster === 'Foster'){
                return petToFilter
            }
        })

        const fosterMapper = toggleFosters.map(pet =>
            <Col md='4' className='petCol'>
                <Card className='petCard'>  
                    <CardImg width="100%" height="100%" src={pet.file} alt="Card image cap" onClick={(e) => this.petPageToggler(pet.id)} />
                    <div id='petNameContainer'>
                        <h1 className='petName' onClick={(e) => this.petPageToggler(pet.id)}>{pet.name}</h1>
                    </div> 
                </Card>
            </Col>          
        )

        // TOGGLE ADOPTIONS
        let toggleAdoptions = this.state.pet.filter((petToFilter: any) => {
            if(petToFilter.adoptOrFoster === 'Adopt'){
                return petToFilter
            }
        })

        const adoptionMapper = toggleAdoptions.map(pet =>
            <Col md='4' className='petCol'>
                <Card className='petCard'>  
                    <CardImg width="100%" height="100%" src={pet.file} alt="Card image cap" onClick={(e) => this.petPageToggler(pet.id)} />
                    <div id='petNameContainer'>
                        <h1 className='petName' onClick={(e) => this.petPageToggler(pet.id)}>{pet.name}</h1>
                    </div> 
                </Card>
            </Col>          
        )
        
        // UPLOAD IMAGE
        const uploadImg = (e: any) => {
            this.setState({ file: e.target.files[0] });
        }
    
        // TOGGLE MODAL OFF
        const toggle = () => this.setState({modalOpen: false});

        return(
            <div className='home'>
                {/* NAVBAR */}
                <Sitebar clearToken={this.props.clearToken} />

                {/* PAGE TITLE AND ADD A PET BUTTON */}
                <div style={{paddingBottom: '0'}}>
                    <h1 id='myPets'>My Pets</h1>

                    <Row>
                        <Col lg='5'></Col>
                        <Col lg='2'><Button style={{marginBottom: '3em'}} onClick={(e) => this.setState({modalOpen: true})}>Add a pet!</Button></Col>
                        <Col lg='5'></Col>
                    </Row>

                    <Row className='toggleButtonsRow'>
                        <Col style={{padding: '0'}}>
                            {/* ALL PETS BUTTON */}
                            <Button style={{width: '100%', backgroundColor: '#7165B1', borderTopLeftRadius: '0', borderTopRightRadius: '0', borderBottomLeftRadius: '0', borderBottomRightRadius: '0'}} onClick={(e) => {
                                this.setState({showAllPets: true, showAdoptions: false, showFosters: false})
                            }
                            }>All Pets</Button>
                        </Col>
                        <Col style={{padding: '0'}}>
                            {/* ALL ADOPTIONS BUTTON */}
                            <Button style={{width: '100%', backgroundColor: '#88C7E6', borderTopLeftRadius: '0', borderTopRightRadius: '0', borderBottomLeftRadius: '0', borderBottomRightRadius: '0'}} onClick={(e) => {
                                this.setState({showAllPets: false, showAdoptions: true, showFosters: false})
                            }
                            }>Adoptions</Button>
                        </Col>
                        <Col style={{padding: '0'}}>
                            {/* ALL FOSTERS BUTTON */}
                            <Button style={{width: '100%', backgroundColor: '#37539B', borderTopLeftRadius: '0', borderTopRightRadius: '0', borderBottomLeftRadius: '0', borderBottomRightRadius: '0'}} onClick={(e) => {
                                this.setState({showAllPets: false, showAdoptions: false, showFosters: true})
                            }
                            }>Fosters</Button>
                        </Col>
                    </Row>
                </div>

                {/* DISPLAY ALL OF THE USER'S PETS */}
                {this.state.showAllPets ?
                    <div>
                        <div className='tabTitleContainer'><h1 className='tabTitle'>All Pets</h1></div>

                        <CardGroup>
                            {petMapper}
                        </CardGroup>
                    </div>
                : null
                }

                {this.state.showAdoptions ?
                    <div> 
                        <div className='tabTitleContainer'><h1 className='tabTitle'>My Adoptions</h1></div>

                        <CardGroup>
                            {adoptionMapper}
                        </CardGroup>
                    </div>
                : null
                }   

                {this.state.showFosters ? 
                    <div>
                        <div className='tabTitleContainer'><h1 className='tabTitle'>My Fosters</h1></div>

                        <CardGroup>
                            {fosterMapper}
                        </CardGroup>
                    </div>
                : null
                }

                {/* ADD A PET MODAL */}
                {this.state.modalOpen ? 
                <Modal isOpen={true} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Add a pet!</ModalHeader>
                    <ModalBody>
                        <Form encType="multipart/form-data" onSubmit={(e) => this.handlePetSubmit(e)}>
                            <FormGroup>
                                <Input type='text' placeholder='Name' name='name' onChange={(e) => this.setState({name: e.target.value})} />
                            </FormGroup>
                            <FormGroup>
                                <Input type='text' placeholder='Species' name='species' onChange={(e) => this.setState({species: e.target.value})} />
                            </FormGroup>
                            <FormGroup>
                                <Input type='text' placeholder='Breed' name='breed' onChange={(e) => this.setState({breed: e.target.value})} />
                            </FormGroup>
                            <FormGroup>
                                <Input type='text' placeholder='Date of Birth' name='dob' onChange={(e) => this.setState({dob: e.target.value})} />
                            </FormGroup>
                            <FormGroup>
                                <Input type='text' placeholder='Date of Adoption' name='dateOfAdoption' onChange={(e) => this.setState({dateOfAdoption: e.target.value})} />
                            </FormGroup>
                            <FormGroup>
                                <Input type='text' placeholder='Date Pet Crossed the Rainbow Bridge' name='rainbowBridge' onChange={(e) => this.setState({rainbowBridge: e.target.value})} />
                            </FormGroup>
                            <FormGroup>
                                <Input type='select' name='adoptOrFoster' onChange={(e) => this.setState({adoptOrFoster: e.target.value})}>
                                    <option>Select One</option>
                                    <option>Adopt</option>
                                    <option>Foster</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Input type='file' name='avatar' onChange={e => uploadImg(e)} />
                            </FormGroup>
                            <Button type='submit' style={{marginBottom: 0}}>Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                : null
                } 


                {/* CONDITIONAL ROUTING FOR PET PAGE */}
                {this.state.showPetPage ?
                    <>
                        <Redirect to={`/petpage/${this.state.petId}`} />
                    </>
                    : <Redirect to='/' />
                } 

                
            </div>
        )
    }
}

export default Home