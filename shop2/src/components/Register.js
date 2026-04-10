import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            return alert("비밀번호가 일치하지 않습니다.");
        }

        try {
            const response = await axios.post('http://localhost:4000/api/register', {
                username: userId,
                password: password,
                name: name,
                phone: phone
            });

            if (response.data.success) {
                alert('회원가입이 완료되었습니다! 로그인해 주세요.');
                navigate('/login');
            }
        } catch (error) {
            alert(error.response?.data?.message || '회원가입에 실패했습니다.');
        }
    };

    return (
        <Container className="register-wrapper">
            <Row className="justify-content-center">
                <Col md={6} lg={5}>
                    <Card className="register-card-styled shadow-sm">
                        <Card.Body className="p-5">
                            <div className="register-header text-center mb-4">
                                <h2 className="fw-bold">🌱 회원가입</h2>
                                <p className="text-muted">프레시 마켓의 회원이 되어보세요!</p>
                            </div>
                            
                            <Form onSubmit={handleRegister}>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold">아이디</Form.Label>
                                    <Form.Control type="text" placeholder="아이디를 입력하세요" 
                                        onChange={(e) => setUserId(e.target.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold">비밀번호</Form.Label>
                                    <Form.Control type="password" placeholder="비밀번호" 
                                        onChange={(e) => setPassword(e.target.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold">비밀번호 확인</Form.Label>
                                    <Form.Control type="password" placeholder="비밀번호 다시 입력" 
                                        onChange={(e) => setConfirmPassword(e.target.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold">이름</Form.Label>
                                    <Form.Control type="text" placeholder="성함" 
                                        onChange={(e) => setName(e.target.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold">전화번호</Form.Label>
                                    <Form.Control type="text" placeholder="010-0000-0000" 
                                        onChange={(e) => setPhone(e.target.value)} required />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100 btn-register-submit py-2 fw-bold">
                                    가입하기
                                </Button>
                            </Form>
                            
                            <div className="mt-4 text-center">
                                <span className="text-muted">이미 회원이신가요? </span>
                                <Button variant="link" onClick={() => navigate('/login')} className="p-0 pb-1 login-link">
                                    로그인하기
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;