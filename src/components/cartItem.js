import React,{ Component} from 'react'
import {Brand, Contain, Title, TextBox, SwatchBox, Price, Box, Div} from './productDetail'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { selectedPrice } from './productDetail'
import { increaseQuantity } from '../actions/cartItemActions'
import { decreaseQuantity } from '../actions/cartItemActions'

class CartItem extends Component{

render(){
        const {name, brand, attributes, prices, qty, gallery, selectedAttributes} = this.props.cartDetail
        console.log(this.props.cartDetail)
        const { selectedCurrency } = this.props
        const newPrice = selectedPrice(prices, selectedCurrency)

            return(
                 <Container>
                    <Box>
                      <Brand>{brand}</Brand>
                      <Brand style={{fontWeight:400}}>{name}</Brand>
                      <Title style={{marginTop: '20px'}}>price:</Title>
                      <Price>{`${selectedCurrency} ${newPrice}`}</Price>
                      {
                        attributes.map(({name,type,items})=> {
                          return <Contain key={name}>
                            <Title>{`${name}:`}</Title>
                            { 
                             type === 'text' ? 
                              items.map(({value}) => {
                                return <TextBox key={value} value={value} text={selectedAttributes[`selected${name}`]}>{value}</TextBox>
                              })
                            :
                              items.map(({value}) => {
                                return <Div key={value} background={value}  selectedColor={selectedAttributes[`selected${name}`]}>
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
                        <QuantityButton onClick={() => this.props.increaseQuantity(this.props.cartDetail)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                        </QuantityButton>
                        <p>{qty}</p>
                        <QuantityButton onClick={() => this.props.decreaseQuantity(this.props.cartDetail)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                          <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                        </svg>
                        </QuantityButton>
                      </Group>
                      <ImageContainer>
                        <img  style={{height:'100%', width: 'inherit'}} src={gallery[0]} alt='picScroll'/>
                      </ImageContainer>
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
font-size: 25px;
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
`
const ImageContainer = styled.div`
width: 288px;
`
export default connect(null, {increaseQuantity, decreaseQuantity})(CartItem)