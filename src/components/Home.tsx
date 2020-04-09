import React from 'react';
import {Row, Card, CardImg, CardText, CardBody,
    CardTitle, CardDeck, CardGroup, CardSubtitle, CardColumns, Button, BreadcrumbItem,
    Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import Sitebar from './Sitebar'
import Petpage from '../components/Petpage/Petpage';
import Petinfo from '../components/Petpage/Petinfo';
import APIURL from '../helpers/environment';
import { BrowserRouter, withRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import { timingSafeEqual } from 'crypto';
import './Home.css'

// PROPS TYPE ALIAS
type TokenProps = {
    token: any,
    clearToken: any,
    modalOff: any
};

//STATE TYPE ALIAS
type HomeState = {
    token: ''
    pet: Array<any>
    showPetPage: boolean
    petId: string

    modalOpen: boolean
    file: any
    name: string
    species: string
    breed: string
    dob: string
    dateOfAdoption: string
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
          dateOfAdoption: ''
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
    // handleSubmit(e: any) {
    //     e.preventDefault();
                
    //     fetch(`${APIURL}/petinfo/pet`, {
    //         method: 'POST',
    //         body: JSON.stringify({file: file, name: name, species: species, breed: breed, dob: dob, dateOfAdoption: dateOfAdoption }),
    //         headers: new Headers ({
    //             'Content-Type': 'application/json',
    //             'Authorization': this.props.token
    //         })

    //         }) .then((response) => response.json())

    //         .then((newPetData) => {
    //             console.log(newPetData);
    //             this.setState({
    //                 file: 
    //             })
    //         })
    //     }
    // }

    // RENDER    
    render(){
        console.log(this.state.pet);
        const petMapper = this.state.pet.map(pet =>
            <Card>
                <CardImg width="100%" height="100%" src={pet.file} alt="Card image cap" onClick={(e) => this.petPageToggler(pet.id)} />
                <CardBody>
                    <CardTitle style={{fontFamily: 'Montserrat', fontWeight: 600, fontSize: '100%'}}onClick={(e) => this.petPageToggler(pet.id)}>{pet.name}</CardTitle>
                </CardBody>
            </Card>            
        )

//         const [modal, setModal] = useState(false);

//   const toggle = () => setModal(!modal);
        const modalToggler = () => {
            this.setState({
                modalOpen: true
            })
        }

        const toggle = () => this.props.modalOff();

        return(
            <div className='home'>
                <Sitebar clearToken={this.props.clearToken} />

                <h1 style={{padding: '.5em'}}>My Pets</h1>

                <Button class='addPet' color="primary" onClick={(e) => modalToggler}>Add a pet!</Button>

                <CardGroup>
                    {petMapper}
                </CardGroup>


                {/* MODAL */}
                {this.state.modalOpen ? 
                <Modal isOpen={true} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Add a pet!</ModalHeader>
                    <ModalBody>
          
                    </ModalBody>
                    <ModalFooter>
                        {/* <Button color="primary" onClick={(e) => handleSubmit}>Do Something</Button>{' '} */}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
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