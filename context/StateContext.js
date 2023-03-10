import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import product from 'sanity_capelec/schemas/product';

const Context = createContext();

// States are shared using that great context. Qty locally changes.
export const StateContext = ({ children }) => {

    const [qty,             setQty]             = useState(1);
    const [cartItems,       setCartItems]       = useState([]);
    const [totalPrice,      setTotalPrice]      = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [showCart,        setShowCart]        = useState(false);

    let foundProduct;
    let index;


    const onAdd = (product, quantity) => {
        // Si le produit figure déjà dans notre panier.
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if(checkProductInCart) {

            const updateCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updateCartItems);
            
        } else {
            // Si le produit ne figure pas dans notre panier.
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }]);
        }

        toast.success(`${qty} ${product.name} added into the basket.`);
    }

    const onRemove = (product) => {

        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    const toggleCartItemQuantity = (id, value) => {

         foundProduct = cartItems.find((item) => item._id === id);
         index = cartItems.findIndex((product) => product._id === id);
         const newCartItems = cartItems.filter((item) => item._id !== id);

         if(value === "inc") {

            newCartItems.splice(index, 0, { ...foundProduct, quantity: foundProduct.quantity + 1} );
            setCartItems([...newCartItems ]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)

         } else if(value === "dec") {

            if(foundProduct.quantity > 1) {

                newCartItems.splice(index, 0, { ...foundProduct, quantity: foundProduct.quantity - 1} );
                setCartItems([...newCartItems ]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)    

            }
         }
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decQty = () => {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) return 1;
            return prevQty - 1
        });
    }

    return(
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                setCartItems,
                totalPrice,
                setTotalPrice,
                totalQuantities,
                setTotalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                onRemove,
                toggleCartItemQuantity
            }}
        >
            { children }
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);