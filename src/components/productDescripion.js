import React,{Component} from "react";
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import HeaderComponent from './header'
import styled from 'styled-components'
import {connect} from 'react-redux'


const GET_PRODUCT = gql`
  query Product($id: String!){
    product(id: $id){
      id
      prices{
        currency{
          symbol
          label
        }
        amount
      }
      name
      inStock
      gallery
      brand
      attributes{
        name
        type
        items{
          displayValue
          value
          id
        }
      }
      description
    }
  }
`;

class ProductDescription extends Component{
  constructor(props){
    super(props)

    this.state = {selectedImage: ''}
  }

 render(){
  const { id } = this.props.match.params

    return(
        <>
          <HeaderComponent />
          <Query query={GET_PRODUCT} variables={{id}}>
            {({loading, error, data}) => {
                if(loading) return <p>Loading...</p>
                if (error) return <p>{`Error! ${error.message}`}</p>
                const {prices, name, brand, gallery, description, attributes} = data.product
                const currency = this.props.selectedCurrency
                const newPriceArray = prices.filter(price => price.currency.symbol === currency)
                const newPrice = newPriceArray[0].amount
                console.log(attributes)
                return (
                  <div style={{margin: '80px 216px 178px 100px', display: 'flex'}}>
                  <Container1>
                    {
                       gallery.map(image => {
                        return  <ImageBox key={image}>
                                  <img src={image} style={{height:'100%', width: '100%'}} 
                                  onClick={() => this.setState({selectedImage:image})} alt='other images' />
                                </ImageBox>
                      })
                    } 
                  </Container1>
                  <Container2>
                      <ImageBox2>
                        <img src={gallery[0]} style={{height:'100%', width: '100%'}} alt='other images' />                        
                      </ImageBox2>
                    <Box>
                      <Brand>{brand}</Brand>
                      <Brand style={{fontWeight:400}}>{name}</Brand>
                      {
                        attributes.map(({name,type,items})=> {
                          return <Contain key={name}>
                            <Title>{`${name}:`}</Title>
                            { type === 'text' ? 
                              items.map(({value}) => {
                                return <TextBox key={value}>{value}</TextBox>
                              })
                            :
                            items.map(({value}) => {
                              return <SwatchBox key={value} background={value}/>
                            })
                            }
                          </Contain>
                        })
                      }
                      <Title style={{marginTop: '20px'}}>price:</Title>
                    </Box>
                  </Container2>
                </div>
                )
            }}
          </Query>
        </>
    )
 }
}

function mapStateToProps({selectedCurrency}){
  return {selectedCurrency}
 }

const ImageBox = styled.div`
width: 79px;
height: 80px;
// margin-bottom: 40px;
`
const Container1 = styled.div`
width:79px;
margin-right:39px;
`
const Container2 = styled.div`
display: flex;
`
const Box = styled.div`
width:292px;
`
const Brand = styled.p`
font-weight: 600;
font-size: 30px;
color: #1D1F22;
margin-bottom:16px;
`
const ImageBox2 = styled.div`
width: 500px;
height: 511px;
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
border: 1px solid #1D1F22;
display: inline-block;
text-align: center;
margin-right: 10px;
line-height: 45px;
`
const SwatchBox = styled.div`
width: 32px;
height: 32px;
background: ${props => props.background};
display: inline-block;
margin-right: 5px;
border: 1px solid #1D1F22;
`
const Contain = styled.div`
margin-top:20px;
`



export default connect(mapStateToProps)(ProductDescription)