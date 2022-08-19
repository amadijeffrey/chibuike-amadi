import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Query } from 'react-apollo';
import gql from 'graphql-tag'
import HeaderComponent from './header'
import { Link } from "react-router-dom";




const GET_PRODUCTS_UNDER_CATEGORY = gql`
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
      }
    }
  }
`;

class ProductCategory extends Component{
  render() {
    return (
      <>
        <HeaderComponent />
        <CategoryName>Category name</CategoryName>
        <ProductList>
        <Query query={GET_PRODUCTS_UNDER_CATEGORY} variables={{title: 'all'}}>
          {({loading, error, data}) => {
             if (loading) return <p>'Loading...'</p>
             if (error) return <p>{`Error! ${error.message}`}</p>
             return (
               data.category.products.map(({name, gallery, id, prices, inStock, brand}) => {
                const currency = this.props.selectedCurrency
                const newPriceArray = prices.filter(price => price.currency.symbol === currency)
                const newPrice = newPriceArray[0].amount
                return <Link to={`/${id}`} key={name}>
                <Product inStock={inStock}>
                  <img src={gallery[0]} alt='productPic' style={{width: '100%', height: '338px'}}/>
                  <Content>
                  <ProductName>{`${brand} ${name}`}</ProductName>
                  <ProductName style={{fontWeight: 700}}>{`${currency} ${newPrice}`}</ProductName>
                  </Content>
                  <AddToCart className="addToCart">
                  <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.5613 3.87359C19.1822 3.41031 18.5924 3.12873 17.9821 3.12873H5.15889L4.75914 1.63901C4.52718 0.773016 3.72769 0.168945 2.80069 0.168945H0.653099C0.295301 0.168945 0 0.450523 0 0.793474C0 1.13562 0.294459 1.418 0.653099 1.418H2.80069C3.11654 1.418 3.39045 1.61936 3.47434 1.92139L6.04306 11.7077C6.27502 12.5737 7.07451 13.1778 8.00152 13.1778H16.4028C17.3289 13.1778 18.1507 12.5737 18.3612 11.7077L19.9405 5.50575C20.0877 4.941 19.9619 4.33693 19.5613 3.87365L19.5613 3.87359ZM18.6566 5.22252L17.0773 11.4245C16.9934 11.7265 16.7195 11.9279 16.4036 11.9279H8.00154C7.68569 11.9279 7.41178 11.7265 7.32789 11.4245L5.49611 4.39756H17.983C18.1936 4.39756 18.4042 4.49824 18.5308 4.65948C18.6567 4.81994 18.7192 5.0213 18.6567 5.22266L18.6566 5.22252Z" fill="#43464E"/>
                    <path d="M8.44437 13.9814C7.2443 13.9814 6.25488 14.9276 6.25488 16.0751C6.25488 17.2226 7.24439 18.1688 8.44437 18.1688C9.64445 18.1696 10.6339 17.2234 10.6339 16.0757C10.6339 14.928 9.64436 13.9812 8.44437 13.9812V13.9814ZM8.44437 16.9011C7.9599 16.9011 7.58071 16.5385 7.58071 16.0752C7.58071 15.6119 7.9599 15.2493 8.44437 15.2493C8.92885 15.2493 9.30804 15.6119 9.30804 16.0752C9.30722 16.5188 8.90748 16.9011 8.44437 16.9011Z" fill="#43464E"/>
                    <path d="M15.6875 13.9814C14.4875 13.9814 13.498 14.9277 13.498 16.0752C13.498 17.2226 14.4876 18.1689 15.6875 18.1689C16.8875 18.1689 17.877 17.2226 17.877 16.0752C17.8565 14.9284 16.8875 13.9814 15.6875 13.9814ZM15.6875 16.9011C15.2031 16.9011 14.8239 16.5385 14.8239 16.0752C14.8239 15.612 15.2031 15.2493 15.6875 15.2493C16.172 15.2493 16.5512 15.612 16.5512 16.0752C16.5512 16.5188 16.1506 16.9011 15.6875 16.9011Z" fill="#43464E"/>
                  </svg>
                  </AddToCart>
                 { !inStock && <Box>
                  OUT OF STOCK
                  </Box>
                 }
                </Product>
               
                </Link>
              })
             )            
          }}
        </Query>
        </ProductList>
      </>    
    );
  }
}

function mapStateToProps({selectedCurrency}){
  return {selectedCurrency}
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
`;

const AddToCart = styled.div`
  position: absolute;
  display: flex;
  justify-content:center;
  align-items:center;
  width: 52px;
  height: 52px;
  right: 31px;
  bottom: 72px;
  border-radius: 50%;
  background: #5ECE7B;
  visibility:hidden;
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

export default connect(mapStateToProps)(ProductCategory);
