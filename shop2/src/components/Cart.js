import React from 'react';
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCount, decreaseCount, deleteItem, sortName, setCheckout } from "../store.js"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext'; 
import './Cart.css'; 

function Cart() {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const { cart } = useSelector((state) => state); 
    const { user } = useAuth(); 
    const userName = user?.name || '고객'; 

    const totalSum = cart.reduce((total, item) => total + (Number(item.price) * item.count), 0);

    return (
        <div className="container cart-container">
            <div className="cart-header-text text-center">
                <h2 className="cart-title">🛒 장바구니</h2>
                <p className="user-cart-info">신선함이 가득 담긴 {userName}님의 장바구니입니다.</p>
            </div>
            
            <div className="cart-card-layout">
                <Table responsive className="cart-table">
                    <thead>
                        <tr className="text-center">
                           
                            <th>상품명</th>
                            <th>수량</th>
                            <th>금액</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, i) => (
                            <tr key={i} className="text-center align-middle">
                               
                                <td className="product-name-td">{item.name}</td>
                                <td>
                                    <div className="qty-wrapper d-flex justify-content-center align-items-center">
                                        <button onClick={() => dispatch(decreaseCount(item.id))} className="qty-minimal-btn">-</button>
                                        <span className="qty-num mx-3">{item.count}</span>
                                        <button onClick={() => dispatch(addCount(item.id))} className="qty-minimal-btn">+</button>
                                    </div>
                                </td>
                                <td className="fw-bold">{(Number(item.price) * item.count).toLocaleString()}원</td>
                                <td>
                                    <button onClick={() => dispatch(deleteItem(item.id))} className="remove-btn">삭제</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {cart.length === 0 && (
                    <div className="text-center py-5 text-muted">장바구니가 비어있습니다.</div>
                )}
            </div>

            <div className="cart-footer">
                <div className="row align-items-center">
                    <div className="col-md-6 mb-3 mb-md-0">
                        <button className="btn-sort-minimal" onClick={() => dispatch(sortName())}>이름순 정렬</button>
                    </div>
                    <div className="col-md-6">
                        <div className="total-sum-box text-end">
                            <div className="total-label">예상 결제 합계</div>
                            <div className="total-price-value">{totalSum.toLocaleString()}원</div>
                            <Button 
                                className="btn-checkout-trendy mt-4" 
                                onClick={() => { 
                                    if (cart.length === 0) return alert('장바구니가 비어있습니다.');
                                    dispatch(setCheckout(cart)); 
                                    navigate('/checkout'); 
                                }}
                            >
                                주문하기
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;