import React from 'react';
import {  Col,  Card,  CardImg,CardGroup} from 'reactstrap';
import APIURL from '../../helpers/environment'

// PROPS TYPE ALIAS
type AcceptedProps = {
    token: any,
    id: number
};

// STATE TYPE ALIAS
type PhotoGalleryState = {  
    imgArray: any
};

class Photogallery extends React.Component<AcceptedProps, PhotoGalleryState> {
     constructor(props: AcceptedProps){
       super(props);
       this.state = {
         imgArray: []
        }
    }

  componentDidMount = () => {
      this.fetchPhotoGallery();
  }

  // FETCHING USER'S ENTIRE PHOTO GALLERY FOR THIS PET
  fetchPhotoGallery() {
    const that = this;
      fetch(`${APIURL}/gallery/image`, {
        method: 'GET',
         headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.props.token
        })
    }) .then((res) => res.json())
      .then((PhotoGallery) => {
        that.setState({
            imgArray: PhotoGallery
        })
        console.log(PhotoGallery)
        console.log(that.state.imgArray)
    })
  }
    

    render() {

    // IMAGE MAPPER  
    const imageMapper = this.state.imgArray.map((petImage: any) =>
      <Col md='4' className='petCol'>
          <Card className='petCard'>  
              <CardImg width="100%" height="100%" src={petImage.file} alt="Card image cap"  />
          </Card>
      </Col>          
    )

    return (
        <div>
            <CardGroup>
                {imageMapper}
            </CardGroup>
        </div>
    )

    }    
}
export default Photogallery;