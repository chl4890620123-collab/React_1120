// client/src/contexts/CartContext.js

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

// 1. Context 생성
const CartContext = createContext(); 

// 2. Custom Hook 정의 및 내보내기 (Detail, Navbar 등에서 사용)
export const useCart = () => {
    return useContext(CartContext);
};

// 3. Provider 컴포넌트 생성 및 내보내기
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]); 

    // A. 마운트 시 localStorage에서 초기 데이터 로드
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

    // B. cart state 변경 시 localStorage 업데이트
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // C. cartCount 계산 (배지 표시용)
    const cartCount = useMemo(() => {
        return Array.isArray(cart) ? cart.length : 0;
    }, [cart]);
    
    // 장바구니를 업데이트하는 함수 (Detail 컴포넌트에서 호출됨)
    const updateCart = (newCartArray) => {
        setCart(newCartArray);
    };

    const value = {
        cart,
        cartCount,
        updateCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};