import React,{Component} from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { selectedPrice } from './productDetail'
import { increaseQuantity } from '../actions/cartItemActions'
import { decreaseQuantity } from '../actions/cartItemActions'
import ImageSlide from './imageSlide'

class MiniCartItem extends Component{
 
render(){
    const {name, brand, attributes, prices, qty, gallery, selectedAttributes} = this.props.cartDetail
    const { selectedCurrency } = this.props
    const newPrice = selectedPrice(prices, selectedCurrency)

    return(
        <Container>
            <Box>
                <Title>{brand}</Title>
                <Title>{name}</Title>
                <Price>{`${selectedCurrency} ${newPrice}`}</Price>
                {
                attributes.map(({name,type,items})=> {
                    return <Contain key={name}>
                                <Heading>{`${name}:`}</Heading>
                                { 
                                    type === 'text' ? 
                                    items.map(({value}) => {
                                    return <TextBox key={value} value={value} text={selectedAttributes[name]}>{value}</TextBox>
                                    })
                                :
                                    items.map(({displayValue}) => {
                                    return <Div key={displayValue} background={displayValue}  selectedColor={selectedAttributes[name]}>
                                    <SwatchBox background={displayValue} />
                                    </Div>
                                    })
                                }
                        </Contain>
                })
                }
            </Box>
            <SecondContainer>
                <Group>
                <QuantityButton onClick={() => this.props.increaseQuantity(this.props.cartDetail)}> +</QuantityButton>
                <p>{qty}</p>
                <QuantityButton onClick={() => this.props.decreaseQuantity(this.props.cartDetail)}>-</QuantityButton>
                </Group>
                <div className='carouselScrollBar' style={{display: 'flex', height: '100%', width: '121px', maxWidth: '121px', overflowX: 'auto'}}>
                   {
                    gallery.map((image, i) => {
                        return <ImageSlide key={i} url={image}/>
                    })
                   } 
                </div>
            </SecondContainer>
        </Container>
    )
   }
}


export default connect(null, {increaseQuantity, decreaseQuantity})(MiniCartItem)


const Container = styled.div`
display: flex;
margin-bottom: 24px;
`
export const QuantityButton = styled.div`
width: 24px;
height: 24px;
border: 1px solid black;
text-align: center;
line-height: 24px;
&:hover {
  cursor: pointer;
}
`
export const Group = styled.div`
display: flex;
flex-direction:column;
justify-content: space-between;
align-items: center;
margin-right: 10px;
`
const SecondContainer = styled.div`
display: flex;
`

const Title = styled.p`
font-weight:300;
font-size:16px;
line-height:160%;
color: black;
`
const Price = styled.p`
font-weight: 500;
font-size: 16px;
line-height: 160%;
`
export const Heading = styled.p`
font-weight: 400;
font-size: 16px;
line-height: 18px;
`

const Box = styled.div`
width:220px;
`
const Contain = styled.div`
margin-top:20px;
`
export const TextBox = styled.div`
width: 50px;
height: 24px;
background: ${props => props.text === props.value ? 'black': 'white'};
color: ${props => props.text === props.value ? 'white': 'black'};
border: 0.5px solid #1D1F22;
display: inline-block;
text-align: center;
margin-right: 1px;
line-height:24px;
`
export const SwatchBox = styled.div`
width: 20px;
height: 20px;
background: ${props => props.background};
margin:1px;
line-height:20px;
border: 1px solid lightgray;
`
export const Div = styled.div`
margin-right: 1px;
display: inline-block;
border: ${props => props.background === props.selectedColor ? '1px solid #5ECE7B': 'none'};
`
