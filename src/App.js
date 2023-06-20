import React,{useEffect, useState} from "react";
import{ToastContainer, toast}from 'react-toastify'
import TopMenu from "./components/TopMenu";
import {urlApiProducts} from './utils/constants';
import {STORAGE_PRODUCTS_CART}from './utils/constants';
import useFetch from "./hooks/useFetch";

import Products from "./components/Products";


export default function App() {

  const products = useFetch(urlApiProducts, null);
  const [productsCart, setProductsCart] = useState([]);
  useEffect(()=>{
    getProductsCart();
  },[])

  const getProductsCart = ()=>{
    const idsProducts = localStorage.getItem(STORAGE_PRODUCTS_CART);
    if(idsProducts){
      const idsProductsSplit=idsProducts.split(',');
      setProductsCart(idsProductsSplit)
    }else{
      setProductsCart([]);
    }
  }
  const addProductCart = (id, name)=>{
      const idsProducts = productsCart
      idsProducts.push(id)
      setProductsCart(idsProducts);
      localStorage.setItem(STORAGE_PRODUCTS_CART, productsCart)
      getProductsCart();
      toast.success(`${name} añadido al carrito.`)
  }

  return (
    <div>
      <TopMenu 
        productsCart={productsCart  } 
        getProductsCart={getProductsCart}
        products={products}
      />
      <Products products={products} addProductCart={addProductCart}/>
      <ToastContainer 
      position="bottom-left"
      autoClose={5000}
      newestOnTop
      closeOnClick={false}
      rtl={false}
      pauseOnVisibilityChange={false}
      draggable
      pauseOnHover
      ></ToastContainer>
    </div>
  );
};


