import React,{Component} from "react";
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import HeaderComponent from './header'
import {connect} from 'react-redux';
import ProductImage from "./productImage";
import ProductDetail from "./productDetail";


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

 render(){
  const { id } = this.props.match.params

    return(
        <>
          <HeaderComponent />
          <Query query={GET_PRODUCT} variables={{id}}>
            {({loading, error, data}) => {
                if(loading) return <p>Loading...</p>
                if (error) return <p>{`Error! ${error.message}`}</p>

                const selectedCurrency = this.props.selectedCurrency
                const {prices, name, brand, gallery, description, attributes, inStock} = data.product
                const productData = {prices, name, brand, description, attributes, selectedCurrency, gallery, inStock}
                return (
                <div style={{margin: '80px 216px 100px 101px', display: 'flex', justifyContent: 'space-between'}}>
                  <ProductImage gallery={gallery}/>
                  <ProductDetail data={productData}  />
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











export default connect(mapStateToProps)(ProductDescription)