import React, {Component} from 'react'
import SelectedImage from './selectedImage'
import ImageList from './imageList'

class ProductImage extends Component{
    constructor(props){
        super(props)

        this.state = { selectedImage: this.props.gallery[0]}
        this.setSelectedImage = this.setSelectedImage.bind(this)
    }

    setSelectedImage(imageUrl){
        this.setState({selectedImage: imageUrl})
      }

    render(){
        return(
            <div style={{display: 'flex'}}>
            <ImageList gallery={this.props.gallery} setSelectedImage={this.setSelectedImage}/>
            <SelectedImage selectedImage={this.state.selectedImage}/>
            </div>
        )
    }
}



export default ProductImage