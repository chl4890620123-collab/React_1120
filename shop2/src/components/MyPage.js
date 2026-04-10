import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 
import './Login.css';

function MyPage() {
  const navigate = useNavigate();
  const { logout } = useAuth(); 
  const [userData, setUserData] = useState({ id: '', username: '', name: '', phone: '' });
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }
    // 페이지 접속 시 서버에서 내 정보를 가져옴
    axios.get(`/api/user/${userId}`)
      .then(res => {
        setUserData(res.data);
        setMessage({ type: '', text: '' });
      })
      .catch(() => {
        setMessage({ type: 'danger', text: '사용자 정보를 불러올 수 없습니다. 다시 로그인해 주세요.' });
      });
  }, [userId, navigate]);
// 회원정보수정
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/user/update', {
        id: userId,
        username: userData.username,
        name: userData.name,
        password: newPassword
      });
      if (response.data.success) {
        setMessage({ type: 'success', text: '회원 정보가 성공적으로 변경되었습니다! 🌿' });
        setNewPassword('');
      }
    } catch (err) {
      setMessage({ type: 'danger', text: '수정 중 오류가 발생했습니다.' });
    }
  };
//삭제
  const handleWithdraw = async () => {
    if (window.confirm("정말로 탈퇴하시겠습니까? 데이터는 복구할 수 없습니다.")) {
      try {
        const res = await axios.delete(`/api/user/withdraw/${userId}`);
        if (res.data.success) {
          alert("그동안 이용해주셔서 감사합니다.");
          localStorage.clear();
          if (logout) logout();
          navigate('/');
        }
      } catch (err) {
        alert("탈퇴 처리 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="login-full-bg">
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', padding: '50px 0' }}>
        <Card className="login-card-custom shadow-lg border-0" style={{ width: '480px', borderRadius: '30px' }}>
          <Card.Body className="p-5">
            <div className="text-center mb-5">
              <h2 className="login-title" style={{ color: '#2ecc71', fontWeight: '800' }}>MY PROFILE</h2>
              <p className="login-subtitle text-muted">내 소중한 정보를 관리하세요</p>
              <div style={{ width: '50px', height: '4px', background: '#2ecc71', margin: '15px auto', borderRadius: '2px' }}></div>
            </div>

            {message.text && <Alert variant={message.type} className="rounded-4 text-center mb-4">{message.text}</Alert>}

            <Form onSubmit={handleUpdate}>
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold text-secondary ms-1 small">아이디</Form.Label>
                <Form.Control 
                  className="login-input-lg shadow-sm" 
                  style={{ borderRadius: '15px' }}
                  value={userData.username} 
                  onChange={(e) => setUserData({...userData, username: e.target.value})}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold text-secondary ms-1 small">이름</Form.Label>
                <Form.Control 
                  className="login-input-lg shadow-sm" 
                  style={{ borderRadius: '15px' }}
                  value={userData.name} 
                  onChange={(e) => setUserData({...userData, name: e.target.value})}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold text-secondary ms-1 small">새 비밀번호 (변경시에만 입력)</Form.Label>
                <Form.Control 
                  type="password"
                  className="login-input-lg shadow-sm" 
                  style={{ borderRadius: '15px' }}
                  placeholder="새로운 비밀번호"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label className="fw-bold text-secondary ms-1 small">연락처 (수정 불가)</Form.Label>
                <Form.Control className="login-input-lg bg-light border-0 text-muted" style={{ borderRadius: '15px' }} value={userData.phone} readOnly />
              </Form.Group>

              <Button type="submit" className="login-btn-green w-100 py-3 fw-bold shadow mb-4" style={{ borderRadius: '15px', border: 'none' }}>
                수정 완료
              </Button>
            </Form>

            <div className="text-center mt-3">
              <button onClick={handleWithdraw} className="btn btn-link text-danger small text-decoration-none fw-bold">
                회원 탈퇴하기
              </button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default MyPage;