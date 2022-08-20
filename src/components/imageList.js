import React,{Component} from 'react';
import styled from 'styled-components';

class ImageList extends Component{
 render(){
    return(
       <Container>
         {
          this.props.gallery.map(imageUrl => {
                        return  <ImageBox key={imageUrl}>
                                  <img src={imageUrl} style={{height:'100%', width: '100%'}} 
                                  onClick={() => this.props.setSelectedImage(imageUrl)} alt='other images' />
                                </ImageBox>
                        })
         }
       </Container>
    )
 }
}

const Container = styled.div`
width:79px;
margin-right:39px;
`
const ImageBox = styled.div`
width: 79px;
height: 80px;
margin-bottom: 10px;
`

export default ImageList