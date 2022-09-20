import React,{Component} from 'react'
import styled from 'styled-components'

class ImageSlide extends Component{
  
    render(){
        return (
            <Div url={this.props.url}/>
          )
    }
  
  }

  const Div = styled.div`
  background-image: ${props => `url(${props.url})`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height:100%;
  width: 100%;
  min-width: 100%;
  transition: background-image .3s ease-in-out;
  `
  export default ImageSlide