import React from 'react';
import { Col,  Card, Modal, ModalBody, Form, Input, ModalHeader, FormGroup, Button, CardImg, CardGroup} from 'reactstrap';
import APIURL from '../../helpers/environment'

// PROPS TYPE ALIAS
type AcceptedProps = {
    token: any,
    id: number
};

// STATE TYPE ALIAS
type PhotoGalleryState = {  
    pet: any, // HOLDS ALL OF THE USER'S PETS WHEN FETCHED FROM THE SERVER
    petName: string,
    imgArray: any, // HOLDS ALL OF THE USER'S IMAGES WHEN FETCHED FROM THE SERVER
    file: string, // HOLDS THE IMAGE TO UPLOAD IN THE POST FUNCTION

    // EVENT STATE VARIABLES
    modalOpen: boolean
};

class Photogallery extends React.Component<AcceptedProps, PhotoGalleryState> {
     constructor(props: AcceptedProps){
       super(props);
       this.state = {
         pet: [],
         petName: '',
         imgArray: [],
         file: '',
         modalOpen: false
        }
    }

  // CALLING FETCH PET INFO & FETCH PHOTO GALLERY
  componentDidMount = () => {
    this.fetchPetinfo();
    this.fetchPhotoGallery();
  }

  // FETCH PET
  fetchPetinfo = () => {
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
        console.log(petData)
        console.log(this.state.pet)
    })
  }

  // FETCHING USER'S ENTIRE PHOTO GALLERY FOR THIS PET
  fetchPhotoGallery = () =>  {
    const that = this;
      fetch(`${APIURL}/gallery/image`, {
        method: 'GET',
         headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.props.token
        })
    }).then((res) => res.json())
      .then((PhotoGallery) => {
        that.setState({
            imgArray: PhotoGallery,
            modalOpen: false
        })
        console.log(PhotoGallery)
        console.log(that.state.imgArray)
    })
  }

  // ADD NEW IMAGE
  postImage = (e: any) => {
    e.preventDefault();
    let formData = new FormData();
    console.log(this.state.petName)
    formData.append('title', this.state.pet.name)
    formData.append('file', this.state.file)
    const that = this;
      fetch(`${APIURL}/gallery/image`, {
        method: 'POST',
        body: formData,
        headers: new Headers({
          'Authorization': this.props.token
        })
    }).then((res) => res.json())
      .then((image) => {
        that.setState({
            file: image,
            modalOpen: false
        })
        console.log(image)
        console.log(that.state.file)
    })
  }

  // DELETE IMAGE
  deleteImage = (e:any, imgId: any) => {
      e.preventDefault();
          fetch(`${APIURL}/gallery/image/${imgId}` , {
          method: 'DELETE',
          headers: new Headers({
              'Content-Type': 'application/json',
              'Authorization': this.props.token
          })
      }).then((res) => res.json())
        .then((deletedImage) => console.log(deletedImage))
  }

  // ADD NEW IMAGE HANDLER
  handleImageUpload(e: any) {
    e.preventDefault();
    this.setState({
        file: e.target.files[0]
    })
  } 

  render() {
    // FILTER IMAGE ARRAY TO ONLY DISPLAY ACTIVE PET
    let filteredImgs = this.state.imgArray.filter((imgToFilter: any) => {
      if(imgToFilter.title == this.state.pet.name){
          return imgToFilter
      }
    })

    // IMAGE MAPPER  
    const imageMapper = filteredImgs.map((petImage: any) =>
      <Col md='4' className='petCol'>
          <Card className='petCard'>  
              <CardImg width="100%" height="100%" src={petImage.file} alt="Card image cap"  />
              <Button style={{backgroundColor: 'red', float: 'right'}} onClick={(e) => this.deleteImage(e, petImage.id)}>DELETE IMAGE</Button>
          </Card>
      </Col>          
    )

    // TOGGLE MODAL OFF
    const toggle = () => this.setState({modalOpen: false});

    return (
        <div>
          <h1 style={{textAlign: 'center', marginTop: '1em', fontFamily: 'Raleway, sans-serif'}}>Photos of {this.state.pet.name}</h1>
            <Button style={{marginBottom: '2em', fontFamily: 'Raleway, sans-serif'}} onClick={(e) => this.setState({modalOpen: true})}>Add Image</Button>

            <CardGroup>
                {imageMapper}
            </CardGroup>

            {/* ADD MEMORY MODAL */}
            {this.state.modalOpen ? 
              <Modal isOpen={true} toggle={toggle}>
                  <ModalHeader toggle={toggle}>Add an image of {this.state.pet.name}</ModalHeader>
                      <ModalBody>
                          <Form encType="multipart/form-data" onSubmit={(e) => this.postImage(e)}>
                          <FormGroup>
                                    <Input type='text' value={this.state.pet.name} name='title'/>
                                </FormGroup>
                              <FormGroup>
                                  <Input type='file' name='petImage' onChange={(e) => this.handleImageUpload(e)} />
                              </FormGroup>
                              <Button style={{marginBottom: '0'}} type='submit'>Post image!</Button>
                          </Form>
                      </ModalBody>
              </Modal>
            : null
            } 
        </div>
      )
    }    
}
export default Photogallery;