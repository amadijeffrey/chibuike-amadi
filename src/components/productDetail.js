import React, {Component} from 'react';
import styled from 'styled-components';


class ProductDetail extends Component{
     constructor(props){
      super(props)

      this.state = {}
      this.setDefaultSelectedState = this.setDefaultSelectedState.bind(this)
     }

     setDefaultSelectedState(){
      const { attributes } = this.props.data
      attributes.forEach( ({name, items}) => {
          return this.setState({...this.state, [`selected${name}`]: items[0].value })
      })
     }

     componentDidMount(){
      this.setDefaultSelectedState()
     }

    render(){
        const {name, brand, attributes, prices, description, selectedCurrency } = this.props.data
        console.log(this.state)
        
        const newPriceArray = prices.filter(price => price.currency.symbol === selectedCurrency)
        const newPrice = newPriceArray[0].amount

        return(
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
                                return <TextBox key={value} onClick={() => this.setState({[`selected${name}`]: value})} value={value} text={this.state[`selected${name}`]}>{value}</TextBox>
                              })
                            :
                              items.map(({value}) => {
                                return <Div onClick={() => this.setState({[`selected${name}`]: value})} background={value} selectedColor={this.state[`selected${name}`]}>
                                <SwatchBox key={value} background={value} />
                                </Div>
                              })
                            }
                          </Contain>
                        })
                      }
                      <Title style={{marginTop: '20px'}}>price:</Title>
                      <Price>{`${selectedCurrency} ${newPrice}`}</Price>
                      <Button>
                        <p style={{fontWeight: 600,fontSize:'16px'}}>ADD TO CART</p></Button>
                      <p dangerouslySetInnerHTML={{__html: description}}/>
                    </Box>
        )
      
    }
}

const Price = styled.p`
font-weight:700;
font-size:24px;
line-height:160%;
color: black;
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
const Title = styled.p`
font-weight: 700;
font-size: 18px;
line-height: 18px;
margin-bottom: 5px;
text-transform: uppercase;
font-family: 'Roboto';
`
const TextBox = styled.div`
width: 63px;
height: 45px;
background: ${props => props.text === props.value ? 'black': 'white'};
color: ${props => props.text === props.value ? 'white': 'black'};
border: 1px solid #1D1F22;
display: inline-block;
text-align: center;
margin-right: 10px;
line-height: 45px;
&:hover{
  cursor:pointer;
}
`
const SwatchBox = styled.div`
width: 32px;
height: 32px;
background: ${props => props.background};
margin:2px;
border: 1px solid lightgray;
`
const Div = styled.div`
margin-right: 5px;
display: inline-block;
border: ${props => props.background === props.selectedColor ? '2px solid #5ECE7B': 'none'};
&:hover{
  cursor:pointer;
}
`

const Contain = styled.div`
margin-top:20px;
`
const Brand = styled.p`
font-weight: 600;
font-size: 30px;
color: #1D1F22;
margin-bottom:16px;
`
const Box = styled.div`
width:292px;

`

export default ProductDetail