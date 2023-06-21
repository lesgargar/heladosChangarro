import React, {useState, useEffect}from "react";
import { Button } from "react-bootstrap"; 
import { ReactComponent as CartEmpty } from "../../assets/svg/cart-empty.svg";
import { ReactComponent as CartFull} from "../../assets/svg/cart-full.svg";
import { ReactComponent as Close} from "../../assets/svg/close.svg";
import { ReactComponent as Garbage} from "../../assets/svg/garbage.svg"
import {STORAGE_PRODUCTS_CART, BASE_PATH} from "../../utils/constants"
import {countDuplicatesItemArray, removeArrayDuplicates, removeItemArray} from "../../utils/arrayFunct"
import './Cart.scss';

export default function Cart(props){

    const {productsCart, getProductsCart, products} = props
    const [cartOpen, setCartOpen] = useState(false);
    const widthCartContent = cartOpen ? 400 : 0;
    const [sigleProductsCart, setSingleProductsCart] = useState([])
    const [cartTotalPrice, setCartTotalPrice]= useState(0)
    //carga los productos
    useEffect(()=>{
        const allProductsId = removeArrayDuplicates(productsCart)
        setSingleProductsCart(allProductsId)
    }, [productsCart])

    //actualiza el total del carrito
    useEffect(()=>{
        const productData = []
        let totalPrice = 0;
        const allProductsId = removeArrayDuplicates(productsCart)
        allProductsId.forEach(productId =>{
            const qty = countDuplicatesItemArray(productId, productsCart);
            const productValue ={
                id: productId,
                qty: qty
            };
            productData.push(productValue)
        })
        if (!products.loading && products.result){
            products.result.forEach(product =>{
                productData.forEach(item =>{
                    if(product.id == item.id){
                        const totalValue = product.price * item.qty;
                        totalPrice = totalPrice + totalValue
                    }
                });
            });
        }
        setCartTotalPrice(totalPrice)
    },[productsCart, products])

    const openCart = () => {
        setCartOpen(true);
        document.body.style.overflow = "hidden"
    };

    const closeCart = () => {
        setCartOpen(false);
        document.body.style.overflow = "scroll"
    };
    
    const emptyCart = () => {
        localStorage.removeItem(STORAGE_PRODUCTS_CART);
        getProductsCart();
    }

    const increaseQty = (id) => {
        const arrayItemsCart = productsCart
        arrayItemsCart.push(id);
        localStorage.setItem(STORAGE_PRODUCTS_CART, arrayItemsCart)
        getProductsCart();
    }

    const decreaseQty = (id) =>{
        const arrayItemsCart = productsCart
        const result = removeItemArray(arrayItemsCart, id.toString())
        localStorage.setItem(STORAGE_PRODUCTS_CART, result)
        getProductsCart()
    }

    return (
        <>
        <Button variant="link" className="cart">
            {productsCart.length > 0 ? (
                <CartFull onClick={openCart}/>
            ) : (
                <CartEmpty onClick={openCart}/>
            )}
            
        </Button>
        <div className="cart-content" style={{width: widthCartContent}}>
            <CartContentHeader closeCart={closeCart} emptyCart={emptyCart}/>
            <div className = "cart-content__products">
            {sigleProductsCart.map((idProductsCart, index)=>(
                <CartContentProducts 
                key={index} 
                products={products} 
                idsProductsCart={productsCart} 
                idProductCart={idProductsCart}
                increaseQty ={increaseQty}
                decreaseQty = {decreaseQty}
                />
            ))}
            </div>
            <CartContentFooter cartTotalPrice={cartTotalPrice}/>
        </div>
        </> 
    ); 
};



function CartContentHeader(props){
    const {closeCart, emptyCart} = props;

    return(
        <div className="cart-content__header">
            <div>
                <Close onClick={closeCart}/>
                <h2>Carrito</h2>
            </div>

            <Button variant="link" onClick={emptyCart}>
                Vaciar carrito 
                <Garbage/>
            </Button>

        </div>
    )
}

function CartContentProducts(props){
    const {products:{loading, result}, 
    idsProductsCart, 
    idProductCart,
    increaseQty,
    decreaseQty} = props
  
    if(!loading && result){
        return result.map((product, index)=>{
            if(idProductCart == product.id){
                const qty = countDuplicatesItemArray(product.id, idsProductsCart);
                return(
                    <RenderProduct
                    key={index}
                    product={product}
                    qty={qty}
                    increaseQty={increaseQty}
                    decreaseQty = {decreaseQty}
                    />
                )
            }
        })

    }
    return null;
};

function RenderProduct(props){

    const {product, qty, increaseQty, decreaseQty} = props
    return (
        <div className="cart-content__product">
            <img src={`${BASE_PATH}/${product.image}`} alt={product.name}/>
            <div className="cart-content__product-info">
                <div>
                    <h3>{product.name.substr(0, 25)}</h3>
                    <p>${product.price.toFixed(2)}</p>
                </div>
                <div>
                    <p>
                        En carro: {qty}
                        <button onClick={() => increaseQty(product.id)}>+</button>
                        <button onClick={()=> decreaseQty(product.id)}>-</button>
                    </p>
                </div>
            </div>

        </div>
    )
}

function CartContentFooter(props){
    const {cartTotalPrice} = props

    return(
        <div className="cart-content__footer">
            <div>
                <p>Total: </p>
                <p>{cartTotalPrice.toFixed(2)}</p>
            </div>
            <Button>Pedir</Button>
        </div>
    )
}