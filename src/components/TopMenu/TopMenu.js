import React from "react";
import {  Container, Navbar, Nav} from 'react-bootstrap'
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import './TopMenu.scss';
import Cart from "../Cart/Cart";



export default function TopMenu(props){

    const {productsCart, getProductsCart, products} = props;

    return(
        <Navbar bg="dark" variant="dark" className="top-menu">
            <Container>
                <BrandNav/>
                {/* <MenuNav/> */}
                <Cart 
                productsCart={productsCart} 
                getProductsCart={getProductsCart}
                products={products}
                />
            </Container>
        </Navbar>
    )
}

function BrandNav(){
    return(
        <Navbar.Brand>
            <Logo/>
            <h2>Helado Changarro</h2>
        </Navbar.Brand>
    )
}

//this component is to display options if needed (not needed for this project)
function MenuNav(){
    return(
        <Nav className="mr-auto">
            <Nav.Link href="#">Milk</Nav.Link>
            <Nav.Link href="#">Icecream</Nav.Link>
            <Nav.Link href="#">Pets</Nav.Link>
            <Nav.Link href="#">Milk</Nav.Link>
        </Nav>
    )
}