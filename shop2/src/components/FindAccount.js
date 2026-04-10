import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; 

function FindAccount() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [step, setStep] = useState(1); 
  const [foundId, setFoundId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleSendCode = () => {
    if (!phone) return alert("전화번호를 입력해주세요.");
    setIsCodeSent(true);
    alert("테스트 인증번호: 1234");
  };

  const handleVerifyCode = async () => {
    setError('');
    try {
      // 서버로 보낼 때 숫자만 추출해서 보냄
      const purePhone = phone.replace(/[^0-9]/g, "");
      const response = await axios.post('/api/verify-code', { phone: purePhone, code: code });
      
      if (response.data.success) {
        setFoundId(response.data.username); 
        setStep(2); 
      }
    } catch (err) {
      setError(err.response?.data.message || "인증 실패: 다시 확인해 주세요.");
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/reset-password', { username: foundId, newPassword: newPassword });
      if (response.data.success) {
        alert("비밀번호 변경 완료!");
        navigate('/login');
      }
    } catch (err) {
      setError("변경 오류 발생");
    }
  };

  return (
    <div className="login-full-bg">
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Card className="login-card-custom shadow-lg border-0" style={{ width: '450px', borderRadius: '30px' }}>
          <Card.Body className="p-5">
            <h2 className="login-title text-center mb-4">로그인 찾기</h2>
            {error && <Alert variant="danger" className="rounded-4">{error}</Alert>}

            {step === 1 ? (
              <>
                <p className="text-center text-muted small mb-4">본인 확인을 위해 전화번호를 입력하세요.</p>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold px-1">전화번호</Form.Label>
                  <InputGroup>
                    <Form.Control className="login-input-lg" placeholder="01012345678" onChange={(e)=>setPhone(e.target.value)} />
                    <Button variant="success" onClick={handleSendCode} style={{ borderRadius: '0 15px 15px 0' }}>발송</Button>
                  </InputGroup>
                </Form.Group>
                {isCodeSent && (
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold px-1">인증번호</Form.Label>
                    <Form.Control className="login-input-lg" placeholder="1234 입력" onChange={(e)=>setCode(e.target.value)} />
                    <Button className="login-btn-green w-100 mt-4 py-3" onClick={handleVerifyCode}>아이디 확인</Button>
                  </Form.Group>
                )}
              </>
            ) : (
              <>
                <Alert variant="success" className="text-center mb-4 py-4" style={{ borderRadius: '20px' }}>
                  <div className="small text-muted">아이디를 찾았습니다.</div>
                  <div className="fs-3 fw-bold text-success">{foundId}</div>
                </Alert>
                <Form onSubmit={handleResetSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold px-1">새 비밀번호</Form.Label>
                    <Form.Control type="password" placeholder="새 비밀번호 입력" className="login-input-lg" onChange={(e)=>setNewPassword(e.target.value)} required />
                  </Form.Group>
                  <Button type="submit" className="login-btn-green w-100 py-3">비밀번호 변경 완료</Button>
                </Form>
              </>
            )}
            <div className="text-center mt-4">
              <Button variant="link" onClick={() => navigate('/login')} className="text-muted text-decoration-none small">로그인으로 돌아가기</Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default FindAccount;