import React from 'react';
import {Row, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button} from 'reactstrap';
import Sitebar from './Sitebar'
import Petinfo from '../components/Petpage/Petinfo';
import APIURL from '../helpers/environment';
import Memory from '../components/Petpage/Memory'

// PROPS TYPE ALIAS
type TokenProps = {
    token: any,
    clearToken: any
};

type HomeState = {
    token: ''
    pet: Array<any>
}

class Home extends React.Component<TokenProps, HomeState> {
    constructor(props: TokenProps){
        super(props)
        this.state = {
          token: '',
          pet: []
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


    render(){
        console.log(this.state.pet);
        const petMapper = this.state.pet.map(pet => 
            <Card>
                <CardImg top width="100%" src={pet.file} alt="Card image cap" />
                <CardBody>
                    <CardTitle>{pet.name}</CardTitle>
                    <Button>Button</Button>
                </CardBody>
            </Card>
        )

        return(
            <div>
                <Sitebar clearToken={this.props.clearToken} />
                <h1>Home page</h1>
                {/* <Petinfo token={this.props.token}/> */}
                {petMapper}
                <Memory token={this.props.token}/>
                
            </div>
        )
    }
}

export default Home