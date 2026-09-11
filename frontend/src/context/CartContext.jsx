import { createContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from '../context/AuthContext'

const CartContext = createContext();

export const CartProvider = ({children}) => {

    const { token } = useAuth()

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [compare, setCompare] = useState([]);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState("success");

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('https://dummyjson.com/products?limit=194');

            setProducts(response.data.products)
        }
        fetchProducts();
    },[]);

    useEffect(() => {

        if (!token) {
            setWishlist([]);
            return;
        }

        const fetchWishlist = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/wishlist`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (response.data.success) {
                    const wishlistIds = response.data.wishlist.map(
                        (item) => item.id
                    );

                    const wishlistProducts = products.filter(
                        (product) => wishlistIds.includes(product.id)
                    );

                    setWishlist(wishlistProducts);
                }
            } catch (error) {
                console.error(
                    "Failed to fetch wishlist:",
                    error
                );

                setWishlist([]);
            }
        };

        fetchWishlist();
    }, [token, products]);

    function showMessage(text, type='success'){
        setMessage(text);
        setMessageType(type);
        
        setTimeout(() =>{
            setMessage('');
        },3000)
    }

    function addToCart(product, quantity = 1) {
        const exists = cart.find(
            (item) => item.id === product.id
        );

        if (exists) {
            setCart((prevCart) =>
                prevCart.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + quantity,
                        }
                        : item
                )
            );

            showMessage(
                `Quantity increased to ${exists.quantity + quantity}`,
                "success"
            );

            return;
        }

        setCart((prevCart) => [
            ...prevCart,
            {
                ...product,
                quantity: quantity,
            },
        ]);

        showMessage(
            quantity > 1
                ? `${quantity} items added to cart`
                : "Product added to cart",
            "success"
        );
    }

    function increaseQuantity(id) {
        setCart((preCart) =>
            preCart.map((item) =>
                item.id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
        );
    }
    
    function decreaseQuantity(id){
        setCart(
            (preCart) =>
                preCart.map((item)=>
                    item.id === id && item.quantity > 1
                    ? { ...item,quantity: item.quantity-1}
                    : item
                )
            
        )
    }

    function removeFromCart(id){
        const product = cart.find((item) => item.id === id)
        setCart((preCart)=>
            preCart.filter((item) => item.id !== id)
        )
        if (product){
            showMessage(
                `${product.title} removed from cart`,
                'danger'
            )
        }
    }

    function clearCart(){
        setCart([])
    }

    async function addToWishlist(product) {
        const exists = wishlist.some(
            (item) => item.id === product.id
        );
        if (exists) {
            showMessage(
                'Product is already in your wishlist',
                'warning    '
            )
            return ;
        }
        if (!token) {
            showMessage(
                "Please login to add products to your wishlist",
                "warning"
            );
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/wishlist`,
                {
                    product_id: product.id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {
                setWishlist((prevWishlist) => {
                    return [...prevWishlist, product];
                });

                showMessage(
                    "Product added to wishlist ❤️",
                    "success"
                );
            }
        } catch (error) {
            console.error(
                "Failed to add product to wishlist:",
                error
            );

            showMessage(
                error.response?.data?.message ||
                    "Failed to add product to wishlist",
                "warning"
            );
        }
        
    }

    async function removeFromWishList(id){
        const product = wishlist.find(
            (item) => item.id === id
        );

        if (!token) {
            showMessage(
                "Please login to manage your wishlist",
                "warning"
            );
            return;
        }

        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/wishlist/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {
                setWishlist((prevWishlist) =>
                    prevWishlist.filter(
                        (item) => item.id !== id
                    )
                );

                if (product) {
                    showMessage(
                        `${product.title} removed from wishlist`,
                        "danger"
                    );
                }
            }
        } catch (error) {
            console.error(
                "Failed to remove product from wishlist:",
                error
            );

            showMessage(
                error.response?.data?.message ||
                    "Failed to remove product from wishlist",
                "warning"
            );
        }
    }

    function addToCompare(product){
        const exists = compare.some((item)=> item.id === product.id)
        if(exists){ 
            showMessage(
                "Product is already added for comparison",
                "warning"
            );
            return;
        }
        if ( compare.length >= 3){
            
            showMessage(
                "You can compare only 3 products",
                "warning"
            );
            return
        }
        if (compare.length >= 3) {
            
            return;
        }
        setCompare(
            (preCompare)=>[...preCompare,product]
        )
        showMessage(
            "Product added for comparison",
            "success"
        );
    }

    function removeFromCompare(id){
        const product = compare.find((item)=>item.id === id)
        setCompare(
            (preCompare) => preCompare.filter((item) => item.id !== id)
        )
        if (product){
            showMessage(
                `${product.title} removed from comparison`,
                'danger'
            )
        }
    }

    return(

        <CartContext.Provider value={{ 
            products, 

            cart, 
            addToCart, 
            increaseQuantity, 
            decreaseQuantity,
            removeFromCart,
            clearCart,

            wishlist,
            addToWishlist, 
            removeFromWishList, 
            compare, 
            addToCompare, 
            removeFromCompare,
            
            message, 
            messageType, 
            showMessage 
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
