import React,{ Component} from 'react'
import { connect} from 'react-redux'
import Header from './header'
import styled from 'styled-components'

class Cart extends Component{
    render(){
        return(
            <>
            <Header />
            <Title>CART</Title>
            </>
        )
    }

}

function mapStateToProps({cart}){
    return { cart}
}

const Title = styled.h4`
font-family: 'Raleway';
font-weight: 700;
font-size: 32px;
line-height: 40px;
margin-left: 101px;
margin-top: 80px;
margin-bottom:55px;
`

export default connect(mapStateToProps)(Cart)