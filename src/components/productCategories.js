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
  
   attributes.forEach( ({ name, type, items }) => {
    if(type === 'text') return selected[name] = items[0].value
     return  selected[name] = items[0].displayValue
   })
   Swal.fire( 'success', 'product added successfully', 'success')
   this.props.createCartItem(cartData, selected)
  }


  render() {
    const { category } = this.props.match.params

    return (
        <Query query={GET_PRODUCTS_UNDER_CATEGORY} variables={{title: category}}>
          {({loading, error, data}) => {
             if (loading) return <p>Loading...</p>
             if (error) return <p>{`Error! ${error.message}`}</p>
             
            return (
              <>
                <CategoryName>{changeFirstLetterToUpperCase(data.category.name)}</CategoryName>
                <ProductList>
                  {
                    data.category.products.map(({name, gallery, id, prices, inStock, attributes, brand}) => {
                      const { selectedCurrency }= this.props
                      const cartData = {name, brand, attributes, prices, gallery, id }
                      const newPrice = selectedPrice(prices, selectedCurrency)
                      const foundProduct = this.props.cart.find(cartItem => cartItem.id === id ) 

                      return  <Product inStock={inStock} key={name} onClick={() => this.props.history.push(`/${category}/${id}`)}>
                        <img src={gallery[0]} alt='productPic' style={{width: '100%', height: '338px', objectFit: 'contain'}}/>
                        <Content>
                        <ProductName>{`${brand} ${name}`}</ProductName>
                        <ProductName style={{fontWeight: 700}}>{`${selectedCurrency} ${newPrice}`}</ProductName>
                        </Content>
                        {
                          foundProduct ?
                          <ButtonGroup className='buttongroup' onClick={(e) => e.stopPropagation()}>
                            <QuantityButton onClick={() => this.props.increaseQuantity(foundProduct)}>+</QuantityButton>
                            <p style={{margin: '0px 5px'}}>{foundProduct.qty}</p>
                            <QuantityButton onClick={() => this.props.decreaseQuantity(foundProduct)}>-</QuantityButton>
                          </ButtonGroup>
                        :
                        <AddToCartButton data-testid="add" className='addToCart' onClick={(e) => this.AddToCart(cartData, e) } >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.4736 5.8484C23.0186 5.29247 22.3109 4.95457 21.5785 4.95457H6.19066L5.71097 3.16691C5.43262 2.12772 4.47323 1.40283 3.36082 1.40283H0.783719C0.354361 1.40283 0 1.74072 0 2.15227C0 2.56284 0.353351 2.9017 0.783719 2.9017H3.36082C3.73985 2.9017 4.06854 3.14333 4.1692 3.50577L7.25167 15.2494C7.53003 16.2886 8.48941 17.0135 9.60182 17.0135H19.6833C20.7947 17.0135 21.7808 16.2886 22.0335 15.2494L23.9286 7.80699C24.1053 7.1293 23.9543 6.40442 23.4736 5.84848L23.4736 5.8484ZM22.3879 7.46712L20.4928 14.9095C20.3921 15.272 20.0634 15.5136 19.6844 15.5136H9.60185C9.22282 15.5136 8.89413 15.272 8.79347 14.9095L6.59533 6.47717H21.5796C21.8323 6.47717 22.085 6.59798 22.237 6.79148C22.388 6.98403 22.463 7.22566 22.388 7.46729L22.3879 7.46712Z" fill="white"/>
                            <path d="M10.1332 17.9778C8.69316 17.9778 7.50586 19.1132 7.50586 20.4902C7.50586 21.8672 8.69326 23.0027 10.1332 23.0027C11.5733 23.0036 12.7606 21.8682 12.7606 20.491C12.7606 19.1137 11.5732 17.9775 10.1332 17.9775V17.9778ZM10.1332 21.4814C9.55188 21.4814 9.09685 21.0463 9.09685 20.4903C9.09685 19.9344 9.55188 19.4993 10.1332 19.4993C10.7146 19.4993 11.1696 19.9344 11.1696 20.4903C11.1687 21.0227 10.689 21.4814 10.1332 21.4814Z" fill="white"/>
                            <path d="M18.8251 17.978C17.3851 17.978 16.1978 19.1135 16.1978 20.4905C16.1978 21.8675 17.3852 23.0029 18.8251 23.0029C20.2651 23.0029 21.4525 21.8675 21.4525 20.4905C21.4279 19.1143 20.2651 17.978 18.8251 17.978ZM18.8251 21.4816C18.2438 21.4816 17.7887 21.0465 17.7887 20.4906C17.7887 19.9346 18.2438 19.4995 18.8251 19.4995C19.4065 19.4995 19.8615 19.9346 19.8615 20.4906C19.8615 21.0229 19.3809 21.4816 18.8251 21.4816Z" fill="white"/>
                          </svg>
                        </AddToCartButton>
                        }
                      { 
                        !inStock && <Box>
                        OUT OF STOCK
                        </Box>
                      }
                      </Product>
                    })
                  }
                </ProductList>
              </>
            )            
          }}
        </Query> 
    );
  }
}

function changeFirstLetterToUpperCase(string){

  const initialCharacter = string.at(0)
  return string.replace(initialCharacter, initialCharacter.toUpperCase())
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
