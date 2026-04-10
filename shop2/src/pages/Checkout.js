import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// ✅ 장바구니 비우기 로직을 위해 Context 추가
import { useCart } from '../contexts/CartContext'; 
import './Checkout.css'; 

function Checkout() {
    let navigate = useNavigate();
    // ✅ Context에서 비우기 함수 가져오기
    const { updateCart } = useCart(); 
    
    let checkoutItem = useSelector((state) => state.checkoutItem || state.checkout || []);
    
    const [receiver, setReceiver] = useState('');
    const [address, setAddress] = useState('');

    const finalTotalPrice = checkoutItem.reduce((total, item) => total + (Number(item.price) * item.count), 0);

    const handlePayment = () => {
        if (!receiver || !address) {
            alert("배송지 정보를 모두 입력해주세요!");
            return;
        }

        const saved = localStorage.getItem('fruit_orders');
        let orderList = saved ? JSON.parse(saved) : [];

        const newOrders = checkoutItem.map(item => ({
            id: Date.now() + Math.random(),
            title: item.name,
            price: item.price * item.count,
            address: `[${receiver}] ${address}`,
            date: new Date().toISOString()
        }));

        localStorage.setItem('fruit_orders', JSON.stringify([...newOrders, ...orderList]));

        // ⭐ 핵심: 결제 완료 시 장바구니 데이터를 빈 배열로 변경
        // 이 함수가 실행되면 LocalStorage의 'cart'도 자동으로 삭제됩니다.
        updateCart([]); 

        alert('주문이 정상적으로 완료되었습니다! 🌿'); 
        navigate('/order-history');
    };

    return (
        <div className="checkout-bg" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '120px 0 80px' }}>
            <div className="container">
                {/* 제목 섹션 */}
                <div className="text-center mb-5">
                    <h2 style={{ fontWeight: '800', color: '#333', fontSize: '2.2rem' }}>주문 및 결제</h2>
                    <div style={{ width: '50px', height: '4px', background: '#2ecc71', margin: '15px auto' }}></div>
                </div>

                <div className="row g-4">
                    <div className="col-lg-8">
                        {/* 1. 배송지 정보 카드 */}
                        <div className="bg-white p-4 p-md-5 mb-4" style={{ borderRadius: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                            <h4 className="mb-4" style={{ fontWeight: '700', color: '#2ecc71' }}>📍 배송지 정보</h4>
                            <Form>
                                <Row>
                                    <Col md={4} className="mb-3">
                                        <Form.Label className="fw-bold small">수령인</Form.Label>
                                        <Form.Control 
                                            style={{ borderRadius: '12px', padding: '12px', border: '1px solid #eee', backgroundColor: '#fafafa' }}
                                            placeholder="성함을 입력하세요" 
                                            onChange={(e) => setReceiver(e.target.value)} 
                                        />
                                    </Col>
                                    <Col md={8} className="mb-3">
                                        <Form.Label className="fw-bold small">배송 주소</Form.Label>
                                        <Form.Control 
                                            style={{ borderRadius: '12px', padding: '12px', border: '1px solid #eee', backgroundColor: '#fafafa' }}
                                            placeholder="상세 주소를 입력하세요 (동, 호수 포함)" 
                                            onChange={(e) => setAddress(e.target.value)} 
                                        />
                                    </Col>
                                </Row>
                            </Form>
                        </div>

                        {/* 2. 주문 상품 내역 카드 */}
                        <div className="bg-white p-4 p-md-5" style={{ borderRadius: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                            <h4 className="mb-4" style={{ fontWeight: '700', color: '#2ecc71' }}>🍎 주문 상품 내역</h4>
                            <Table responsive className="align-middle" style={{ borderTop: '1px solid #f1f1f1' }}>
                                <thead>
                                    <tr style={{ color: '#888', fontSize: '0.9rem' }}>
                                        <th className="py-3">상품 정보</th>
                                        <th className="py-3 text-center">수량</th>
                                        <th className="py-3 text-end">금액</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {checkoutItem.map((item, i) => {
                                        const rawImg = item.imgurl || item.imgUrl;
                                        let imageSrc = rawImg?.startsWith('data:') ? rawImg : process.env.PUBLIC_URL + (rawImg?.startsWith('img/') ? "/" : "/img/") + rawImg;
                                        if (!rawImg) imageSrc = process.env.PUBLIC_URL + "/img/fruit1.jpg";

                                        return (
                                            <tr key={i} style={{ borderBottom: '1px solid #f8f9fa' }}>
                                                <td className="py-3">
                                                    <div style={{ fontWeight: '700', color: '#333' }}>{item.name}</div>
                                                    <div style={{ fontSize: '0.85rem', color: '#999' }}>단가: {item.price?.toLocaleString()}원</div>
                                                </td>
                                                <td className="py-3 text-center fw-bold" style={{ color: '#555' }}>{item.count}개</td>
                                                <td className="py-3 text-end fw-bold" style={{ color: '#333', fontSize: '1.05rem' }}>
                                                    {(item.price * item.count).toLocaleString()}원
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </div>

                    {/* 3. 우측 결제 금액 요약 카드 */}
                    <div className="col-lg-4">
                        <div className="position-sticky" style={{ top: '120px' }}>
                            <div className="bg-white p-4 p-md-5" style={{ borderRadius: '25px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', border: '2px solid #2ecc71' }}>
                                <h4 style={{ fontWeight: '800', marginBottom: '25px', color: '#333' }}>최종 결제 금액</h4>
                                <div className="d-flex justify-content-between mb-3">
                                    <span style={{ color: '#777' }}>총 상품 금액</span>
                                    <span style={{ fontWeight: '600' }}>{finalTotalPrice.toLocaleString()}원</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <span style={{ color: '#777' }}>배송비</span>
                                    <span style={{ color: '#2ecc71', fontWeight: '600' }}>무료배송</span>
                                </div>
                                <hr style={{ margin: '20px 0', borderTop: '1px dashed #ddd' }} />
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <span style={{ fontWeight: '800', fontSize: '1.2rem' }}>총 결제금액</span>
                                    <span style={{ fontSize: '1.8rem', fontWeight: '900', color: '#2ecc71' }}>{finalTotalPrice.toLocaleString()}원</span>
                                </div>
                                <Button 
                                    onClick={handlePayment}
                                    style={{ 
                                        background: '#2ecc71', border: 'none', width: '100%', padding: '16px', 
                                        borderRadius: '15px', fontWeight: '800', fontSize: '1.2rem',
                                        boxShadow: '0 5px 15px rgba(46, 204, 113, 0.3)'
                                    }}
                                >
                                    결제하기
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;