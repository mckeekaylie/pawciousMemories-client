// ANGIE'S COMPONENT

import React from 'react';
import {Button, Modal} from 'antd';
import 'antd/dist/antd.css';

type AcceptedProps = {
};

type JokeState = {
  Joke: any,
  //setup: string,
  //delivery: string,
  visible: boolean
};

class Joke extends React.Component<AcceptedProps, JokeState> {
  constructor(props: AcceptedProps){
    super(props);
    this.state = {
    Joke: {
      setup: "",
      delivery: "",
    },
      visible: false,
    }
  }

    componentDidMount = () => {
    const getJoke =() => {
    //fetchJoke (){
    fetch("https://sv443.net/jokeapi/v2/joke/Any", {
        method: 'GET',
    }).then((res) => res.json())
        .then((jokeData) => {
        this.setState({
            Joke: jokeData
        })
        console.log(jokeData)
        })
    }
        getJoke();
    }

    showModal = () => {
        this.setState({
        visible: true
        });
    };

    handleNext = (e: any) => {
        console.log(e);
        this.setState({
        visible: false,
        });
    };

    handleClose = (e: any) => {
        console.log(e);
        this.setState({
        visible: false,
        });
    };

    render(){
        return (
            <div>
                <Button className='sillyBtn' onClick={(e)=> {
                    this.showModal()
                    this.componentDidMount()
                    }} >Get a Joke!</Button>
                        <Modal
                        visible={this.state.visible} 
                        onOk={this.componentDidMount}
                        onCancel={this.handleClose}>
                        <p>{this.state.Joke.setup}</p>
                        <p>{this.state.Joke.delivery}</p>
                        </Modal>   
            </div>
        )
    }
} 

export default Joke;