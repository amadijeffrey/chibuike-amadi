import React,{ Component} from 'react'
import { connect} from 'react-redux'
import styled from 'styled-components'
import CartItem from './cartItem'
import { displayNoOfCartItem } from './header'
import { selectedPrice} from './productDetail' 


class Cart extends Component{
    constructor(props){
        super(props)

        let total = 0
        this.props.cart.forEach( cartItem => {
            const price = selectedPrice(cartItem.prices, this.props.selectedCurrency)
            total += (price * cartItem.qty)
        })
        total = total.toFixed(2)
        const tax = (0.21 * total).toFixed(2)

        this.state = {total, tax}
        this.findTotalAndTax = this.findTotalAndTax.bind(this)

    }

    
    componentDidUpdate(prevProps){
        if(this.props.cart !== prevProps.cart){
            this.findTotalAndTax()
        }
        if(this.props.selectedCurrency !== prevProps.selectedCurrency){
            this.findTotalAndTax()
        }
    }
    
    findTotalAndTax(){
        let total = 0
        this.props.cart.forEach( cartItem => {
            const price = selectedPrice(cartItem.prices, this.props.selectedCurrency)
            total += (price * cartItem.qty)
        })
        total = total.toFixed(2)
        const tax = (0.21 * total).toFixed(2)
        this.setState({total, tax})
    }

    render(){
        return(
            <>
            <Title>CART</Title>
            <Container>
              {
                this.props.cart.map( cartItem => {
                    return <CartItem key={cartItem.id && cartItem.selectedAttributes} cartDetail={cartItem} selectedCurrency={this.props.selectedCurrency}/>
                })
             }
                <Total>
                    <Span style={{fontWeight:'400', display: 'block'}}>Tax 21%: <Span>{`${this.props.selectedCurrency} ${this.state.tax}`}</Span></Span>
                    <Span style={{fontWeight:'400', display: 'block'}}>Quantity: <Span>{displayNoOfCartItem(this.props.cart)}</Span></Span>
                    <Span style={{fontWeight:'400', display: 'block'}}>Total: <Span>{`${this.props.selectedCurrency} ${this.state.total}`}</Span></Span>
                    <OrderButton>ORDER</OrderButton>
                </Total>
            </Container>
            </>
        )
    }

}

function mapStateToProps({cart, selectedCurrency}){
    return { cart, selectedCurrency}
}

const OrderButton = styled.button`
display: flex;
justify-content: center;
align-items: center;
border: 1px solid lightgray;
width: 279px;
height: 43px;
color: white;
background: #5ECE7B;
margin: 10px 0px;
`
const Title = styled.h4`
font-family: 'Raleway';
font-weight: 700;
font-size: 32px;
line-height: 40px;
margin-left: 101px;
margin-top: 80px;
margin-bottom:55px;
`

const Container = styled.div`
margin: 0px 100px;
`
const Total = styled.div`
border-top: 1px solid lightgray;
padding-top: 24px;
`
export const Span = styled.span`
font-weight: 700;
font-size: 24px;
line-height: 28px;

`
export default connect(mapStateToProps)(Cart)