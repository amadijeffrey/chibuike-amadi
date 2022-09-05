import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { selectedPrice } from "./productDetail";
import { createCartItem } from '../actions/cartItemActions';
import Swal from 'sweetalert2';
import { QuantityButton } from "./minicartItem";
import { increaseQuantity } from '../actions/cartItemActions'
import { decreaseQuantity } from '../actions/cartItemActions'


export const GET_PRODUCTS_UNDER_CATEGORY = gql`
  query Category($title: String!){
    category(input:{title: $title}){
      name,
      products{
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
      }
    }
  }
`;

class ProductCategory extends Component{
  constructor(props){
    super(props)

    this.AddToCart = this.AddToCart.bind(this)
  }

  AddToCart(cartData, e){
    e.stopPropagation()
   const { attributes } = cartData
   const selected = {}
   if(attributes.length === 0) return this.props.createCartItem(cartData)
  
   attributes.forEach( ({ name, items }) => {
       selected[name] = items[0].value
   })
   Swal.fire( 'success', 'product added successfully', 'success')
   this.props.createCartItem(cartData, selected)
  }

  render() {
    return (
      <>
        <CategoryName>{this.props.selectedCategory}</CategoryName>
        <ProductList>
        <Query query={GET_PRODUCTS_UNDER_CATEGORY} variables={{title: this.props.selectedCategory}}>
          {({loading, error, data}) => {
             if (loading) return <p>Loading...</p>
             if (error) return <p>{`Error! ${error.message}`}</p>
             return (
               data.category.products.map(({name, gallery, id, prices, inStock, attributes, brand}) => {
                const { selectedCurrency }= this.props
                const cartData = {name, brand, attributes, prices, gallery, id }
                const newPrice = selectedPrice(prices, selectedCurrency)
                const foundProduct = this.props.cart.find(cartItem => cartItem.id === id ) 

                return  <Product inStock={inStock} key={name} onClick={() => this.props.history.push(`/${id}`)}>
                  <img src={gallery[0]} alt='productPic' style={{width: '100%', height: '338px'}}/>
                  <Content>
                  <ProductName>{`${brand} ${name}`}</ProductName>
                  <ProductName style={{fontWeight: 700}}>{`${selectedCurrency} ${newPrice}`}</ProductName>
                  </Content>
              
                 { 
                  !inStock && <Box>
                  OUT OF STOCK
                  </Box>
                 }
                </Product>
               
              })
             )            
          }}
        </Query>
        </ProductList>
      </>    
    );
  }
}

 

function mapStateToProps({selectedCurrency, selectedCategory, cart}){
  return {selectedCurrency,selectedCategory, cart}
 }

 const CategoryName = styled.h2`
  width: 299px;
  height: 68px;
  margin-left: 101px;
  margin-top: 80px;
  margin-bottom:103px;
  font-family: "Raleway";
  font-weight: 400;
  font-size: 42px;
  line-height: 160%;
`;
const Product = styled.div`
  position:relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  height: 444px;
  opacity: ${props => props.inStock ? 1 : 0.5};
  background: #ffffff;
  &:hover{
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  }
  &:hover .addToCart{
    visibility:${props => props.inStock ? 'visible' : 'hidden'};
  }
  &:hover .buttongroup{
    visibility:${props => props.inStock ? 'visible' : 'hidden'};
  }
`;

const AddToCartButton = styled.button`
  position: absolute;
  display: flex;
  justify-content:center;
  align-items:center;
  width: 52px;
  height: 52px;
  right: 31px;
  bottom: 72px;
  border: 1px solid lightgray;
  border-radius: 50%;
  background: #5ECE7B;
  visibility:hidden;
  color: white;
`
const ButtonGroup = styled.div`
position: absolute;
display: flex;
justify-content:space-between;
align-items:center;
background: #5ECE7B;
visibility:hidden;
color: white;
right: 31px;
bottom: 72px;
`
const ProductList = styled.div`
display:grid;
grid-template-columns: repeat(3, 1fr);
grid-gap:1em;
margin: 0px 101px;
`
const Box = styled.div`
position: absolute;
left: 0;
right: 0;
top: 0;
bottom: 0;
display: flex;
align-items: center;
justify-content: center;
color: #8D8F9A;
height: 444px;
`

const ProductName = styled.p`
font-weight:300;
font-size:18px;
line-height:160%;
font-family: 'Raleway';
text-align: initial;
color: black;
`
const Content = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
align-self:flex-start;
`

export default connect(mapStateToProps, {createCartItem, increaseQuantity, decreaseQuantity})(ProductCategory);
