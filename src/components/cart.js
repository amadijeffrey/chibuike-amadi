import React,{ Component} from 'react'
import { connect} from 'react-redux'
import Header from './header'
import styled from 'styled-components'
import CartItem from './cartItem'
import { displayNoOfCartItem } from './header'
import { selectedPrice} from './productDetail' 


class Cart extends Component{
    constructor(props){
        super(props)

        this.state = {total: 0}
        this.findTotal = this.findTotal.bind(this)
    }

    componentDidMount(){
        this.findTotal()
    }
    
    findTotal(){
        let total = 0
        this.props.cart.forEach( cartItem => {
            const price = selectedPrice(cartItem.prices, this.props.selectedCurrency)
            total += (price * cartItem.qty)
        })
        total = total.toFixed(2)
        this.setState({total})
    }
    render(){
        return(
            <>
            <Header />
            <Title>CART</Title>
            <Container>
              {
                this.props.cart.map( cartItem => {
                    return <CartItem key={cartItem.selectedAttributes} cartDetail={cartItem} selectedCurrency={this.props.selectedCurrency}/>
                })
             }
                <Total>
                    <p>Tax 21%: <Span>{`${this.props.selectedCurrency} ${findTax(this.state.total)}`}</Span></p>
                    <p>Quantity: <Span>{displayNoOfCartItem(this.props.cart)}</Span></p>
                    <p>Total: <Span>{`${this.props.selectedCurrency} ${this.state.total}`}</Span></p>
                </Total>
            </Container>
            </>
        )
    }

}

function mapStateToProps({cart, selectedCurrency}){
    return { cart, selectedCurrency}
}

function findTax(total){
return (0.21 * total).toFixed(2)
}

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
const Span = styled.span`
font-weight: 700;
`
export default connect(mapStateToProps)(Cart)