import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux'
import { createCartItem } from '../actions/cartItemActions';
import Swal from 'sweetalert2';
import { increaseQuantity } from '../actions/cartItemActions'
import { decreaseQuantity } from '../actions/cartItemActions'
import parse from 'html-react-parser'
import { QuantityButton} from './cartItem'

class ProductDetail extends Component{
     constructor(props){
      super(props)

      //create a selectedAttributes object with properties set to null
      const { attributes } = this.props.data
      let selected = {}
      if(attributes.length === 0) {
        selected = null
      }else{
        attributes.forEach( ({ name }) => {
          selected[name] = null
        })
     }


      this.state = {isInCart: false, selected,  foundProduct: {} }
      this.setSelectedState = this.setSelectedState.bind(this)
      this.addToCart = this.addToCart.bind(this)
    }

 
    componentDidUpdate(prevProps, prevState){
       if(this.state.selected !== prevState.selected || this.props.cart !== prevProps.cart){
        //find identical product in cart
        const itemsAlreadyInCart = this.props.cart.filter(cartItem => cartItem.id === this.props.id)
        const foundProduct =  itemsAlreadyInCart.find(cartItem => JSON.stringify(cartItem.selectedAttributes) === JSON.stringify(this.state.selected))
        return foundProduct ? this.setState({isInCart: true, foundProduct}) : this.setState({isInCart: false})
       } 
    }


     setSelectedState(name,value){
      this.setState( prevState => ({selected: {...prevState.selected, [name]: value}}))
     }

     addToCart(){
      const { selected} = this.state

      //check if product is in stock
      const {inStock} = this.props.data
      if(!inStock) return Swal.fire("product is out of stock")

      //add product to cart if there are no attributes
      if(selected === null)return this.props.createCartItem(this.props.data)


      //check if all attributes have been selected
      for(const keys in selected){
        if(selected[keys] === null)return Swal.fire("you haven't selected all attributes")
      }
      this.props.createCartItem(this.props.data, selected)
     }
     
    render(){
        const {name, brand, attributes, prices, description, selectedCurrency } = this.props.data
        const newPrice = selectedPrice(prices,selectedCurrency)
        return(
             <>
              <Box>
                <Brand>{brand}</Brand>
                <Brand style={{fontWeight:400}}>{name}</Brand>
                {
                  attributes.map(({name,type,items})=> {
                    return <Contain key={name}>
                            <Title>{`${name}:`}</Title>
                            { 
                              type === 'text' ? 
                              items.map(({value}) => {
                                return <TextBox key={value} onClick={() => this.setSelectedState(name, value)} value={value} text={this.state.selected[name]}>{value}</TextBox>
                              })
                            :
                              items.map(({displayValue}) => {
                                return <Div key={displayValue} onClick={() => this.setSelectedState(name, displayValue)} background={displayValue} selectedColor={this.state.selected[name]}>
                                <SwatchBox background={displayValue} />
                                </Div>
                              })
                            }
                          </Contain>
                  })
                }
                <Title>price:</Title>
                <Price>{`${selectedCurrency} ${newPrice}`}</Price>
                {
                  this.state.isInCart ?
                  <ButtonGroup>
                    <QuantityButton style={{backgroundColor: '#5ECE7B', color: 'white'}} onClick={() => this.props.increaseQuantity(this.state.foundProduct)}>+</QuantityButton>
                    <p style={{margin: '0px 5px'}}>{this.state.foundProduct.qty}</p>
                    <QuantityButton style={{backgroundColor: '#5ECE7B', color: 'white'}} onClick={() => this.props.decreaseQuantity(this.state.foundProduct)}>-</QuantityButton>
                  </ButtonGroup>
                  :
                  <Button  onClick={() => this.addToCart()}>
                    <p style={{fontWeight: 600,fontSize:'16px'}}>ADD TO CART</p>
                  </Button>
                }
                {parse(description)}
              </Box>
           
             </>

        )
      
    }
}

export function  selectedPrice(priceArray, selectedCurrency){
  const newPriceArray = priceArray.find(price => price.currency.symbol === selectedCurrency)
  return  newPriceArray.amount.toFixed(2)
}

function mapStateToProps({cart}){
  return {cart}
}

export default connect(mapStateToProps, {createCartItem, increaseQuantity, decreaseQuantity})(ProductDetail)

export const Price = styled.p`
font-weight:700;
font-size:24px;
line-height:160%;
color: black;
`

const ButtonGroup = styled.div`
display: flex;
justify-content:space-between;
align-items:center;
width: 292px;
margin: 10px 0px;

`

const Button = styled.button`
display: flex;
justify-content: center;
align-items: center;
width: 292px;
height: 52px;
background-color: #5ECE7B;
border: 1px solid lightgray;
color: white;
margin: 10px 0px;
&:hover{
  cursor:pointer;
}
`
export const Title = styled.p`
font-weight: 700;
font-size: 18px;
line-height: 18px;
margin-top: 20px;
margin-bottom: 5px;
text-transform: uppercase;
font-family: 'Roboto';
`
export const TextBox = styled.div`
width: 63px;
height: 45px;
background: ${props => props.text === props.value ? 'black': 'white'};
color: ${props => props.text === props.value ? 'white': 'black'};
border: 1px solid #1D1F22;
display: inline-block;
text-align: center;
margin-right: 10px;
line-height: 45px;

`
export const SwatchBox = styled.div`
width: 32px;
height: 32px;
background: ${props => props.background};
margin:1px;
border: 1px solid lightgray;
`
export const Div = styled.div`
margin-right: 5px;
display: inline-block;
border: ${props => props.background === props.selectedColor ? '2px solid #5ECE7B': 'none'};
`

export const Contain = styled.div`
margin-top:20px;
`
export const Brand = styled.p`
font-weight: 600;
font-size: 30px;
color: #1D1F22;
margin-bottom:16px;
`
export const Box = styled.div`
width: 292px;
`

