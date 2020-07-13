// KRIS' COMPONENT
import React from 'react';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';

//PROPS TYPE ALIAS
type TacoProps = {
}

//STATE TYPE ALIAS
type TacoState = {
  taco: any 
  visible: boolean
}

class Taco extends React.Component<TacoProps, TacoState> {
  constructor (props: TacoProps) {
    super(props)
    this.state = {
      taco: {
        seasoning: {},
        shell: {},
        mixin: {},
        condiment: {},
        base_layer: {},
      },
      visible: false,
    }
  }

  componentDidMount = () => {
    const getTaco = () => {
      fetch(`http://taco-randomizer.herokuapp.com/random/`,{
        method: 'GET',
      }) .then((result) => result.json())
      .then((tacoData) => {
        this.setState({
          taco: tacoData
        })
      })
    }
    getTaco();
  }

    // MODAL HANDLING
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = (e: any) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

  render() {
    return (
      <div>
        <Button className='sillyBtn' onClick={(e) => {
            this.showModal()
            // this.componentDidMount()
        }}>Click For Tacos!
        </Button>
        
        <Modal
            title='Ingredients for a Yummy Taco!'
            visible={this.state.visible}
            onOk={this.componentDidMount}
            onCancel={this.handleCancel}
            okText='Next'
            cancelText='Close'
            >
            <p>Seasoning: {this.state.taco.seasoning.name}</p>
            <p>Shell: {this.state.taco.shell.name}</p>
            <p>Base: {this.state.taco.base_layer.name}</p>
            <p>Mixin: {this.state.taco.mixin.name}</p>
            <p>Condiment: {this.state.taco.condiment.name}</p>
        </Modal>
      </div>
    );
  }
}
export default Taco;