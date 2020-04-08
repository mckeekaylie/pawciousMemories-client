import React from 'react';
import {Row, Card, CardImg, CardText, CardBody,
    CardTitle, CardDeck, CardSubtitle, Button} from 'reactstrap';
import Sitebar from './Sitebar'
import Petpage from '../components/Petpage/Petpage';
import Petinfo from '../components/Petpage/Petinfo';
import APIURL from '../helpers/environment';
import { BrowserRouter, withRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import { timingSafeEqual } from 'crypto';

// PROPS TYPE ALIAS
type TokenProps = {
    token: any,
    clearToken: any
};

type HomeState = {
    token: ''
    pet: Array<any>
    showPetPage: boolean
    petId: string
}

class Home extends React.Component<TokenProps, HomeState> {
    constructor(props: TokenProps){
        super(props)
        this.state = {
          token: '',
          pet: [],
          showPetPage: false,
          petId: ''
        }
      }
      componentDidMount() {
          this.setState({
            token: this.props.token
          })
          this.fetchPetinfo()
        }

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


    render(){
        console.log(this.state.pet);
        const petMapper = this.state.pet.map(pet => 
            <>
            <Card>
                <CardImg top width="100%" src={pet.file} alt="Card image cap" />
                <CardBody>
                    <CardTitle>{pet.name}</CardTitle>
                    <Button onClick={(e) => this.petPageToggler(pet.id)}>Button</Button>
                </CardBody>
            </Card>
            </>
        )

        return(
            <div>
                <Sitebar clearToken={this.props.clearToken} />
                <h1>Home page</h1>
                {/* <Petinfo token={this.props.token}/> */}
                <CardDeck>
                    {petMapper}
                </CardDeck>

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