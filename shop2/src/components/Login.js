import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'; 
import './Login.css'; 

function Login() {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    setError(''); 

    try {
      const response = await axios.post('/api/login', { username, password });
      
      // 서버에서 { id, name } 응답을 주면 AuthContext의 login 함수로 전달
      if (response.data.id) {
        // AuthContext의 login 함수를 호출하여 전역 상태 업데이트
        login(response.data); 
        // 상세정보 조회를 위해 localStorage에도 id 저장 
        localStorage.setItem('userId', response.data.id);
        
        navigate('/'); 
      }
    } catch (err) {
      setError(err.response?.data.message || '로그인에 실패했습니다.');
    }
  };

  return (
    <div className="login-full-bg">
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Card className="login-card-custom shadow-lg">
          <Card.Body className="p-5">
            <div className="text-center mb-5">
              <h2 className="login-title">REEMIN FARM</h2>
              <p className="login-subtitle">반가워요! 로그인이 필요합니다.</p>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold text-secondary">아이디</Form.Label>
                <Form.Control
                  className="login-input-lg"
                  type="text" 
                  placeholder="ID"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label className="fw-bold text-secondary">비밀번호</Form.Label>
                <Form.Control
                  className="login-input-lg"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button type="submit" className="login-btn-green w-100 py-3 mb-3">
                로그인
              </Button>
            </Form>

            <div className="text-center mt-4">
              <button 
                className="btn btn-link text-muted small text-decoration-none me-3"
                onClick={() => navigate('/find-account')}
              >
                아이디/비밀번호 찾기
              </button>
              <button 
                className="btn btn-link text-success fw-bold text-decoration-none"
                onClick={() => navigate('/register')}
              >
                회원가입
              </button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Login;