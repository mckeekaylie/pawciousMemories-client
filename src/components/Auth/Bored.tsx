import React from 'react';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';

type BoredProps = {
}

//STATE TYPE ALIAS
type BoredState = {
    activity: Array<any>
    visible: boolean
}

class Bored extends React.Component<BoredProps, BoredState> {
    constructor(props: BoredProps){
        super(props)
        this.state = {
          activity: [],
          visible: false
        }
      }

    // FETCH RANDOM ACTIVITY
    fetchBoredActivity(){
        const that = this;
        fetch(`http://www.boredapi.com/api/activity/`, {
            method: 'GET',
        }) .then((res) => res.json())

        .then((boredData) => {
            that.setState({
                activity: boredData.activity
            })
            
            console.log(boredData)
            console.log(this.state.activity)
        })
    }

    // MODAL HANDLING
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e: any) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = (e: any) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return(
            <div>
                <Button className='sillyBtn' style={{backgroundColor: '#37539B'}} onClick={(e) => {
                    this.showModal()
                    this.fetchBoredActivity()
                }} >Bored? Spawn a random activity.</Button>
                <Modal
                    title="You should:"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                <h1>{this.state.activity}</h1>
                </Modal>
            </div>
        )
    }
}

export default Bored;