import React from 'react';
import { Table } from 'reactstrap';
import APIURL from '../../helpers/environment'
import Sitebar from '../Sitebar'
import '../Admin/AdminDashboard.css'

type AdminProps = {
    token: string
    clearToken: any
}

type AdminState = {
    allMemories: Array<any>
    allImages: Array<any>
    allPets: Array<any>
}

class AdminDashboard extends React.Component<AdminProps, AdminState>{
    constructor(props: AdminProps){
        super(props);
        this.state = {
            allMemories: [],
            allImages: [],
            allPets: []
        }
      }

    // CALLING ALL GET FUNCTIONS FOR GRABBING ALL SITE INFO
    componentDidMount() {
        this.getAllMemories();
        this.getAllImages();
        this.getAllPets();
    }
    
    // GET ALL MEMORIES
    getAllMemories(){
        const that = this;
        fetch(`${APIURL}/memories/memory`, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }) .then((response) => response.json()
        ) .then((data) => {
            console.log(data);

            that.setState({
                allMemories: data
            })
            console.log(this.state.allMemories)
        })
    }

    // GET ALL IMAGES
    getAllImages(){
        const that = this;
        fetch(`${APIURL}/gallery/image`, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }) .then((response) => response.json()
        ) .then((data) => {
            console.log(data);

            that.setState({
                allImages: data
            })
            console.log(this.state.allImages)
        })
    }

    // GET ALL PETS
    getAllPets(){
        const that = this;
        fetch(`${APIURL}/petinfo/pet`, {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }) .then((response) => response.json()
        ) .then((data) => {
            console.log(data);

            that.setState({
                allPets: data
            })
            console.log(this.state.allPets)
        })
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
        .then((newMemory) => {
            console.log(newMemory)
        });
    } 

    // DELETE IMAGE
    deleteImage = (e: any, imgId: any) => {
        e.preventDefault();
        console.log(imgId);
        fetch(`${APIURL}/gallery/image/${imgId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
        .then((res) => res.json())
        .then((newImage) => {
            console.log(newImage)
        });
    } 

    // DELETE PET
    deletePet = (e: any, petId: any) => {
        e.preventDefault();
        console.log(petId);
        fetch(`${APIURL}/petinfo/pet/${petId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
        .then((res) => res.json())
        .then((newPet) => {
            console.log(newPet)
        });
    } 


    render(){
        // MEMORY MAPPER
        const memoryMapper = this.state.allMemories.map((memoryToMap: any) =>
            <tr>
                <td>{memoryToMap.pet}</td>
                <td>{memoryToMap.memory}</td>
                <td>{memoryToMap.file}</td>
                <td>
                    <button onClick={(e) => {
                        this.deleteMemory(e, memoryToMap.id)
                    }}>Delete</button>
                </td>
            </tr>
        )
        
        // IMAGE MAPPER
        const imageMapper = this.state.allImages.map((imgToMap: any) =>
            <tr>
                <td>{imgToMap.pet}</td>
                <td>{imgToMap.file}</td>
                <td>
                    <button onClick={(e) => {
                        this.deleteImage(e, imgToMap.id)
                    }}>Delete</button>
                </td>
            </tr>
        )

        // PET MAPPER
        const petMapper = this.state.allPets.map((petToMap: any) =>
            <tr>
                <td>{petToMap.file}</td>
                <td>{petToMap.name}</td>
                <td>{petToMap.species}</td>
                <td>{petToMap.breed}</td>
                <td>{petToMap.dob}</td>
                <td>{petToMap.dateOfAdoption}</td>
                <td>{petToMap.rainbowBridge}</td>
                <td>{petToMap.adoptOrFoster}</td>
                <td>
                <button onClick={(e) => {
                    this.deletePet(e, petToMap.id)
                }}>Delete</button>
                </td>
            </tr>
        )

        return(
            <>
            <Sitebar clearToken={this.props.clearToken}/>
                <div className='adminBody'>
                    <h1 id='portalHeader' style={{textAlign: 'center'}}>Admin Portal</h1>

                    <h2 style={{paddingTop: '2em'}}>All Memories</h2>
                    <Table bordered>
                        {memoryMapper}
                    </Table>

                    <h2 style={{paddingTop: '2em'}}>All Images</h2>
                    <Table bordered>
                        {imageMapper}
                    </Table>

                    <h2 style={{paddingTop: '2em'}}>All Pets</h2>
                    <Table bordered>
                        {petMapper}
                    </Table>
                </div>
            </>
        )
    }
}

export default AdminDashboard;