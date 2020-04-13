import React from 'react';
import {Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardDeck, CardGroup, CardSubtitle, CardColumns, Button, BreadcrumbItem,
    Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input} from 'reactstrap';
import Sitebar from './Sitebar'
import Petpage from '../components/Petpage/Petpage';
import Petinfo from '../components/Petpage/Petinfo';
import APIURL from '../helpers/environment';
import { BrowserRouter, withRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
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
    pet: Array<any>
    showPetPage: boolean
    petId: string

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
    radioIsSelected: string

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
          showPetPage: false,
          petId: '',

          modalOpen: false,
          file: '',
          name: '',
          species: '',
          breed: '',
          dob: '',
          dateOfAdoption: '',
          rainbowBridge: '',
          adoptOrFoster: '',
            radioIsSelected: 'a',
          showAllPets: true,
          showFosters: false,
          showAdoptions: false
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
        console.log(this.state.pet);

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

        console.log(toggleFosters);

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

        console.log(toggleAdoptions);

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
                <div>
                    <h1 id='myPets'>My Pets</h1>

                    <Row>
                        <Col lg='5'></Col>
                        <Col lg='2'><Button class='addPet' onClick={(e) => this.setState({modalOpen: true})}>Add a pet!</Button></Col>
                        <Col lg='5'></Col>
                    </Row>

                    <Row className='toggleButtonsRow'>
                        <Col style={{paddingLeft: '0', paddingRight: '0'}}>
                            {/* ALL PETS BUTTON */}
                            <Button style={{width: '100%', backgroundColor: '#7165B1', borderTopLeftRadius: '0', borderTopRightRadius: '0', borderBottomLeftRadius: '0', borderBottomRightRadius: '0'}} onClick={(e) => {
                                this.setState({showAllPets: true, showAdoptions: false, showFosters: false})
                            }
                            }>All Pets</Button>
                        </Col>
                        <Col style={{paddingLeft: '0', paddingRight: '0'}}>
                            {/* ALL ADOPTIONS BUTTON */}
                            <Button style={{width: '100%', backgroundColor: '#88C7E6', borderTopLeftRadius: '0', borderTopRightRadius: '0', borderBottomLeftRadius: '0', borderBottomRightRadius: '0'}} onClick={(e) => {
                                this.setState({showAllPets: false, showAdoptions: true, showFosters: false})
                            }
                            }>Adoptions</Button>
                        </Col>
                        <Col style={{paddingLeft: '0', paddingRight: '0'}}>
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
                    <CardGroup>
                        {petMapper}
                    </CardGroup>
                : null
                }

                {this.state.showAdoptions ? 
                    <CardGroup>
                        {adoptionMapper}
                    </CardGroup>
                : null
                }   

                {this.state.showFosters ? 
                    <CardGroup>
                        {fosterMapper}
                    </CardGroup>
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
                                <Input type='select' placeholder='Adopt or Foster' name='adoptOrFoster' onChange={(e) => this.setState({adoptOrFoster: e.target.value})}>
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