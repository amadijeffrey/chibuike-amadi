import React,{Component} from 'react';
import styled from 'styled-components';

class SelectedImage extends Component{

render(){
    return(
        <ImageBox>
             <img src={this.props.selectedImage} style={{height:'100%', width: '100%'}} alt='other images' />                        
        </ImageBox>
    )
 }
}

const ImageBox = styled.div`
width: 500px;
height: 511px;
`

export default SelectedImage