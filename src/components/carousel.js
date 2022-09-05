import React, {Component} from 'react'
import styled from 'styled-components';
import ImageSlide from './imageSlide';

class Carousel extends Component {
    constructor (props) {
        super(props);
    
        this.state = {
          currentImageIndex: 0
        };

        this.nextSlide = this.nextSlide.bind(this);
        this.previousSlide = this.previousSlide.bind(this);
      }

      previousSlide () {
        const lastIndex = this.props.imgUrls.length - 1;
        const { currentImageIndex } = this.state;
        const shouldResetIndex = currentImageIndex === 0;
        const index =  shouldResetIndex ? lastIndex : currentImageIndex - 1;
    
        this.setState({
          currentImageIndex: index
        });
      }

      nextSlide () {
        const lastIndex = this.props.imgUrls.length - 1;
        const { currentImageIndex } = this.state;
        const shouldResetIndex = currentImageIndex === lastIndex;
        const index =  shouldResetIndex ? 0 : currentImageIndex + 1;
    
        this.setState({
          currentImageIndex: index
        });

     
      }

    render(){
      return (
        <ImageContainer width={this.props.width}>
          {
            this.props.imgUrls.length > 1 ?
            <>
              <Button onClick={this.previousSlide} style={{right: '30px'}}>{'<'}</Button>
              <ImageSlide url={ this.props.imgUrls[this.state.currentImageIndex] } />
              <Button onClick={this.nextSlide} style={{right: '5px'}}>{'>'}</Button>
            </>
            :
              <ImageSlide url={ this.props.imgUrls[this.state.currentImageIndex] } />
          }
      
        </ImageContainer>
      );
    }
  }

const Button = styled.button`
width: 24px;
height: 24px;
padding: 5px;
border: none;
line-height: 10px;
z-index: 10px;
cursor: pointer;
opacity: 0.5;
position: absolute;
bottom: 10px;
background: black;
color: white;
`
const ImageContainer = styled.div` 
height:100%;
width: ${props => `${props.width}px`};
position: relative;
`
  export default Carousel