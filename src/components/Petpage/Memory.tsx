import React from 'react';
import APIURL from '../../helpers/environment'
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'

// PROPS TYPE ALIAS
type AcceptedProps = {
    token: any
};
  
// STATE TYPE ALIAS
type MemoryState = {
    modal: boolean,
    memory: string,
    file: string,
};

class Memory extends React.Component<AcceptedProps, MemoryState> {
    constructor(props: AcceptedProps){
        super(props);
        this.state = {
          modal: false,
          memory: '',
          file: ''
        }
      }
    
      componentDidMount = () => {
          const fetchMemory = () => {
            fetch(`${APIURL}/memories/memory`, { 
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
                })
            }) .then((res) => res.json())
                .then((petMemory) => {
                    this.setState({
                        memory: petMemory
                    })
                    console.log(petMemory)
                    console.log(this.state.memory)
                })
            }
            fetchMemory();  
        }
        
        createMemory = (event: any) => {
            event.preventDefault();
            fetch(`${APIURL}/memories/memory`, { 
                method: 'POST',
                body: JSON.stringify({
                    memory: this.state.memory,
                    file: this.state.file
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
                }),
            }) .then(
                (response) => response.json()
            )   .then((addMemory) => {
                console.log(addMemory)
                this.setState({
                    memory: '',
                    file: '',
                })
            })
        }

    render(){
        return(
            <div className='memory'>
                <h1>My memories with 'PETNAME'</h1>
                <Form onSubmit={(e) => this.createMemory(e)}>
                  <FormGroup>
                    <Label htmlFor='memory'>Memory:</Label>
                    <Input placeholder='memory' type='textarea' onChange={
                        (e: React.FormEvent<HTMLInputElement>) => {
                        const memoryEventElement = e.target as HTMLInputElement;
                        const memoryValue = memoryEventElement.value
                        this.setState({
                            memory: memoryValue
                        })  
                        }
                    }
                    name='memory' value={this.state.memory}/>
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor='file'>Upload Image:</Label>
                    <Input type='file' onChange={
                        (e: React.FormEvent<HTMLInputElement>) => {
                        const fileEventElement = e.target as HTMLInputElement;
                        const fileValue = fileEventElement.value
                        this.setState({
                            file: fileValue
                        })  
                        }
                    }
                    name='fileinput' value={this.state.file}/>
                  </FormGroup>

                  <Button type="submit">Create Memory!</Button>
                </Form>
              </div>

        )
    }
}
export default Memory;