import React, { useEffect, useState } from 'react';
import { Container, Table, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './OrderHistory.css';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem('fruit_orders');
        if (data) setOrders(JSON.parse(data));
    }, []);

    const handleCancelOrder = (id) => {
        if (window.confirm("이 주문을 정말 취소하시겠습니까?")) {
            const updated = orders.filter(o => o.id !== id);
            localStorage.setItem('fruit_orders', JSON.stringify(updated));
            setOrders(updated);
            alert("취소가 완료되었습니다.");
        }
    };

    return (
        <div className="history-bg">
            <Container className="history-container py-5">
                <h2 className="history-main-title">배송 현황 조회</h2>
                <div className="history-card-box mt-5">
                    {orders.length > 0 ? (
                        <Table responsive className="history-dark-table text-white">
                            <thead>
                                <tr className="text-muted">
                                    <th>주문 상품</th>
                                    <th>배송지</th>
                                    <th>결제금액</th>
                                    <th>주문일자</th>
                                    <th>상태</th>
                                    <th>관리</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((o) => (
                                    <tr key={o.id}>
                                        <td className="fw-bold">{o.title}</td>
                                        <td className="addr-text">{o.address}</td>
                                        <td className="neon-text">{o.price?.toLocaleString()}원</td>
                                        <td>{new Date(o.date).toLocaleDateString()}</td>
                                        <td><Badge className="neon-badge">결제완료</Badge></td>
                                        <td>
                                            <Button className="btn-history-cancel" onClick={() => handleCancelOrder(o.id)}>
                                                주문취소
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <div className="empty-history text-center py-5">
                            <p className="text-muted">아직 주문하신 내역이 없습니다.</p>
                        </div>
                    )}
                </div>
                <div className="text-center mt-5">
                    <Button variant="outline-light" className="btn-back-home" onClick={() => navigate('/')}>
                        계속 쇼핑하기
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default OrderHistory;