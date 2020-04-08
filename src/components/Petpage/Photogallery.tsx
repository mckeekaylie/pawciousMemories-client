import React from 'react';
import { Row, Col, Container} from 'reactstrap';
import ReactImageGallery, { ReactImageGalleryItem, ReactImageGalleryProps } from 'react-image-gallery';
import Petinfo from './Petinfo';


// PROPS TYPE ALIAS
type AcceptedProps = {
<<<<<<< HEAD
    PhotoGallery: (img: this.state.petId) => void
=======
    token: any
    id: any
>>>>>>> e308abae3c2ea1bd7f40da0fef344d4519c944fd
};
  
// STATE TYPE ALIAS
type PhotoGallery = {  
    image: id.file.path,
    title: id.body.title,
    caption: id.body.caption,


};

class Photogallery extends React.Component {
     Photogallery: ReactImageGallery | null;

    componentDidMount() {
        if (this.Photogallery) {
            const message = `Showing ${this.Photogallery.getCurrentIndex() + 1}. image the gallery.`;
        }
    }

    renderThumbInner(item: ReactImageGalleryItem): React.ReactNode {
        return (
            <div className="image-gallery-thumbnail-inner">
                <img
                    src={pet.id.image}
                    alt={pet.id.image}
                    title={pet.id.title}
                />
                {item.thumbnailLabel && (
                    <div className="image-gallery-thumbnail-label">
                        {item.thumbnailLabel}
                    </div>
                )}
            </div>
        );
    }

    render() {
        const galleryItem: ReactImageGalleryItem = {
            original: 'http://localhost/logo.jpg',
            originalTitle: 'My Logo',
            bulletClass: 'my-bullet-class-name',
        };

        const props: ReactImageGalleryProps = {
            items: [galleryItem],
            autoPlay: false,
            showFullscreenButton: false,
            renderThumbInner: this.renderThumbInner
        
        };
    

        return <ReactImageGallery ref={(r) => this.Photogallery = r} {...props} />
    
      /*  <div>

        <Container>
    <Row>
      <Col xs={6} md={4}>
        <Image src="holder.js/171x180" rounded />
      </Col>
      <Col xs={6} md={4}>
        <Image src="holder.js/171x180" rounded />
      </Col>
      <Col xs={6} md={4}>
        <Image src="holder.js/171x180" rounded />
      </Col>
    </Row>
  </Container> 
      </div>
    }
}

// PROPS TYPE ALIAS
type AcceptedProps = {
    PhotoGallery: (img: image) => void
};
  
// STATE TYPE ALIAS
type PhotoGallery = {  
    image: file.path,
    title: req.body.title,
    caption: req.body.caption,


};

class Photogallery extends React.Component<AcceptedProps, PhotoGallery> {
    constructor(props: AcceptedProps){
        super(props);
        this.state = {
                 
       image: body.img,
      title: body.title,
      caption: body.caption,
    }
}
      
    render(){
        return(
            <div>
                const Example = (props) => {
  return (
    <div>

      <Container>
  <Row>
    <Col xs={6} md={4}>
      <Image src="holder.js/171x180" rounded />
    </Col>
    <Col xs={6} md={4}>
      <Image src="holder.js/171x180" rounded />
    </Col>
    <Col xs={6} md={4}>
      <Image src="holder.js/171x180" rounded />
    </Col>
  </Row>
</Container> 
    </div>
  );
};
                
            </div>
        )
    }
}

*/
    
export default Photogallery;