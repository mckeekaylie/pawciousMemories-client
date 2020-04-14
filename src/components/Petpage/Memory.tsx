import React from 'react';
import APIURL from '../../helpers/environment';
import {Button, Form, FormGroup, Col, Row, Input, Modal, ModalHeader, ModalBody, Card, CardImg, CardBody, CardGroup} from 'reactstrap';
import './Memory.css';

//PROPS TYPE ALIAS
type AcceptedProps = {
    token: any
    id: any
}

//STATE TYPE ALIAS
type MemoryState = {
    // TOKEN 
    token: string

    // FROM PET INFO
    pet: any
    
    // STATES FOR MEMORIES
        // HOLDS ALL OF THE USER'S MEMORIES WHEN PULLED THROUGH GET
        memoryContainer: any
    
         // HOLDS A SINGLE MEMORY
        memory: string
    
        // MEMORY MAPPER
        memoryToMap: Array<any>
        
        // HOLDS THE MEMORY'S ID, USED FOR PUT/DELETE
        memoryId: number

        // EDIT MEMORY
        editMemory: any

    // MODAL
    editModalOpen: boolean
    modalOpen: boolean

    // FOR TRACKING IMAGE UPLOADS
    file: any

    // FIRES WHEN DELETE IS CLICKED, SAVES THE PET TO BE DELETED
    petMemOwner: string   
}

class Memory extends React.Component<AcceptedProps, MemoryState> {
    constructor(props: AcceptedProps) {
        super(props)
        this.state = {
            token: '',
            pet: [],

            // MEMORIES
            memoryContainer: [],
            memory: '',
            memoryToMap: [],
            memoryId: 0,
            editMemory: [],
            
            // MODALS
            editModalOpen: false,
            modalOpen: false,
            
            file: '',
            petMemOwner: ''
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
        formData.append('pet', this.state.pet.name)
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
        .then((newMemory) => {
            console.log(newMemory)
            this.setState({
                modalOpen: false
            })
        }
        );
    }
    
    // DELETE MEMORY
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

    // EDIT MEMORY
    editMemory = (e: any) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('pet', this.state.pet.name)
        formData.append('memory', this.state.editMemory)
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

    // SET MEMORY TO EDIT
    editPetMem = (editPet: any) => {
        this.setState({
            editMemory: editPet
        })
        console.log(editPet)
    }
    
    // MEMORY IMAGE STATE
    MemoryImage = (e: any) => {
        this.setState({
            file: e.target.files[0]
        });
    }

    render() {
        // FILTER MEMORIES ARRAY TO ONLY DISPLAY ACTIVE PET
        let filteredMem = this.state.memoryContainer.filter((memToFilter: any) => {
            if(memToFilter.pet == this.state.pet.name){
                return memToFilter
            }
        })

        // MEMORY MAPPER
        const memoryMapper = filteredMem.map((memoryToMap: any) =>
            <Col md='4'>
                <Card>
                    <CardImg width="100%" height="100%" src={memoryToMap.file} alt="Card image cap"/>

                    <CardBody>
                    <p>{memoryToMap.memory}</p>
                    </CardBody>

                    <Row>
                    <Button id='edit' onClick={(e) => {
                        this.setState({
                            memoryId: memoryToMap.id,
                            editModalOpen: true
                        })
                        this.editPetMem(memoryToMap.memory)
                    }
                    }>Edit</Button>

                    <Button id='delete' onClick={(e) => {
                        this.setState({
                            memoryId: memoryToMap.id,
                            petMemOwner: memoryToMap.pet
                        })
                        console.log(this.state.memoryId)
                        console.log(this.state.petMemOwner)
                        this.deleteMemory(e, memoryToMap.id)
                    }
                    }>Delete</Button>
                    </Row>
                </Card>  
            </Col>          
        )
        
        // UPLOAD IMAGE
        const MemoryImage = (e: any) => {
            this.setState({ file: e.target.files[0] });
        }
        
        // TOGGLE MODAL OFF
        const toggle = () => this.setState({modalOpen: false});

        return(
        <div className='memoriesBody'>

            <h1 id='myMemsWith'>My Memories with {this.state.pet.name}</h1>
    
            <Button style={{marginTop: '2em', marginBottom: '2em'}} onClick={(e) => this.setState({modalOpen: true})}>Add A Memory!</Button>
    
            <CardGroup>
                {memoryMapper}
            </CardGroup>
    
    
            {/* ADD MEMORY MODAL */}
            {this.state.modalOpen ? 
                <Modal isOpen={true} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Add A Memory!</ModalHeader>
                        <ModalBody>
                            <Form encType="multipart/form-data" onSubmit={(e) => this.handleSubmit(e)}>
                                <FormGroup>
                                    <Input type='text' value={this.state.pet.name} name='pet'/>
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

            {/* EDIT MEMORY MODAL */}
            {this.state.editModalOpen ? 
                <Modal isOpen={true} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Edit Your Memory!</ModalHeader>
                        <ModalBody>
                            <Form encType="multipart/form-data" onSubmit={(e) => this.editMemory(e)}>
                                <FormGroup>
                                    <Input type='text' value={this.state.pet.name} />
                                </FormGroup>
                                <FormGroup>
                                    <Input type='textarea' value={this.state.editMemory} name='memory' onChange={(e) => this.setState({editMemory: e.target.value})} />
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