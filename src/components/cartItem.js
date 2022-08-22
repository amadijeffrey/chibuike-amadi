import React,{ Component} from 'react'

class CartItem extends Component{

render(){
        const {name, brand, attributes, prices, description, selectedCurrency } = this.props.cart
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
                                return <Div key={value} onClick={() => this.setState({[`selected${name}`]: value})} background={value} selectedColor={this.state[`selected${name}`]}>
                                <SwatchBox background={value} />
                                </Div>
                              })
                            }
                          </Contain>
                        })
                      }
                      <Title style={{marginTop: '20px'}}>price:</Title>
                      <Price>{`${selectedCurrency} ${newPrice}`}</Price>
                    </Box>
        )
      
    }
}


export default CartItem