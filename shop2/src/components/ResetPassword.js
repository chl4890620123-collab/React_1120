import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const [username, setUsername] = useState(''); 
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (username === '') {
      setError('아이디를 입력해주세요.');
      return;
    }
//서버 연결
    try {
      const response = await axios.post('http://localhost:4000/api/reset-password', {
        username: username,
      });

      // 🟢 성공 (성공 메시지 표시)
      setMessage(response.data.message);
      // 아니라면 
    } catch (err) {
      // 🔴 오류
      const errorMessage = err.response 
        ? err.response.data.message 
        : '서버와 통신하는 데 실패했습니다. 서버가 켜져 있는지 확인해주세요.';
      setError(errorMessage);
      console.error('비밀번호 재설정 요청 오류:', err);
    }
  };
// 맞다면 
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card style={{ width: '25rem', padding: '20px' }} className="shadow-lg">
        <Card.Body>
          <h2 className="text-center mb-4">비밀번호 찾기</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}

          <p className="text-center text-muted">
            가입 시 사용한 아이디를 입력하시면, 등록된 이메일로 비밀번호 재설정 링크가 전송됩니다.
          </p>

          <Form onSubmit={handleSubmit}>
            {/* 아이디 입력 필드 */}
            <Form.Group id="username" className="mb-4">
              <Form.Label>아이디</Form.Label>
              <Form.Control
                type="text" 
                placeholder="아이디를 입력하세요"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            {/* 전송 버튼 */}
            <Button variant="warning" type="submit" className="w-100">
              재설정 링크 받기
            </Button>
          </Form>

          <div className="w-100 text-center mt-3">
            <Button 
              variant="link" 
              onClick={() => navigate('/login')} 
              style={{ padding: '0', textDecoration: 'none', color: '#6c757d' }}
            >
              로그인으로 돌아가기
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ResetPassword;