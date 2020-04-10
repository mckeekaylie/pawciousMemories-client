import React from 'react';
// import { BrowserRouter, withRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import APIURL from '../../helpers/environment'
import Sitebar from '../Sitebar'
import {Button, Form, FormGroup, Label, Col, Input, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardImg, CardBody, CardTitle, CardGroup} from 'reactstrap'

//PROPS TYPE ALIAS
type AcceptedProps = {
    token: any
    id: any
}

//STATE TYPE ALIAS
type MemoryState = {
    token: string
    pet: any
    showPetPage: boolean
    petId: string
    memoryId: number
    memoryIndex: number

    editModalOpen: boolean
    modalOpen: boolean
    file: any
    newFile: any
    memoryContainer: any
    memory: string
    memoryToMap: Array<any>
}

class Memory extends React.Component<AcceptedProps, MemoryState> {
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            token: '',
            pet: [],
            showPetPage: false,
            petId: '',
            memoryId: 0,
            memoryIndex: 0,
            
            editModalOpen: false,
            modalOpen: false,
            file: '',
            newFile: '',
            memoryContainer: [],
            memory: '',
            memoryToMap: []
        }
    }

    // SETTING TOKEN AND CALLING FETCH MEMORY
    componentDidMount() {
        this.setState({
            token: this.props.token
        })
        
        this.fetchMemory()
        this.fetchPetinfo()
    }

    // FETCH PET
    fetchPetinfo () {
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
        })
    }

    // FETCH MEMORIES
    fetchMemory(){
        const that=this;
        fetch(`${APIURL}/memories/memory`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
            
        }) .then((res) => res.json())
        
        .then((petMemory) => {
            that.setState({
                memoryContainer: petMemory
            })
            console.log(this.state.memoryContainer);
        })
    }

    // CREATE A NEW MEMORY
    handleSubmit = (event: any) => {
        event.preventDefault();
        let formData = new FormData();
        formData.append('pet', this.state.pet)
        formData.append('memory', this.state.memory)
        formData.append('file', this.state.file)
        
        fetch(`${APIURL}/memories/memory`, {
            method: 'POST',
            body: formData,
            headers: new Headers({
                'Authorization': this.props.token
            })
        })
        .then((res) => res.json())
        .then((newMemory) => console.log(newMemory));
        this.setState({
            modalOpen: false
        })
    }

    // DELETE A MEMORY
    deleteMemory = (e: any, memId: any) => {
        e.preventDefault();
        console.log(memId);
        fetch(`${APIURL}/memories/memory/${memId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
        .then((res) => res.json())
        .then((newMemory) => console.log(newMemory));
    } 

    //EDIT A MEMORY
    editMemory = (e: any) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('pet', this.state.pet)
        formData.append('memory', this.state.memory)
        formData.append('file', this.state.file)

        fetch(`${APIURL}/memories/memory/${this.state.memoryId}`, {
            method: 'PUT',
            body: formData,
            headers: new Headers({
                'Authorization': this.props.token
            })
        })
        .then((res) => res.json())
        .then((newMemory) => console.log(newMemory));
        this.setState({
            editModalOpen: false
        })
    }

    // MEMORY IMAGE STATE
    MemoryImage = (e: any) => {
        this.setState({
            file: e.target.files[0]
        });
    }

    // isActivePet(){
    //     if(this.state.memoryContainer.memory.pet == this.state.pet.name){
    //       return true;
    //     }
    //   }

    render() {
        // this.state.memoryContainer.filter(this.isActivePet());
        const memoryMapper = this.state.memoryContainer.map((memoryToMap: any) =>
        <Col md='4'>
            <Card>
            <CardImg width="100%" height="100%" src={memoryToMap.file} alt="Card image cap"/>
            <CardBody>
            <p>{memoryToMap.memory}</p>
            </CardBody>
            <Button color='info' onClick={(e) => {
                this.setState({
                    memoryId: memoryToMap.id,
                    editModalOpen: true
                })
                console.log(this.state.memoryId)
            }
            }>Edit</Button>
            <Button color="danger" onClick={(e) => {
                this.setState({
                    memoryId: memoryToMap.id,
                })
                console.log(this.state.memoryId)
                this.deleteMemory(e, memoryToMap.id)
            }
            }
            >Delete</Button>
            
            </Card>  
            </Col>          
        ) 
        
        // UPLOAD IMAGE
        const MemoryImage = (e: any) => {
            this.setState({ file: e.target.files[0] });
        }

        // TOGGLE MODAL OFF
        const toggle = () => this.setState({modalOpen: false});

        console.log(this.state.pet.id)
        console.log(this.state.memoryId)
        
        return(
            <div className='home'>
    
            <h1 style={{padding: '.5em'}}>My Memories with {this.state.pet.name}</h1>
    
                    <Button class='addMemory' color="primary" onClick={(e) => this.setState({modalOpen: true})}>Add A Memory!</Button>
                    {/* <Button class='editMemory' color="info" onClick={(e) => this.setState({editModalOpen: true})}>Edit Memory!</Button> */}
    
                    <CardGroup>
                        {memoryMapper}
                    </CardGroup>
    
    
                    {/* ADD-MEMORY-MODAL */}
                    {this.state.modalOpen ? 
                    <Modal isOpen={true} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Add A Memory!</ModalHeader>
                        <ModalBody>
                            <Form encType="multipart/form-data" onSubmit={(e) => this.handleSubmit(e)}>
                                <FormGroup>
                                    <Input type='text' placeholder='Pet Name' name='pet' value={this.state.pet.name} onChange={(e) => this.setState({pet: e.target.value})} />
                                </FormGroup>
                                <FormGroup>
                                    <Input type='textarea' placeholder='Memory' name='memory' onChange={(e) => this.setState({memory: e.target.value})} />
                                </FormGroup>
                                <FormGroup>
                                    <Input type='file' name='petImage' onChange={e => MemoryImage(e)} />
                                </FormGroup>
                                <Button type='submit'>Create Memory!</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                    : null
                    } 
                    
                    {/* EDIT-MEMORY-MODAL */}
                    {this.state.editModalOpen ? 
                    <Modal isOpen={true} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Edit Your Memory!</ModalHeader>
                        <ModalBody>
                            <Form encType="multipart/form-data" onSubmit={(e) => this.editMemory(e)}>
                                <FormGroup>
                                    <Input type='text' placeholder='Pet Name' name='pet' value={this.state.pet.name} onChange={(e) => this.setState({pet: e.target.value})} />
                                </FormGroup>
                                <FormGroup>
                                    <Input type='textarea' placeholder='Memory' name='memory' onChange={(e) => this.setState({memory: e.target.value})} />
                                </FormGroup>
                                <FormGroup>
                                    <Input type='file' name='petImage' onChange={e => MemoryImage(e)} />
                                </FormGroup>
                                <Button type='submit'>Edit Memory!</Button>
                            </Form>
                        </ModalBody>
                    </Modal>
                    : null
                    } 

                </div>
            )
        }
    }
export default Memory;