import React,{ Component} from 'react'
import {Brand, Contain, Title, TextBox, SwatchBox, Price, Box, Div} from './productDetail'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Carousel from './carousel'
import { selectedPrice } from './productDetail'
import { increaseQuantity } from '../actions/cartItemActions'
import { decreaseQuantity } from '../actions/cartItemActions'

class CartItem extends Component{
  render(){
    const {name, brand, attributes, prices, qty, gallery, selectedAttributes} = this.props.cartDetail
    const { selectedCurrency } = this.props
    const newPrice = selectedPrice(prices, selectedCurrency)

  return(
      <Container>
          <Box>
            <Brand>{brand}</Brand>
            <Brand style={{fontWeight:400}}>{name}</Brand>
            <Title>price:</Title>
            <Price>{`${selectedCurrency} ${newPrice}`}</Price>
            {
              attributes.map(({name,type,items})=> {
                return <Contain key={name}>
                  <Title>{`${name}:`}</Title>
                  { 
                  type === 'text' ? 
                    items.map(({value}) => {
                      return <TextBox key={value} value={value} text={selectedAttributes[name]}>{value}</TextBox>
                    })
                  :
                    items.map(({value}) => {
                      return <Div key={value} background={value}  selectedColor={selectedAttributes[name]}>
                      <SwatchBox background={value} />
                      </Div>
                    })
                  }
                </Contain>
              })
            }
        
          </Box>
          <SecondContainer>
            <Group>
              <QuantityButton onClick={() => this.props.increaseQuantity(this.props.cartDetail)}> + </QuantityButton>
              <p>{qty}</p>
              <QuantityButton onClick={() => this.props.decreaseQuantity(this.props.cartDetail)}> - </QuantityButton>
            </Group>
            <Carousel imgUrls={gallery} width={288}/>
          </SecondContainer>
        </Container>
    )   
  }
}

const Container = styled.div`
display: flex;
justify-content: space-between;
padding-top: 24px;
border-top: 1px solid lightgray;
margin-bottom: 24px;
`
const QuantityButton = styled.div`
width: 45px;
height: 45px;
border: 1px solid black;
text-align: center;
line-height: 45px;
&:hover {
  cursor: pointer;
}
`
const Group = styled.div`
display: flex;
flex-direction:column;
justify-content: space-between;
align-items: center;
margin-right: 25px;
`
const SecondContainer = styled.div`
display: flex;
max-height: inherit;
`

export default connect(null, {increaseQuantity, decreaseQuantity})(CartItem)