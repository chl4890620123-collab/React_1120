import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]); 

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            try {
                setCart(JSON.parse(storedCart));
            } catch (e) {
                console.error("Failed to parse cart from localStorage", e);
                setCart([]);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const cartCount = useMemo(() => {
        return Array.isArray(cart) ? cart.length : 0;
    }, [cart]);
    
    const updateCart = (newCartArray) => {
        setCart(newCartArray);
    };

    // ⭐ 추가: 장바구니 초기화 함수
    const clearCart = () => {
        setCart([]);
    };

    const value = {
        cart,
        cartCount,
        updateCart,
        clearCart, // 추가됨
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};