import React, {useState, useEffect}from "react";
import { Button } from "react-bootstrap"; 
import { ReactComponent as CartEmpty } from "../../assets/svg/cart-empty.svg";
import { ReactComponent as CartFull} from "../../assets/svg/cart-full.svg";
import { ReactComponent as Close} from "../../assets/svg/close.svg";
import { ReactComponent as Garbage} from "../../assets/svg/garbage.svg"
import {STORAGE_PRODUCTS_CART, BASE_PATH} from "../../utils/constants"
import {countDuplicatesItemArray, removeArrayDuplicates} from "../../utils/arrayFunct"
import './Cart.scss';

export default function Cart(props){

    const {productsCart, getProductsCart, products} = props

    const [cartOpen, setCartOpen] = useState(false);
    const widthCartContent = cartOpen ? 400 : 0;
    
    const [sigleProductsCart, setSingleProductsCart] = useState([])
    useEffect(()=>{
        const allProductsId = removeArrayDuplicates(productsCart)
        setSingleProductsCart(allProductsId)
    }, [productsCart])

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
                />
            ))}
            </div>
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
    idProductCart} = props
  
    if(!loading && result){
        return result.map((product, index)=>{
            console.log("asdasdasd",product.id, idsProductsCart)
            if(idProductCart == product.id){
                const qty = countDuplicatesItemArray(product.id, idsProductsCart);
                return(
                    <RenderProduct
                    key={index}
                    product={product}
                    qty={qty}
                    />
                )
            }
        })

    }
    return null;
};

function RenderProduct(props){

    const {product, qty} = props
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
                        <button>+</button>
                        <button>-</button>
                    </p>
                </div>
            </div>

        </div>
    )
}