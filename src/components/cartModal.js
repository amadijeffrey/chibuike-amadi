import React,{Component} from 'react'
import styled from 'styled-components'
import { Span } from './cart';
import MiniCartItem from './minicartItem'
import {Link} from 'react-router-dom'
import {displayNoOfCartItem} from './header'
import {connect} from 'react-redux'
import { selectedPrice } from './productDetail';



class CartModal extends Component{
    render(){
      const {selectedCurrency, cart} = this.props

        return (
            <ModalContainer onClick={this.props.close}>
                 <MiniCart onClick={(e) => e.stopPropagation()}>
                  <Heading><span style={{fontWeight: '700'}}>My Bag, </span>{displayNoOfCartItem(this.props.cart) ? `${displayNoOfCartItem(this.props.cart)} items` : 'no item'}</Heading>
                  <div className='carouselScrollBar' style={{height:'auto', maxHeight: '350px', overflowY: 'auto'}}>
                  {
                    this.props.cart.map( cartItem => {
                        return <MiniCartItem key={JSON.stringify(cartItem.selectedAttributes)} cartDetail={cartItem} selectedCurrency={this.props.selectedCurrency}/>
                    })
                  }
                  </div>
                  <div style={{margin: '10px 0px'}}><Span>Total</Span><Span style={{float: 'right'}}>{`${selectedCurrency} ${calculateTotal(cart, selectedCurrency)}`}</Span></div>
                  <Link to='/cart'>
                  <Button onClick={this.props.close}>
                    VIEW BAG
                  </Button>
                  </Link>
                  <Button style={{color: 'white',border: '1px solid lightgray', background: '#5ECE7B', marginLeft: '4%'}}>
                    CHECKOUT
                  </Button>
               </MiniCart>
            </ModalContainer>
        )
    }
}

function mapStateToProps({selectedCurrency, cart}){
    return {selectedCurrency, cart}
   }

function calculateTotal(array, currency){
    let total = 0
    array.forEach( cartItem => {
        const price = selectedPrice(cartItem.prices, currency)
        total += (price * cartItem.qty)
    })
    total = total.toFixed(2)
    return total
}


const ModalContainer = styled.div`
position: fixed;
top: 80px;
bottom: 0px;
left: 0px;
right: 0px;
background-color: rgba(0,0,0,0.5);
z-index:10;
`
const MiniCart = styled.div`
padding: 32px 16px;
position: absolute;
right: 100px;
top: 0px;
background: white;
z-index:20;
width: 430px;
height: auto;
`
const Heading = styled.h2`
font-weight: 500;
margin-bottom: 24px;
`
const Button = styled.button`
width: 48%;
height: 43px;
background: white;
color: black;
border: 1px solid black;
`

export default connect(mapStateToProps)(CartModal)  
