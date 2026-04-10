import React from 'react';
import { Navbar as BootstrapNavbar, Container, Nav, Badge, Button } from 'react-bootstrap'; 
import { useNavigate, Link, useLocation } from 'react-router-dom'; 
import { useAuth } from '../contexts/AuthContext'; 
import { useSelector } from 'react-redux'; 
import './Navbar.css'; 

const NavbarComponent = () => {
    const navigate = useNavigate();
    const location = useLocation(); 

    const { isAuthenticated, user, logout } = useAuth(); 
    const cartItems = useSelector((state) => state.cart); 
    const cartCount = cartItems.length;
    const isCartPage = location.pathname === '/cart';

    const handleLogout = () => {
        logout(); 
        localStorage.removeItem('userId'); // 로그아웃 시 ID 삭제
        navigate('/'); 
    };

    return (
        <BootstrapNavbar bg="white" variant="light" expand="xl" className="custom-navbar-shadow sticky-top py-2">
            <Container fluid="lg">
                <BootstrapNavbar.Brand as={Link} to="/" className="brand-style d-flex align-items-center me-4">
                    <span className="brand-icon me-2">🍎</span> 
                    <span className="brand-text fw-bold">과일농장</span>
                </BootstrapNavbar.Brand>
                
                <BootstrapNavbar.Toggle aria-controls="responsive-navbar-nav" />
                
                <BootstrapNavbar.Collapse id="responsive-navbar-nav">
                    {/* 중앙 메뉴 섹션 */}
                    <Nav className="mx-auto nav-links-center">
                        <Nav.Link as={Link} to='/' className="nav-item-custom">🏠 홈</Nav.Link>
                        <Nav.Link as={Link} to='/about' className="nav-item-custom">🏢 회사소개</Nav.Link>
                        <Nav.Link as={Link} to="/board" className="nav-item-custom">📝 게시판</Nav.Link>
                        <Nav.Link as={Link} to="/imgmap" className="nav-item-custom">🗺️ 특산품 지도</Nav.Link>
                        <Nav.Link as={Link} to="/order-history" className="nav-item-custom">🚚 배송조회</Nav.Link>
                        
                        {/* ⭐ 상세정보 메뉴 추가: 로그인 시에만 보임 */}
                        {isAuthenticated && (
                            <Nav.Link as={Link} to="/mypage" className="nav-item-custom" style={{ color: '#007bff' }}>
                                👤 상세정보
                            </Nav.Link>
                        )}

                        {isAuthenticated && (
                            <Nav.Link as={Link} to="/add" className="nav-item-custom" style={{ color: '#2ecc71', fontWeight: 'bold' }}>
                                🎁 상품 등록
                            </Nav.Link>
                        )}
                    </Nav>
                    
                    {/* 우측 액션 섹션 */}
                    <Nav className="align-items-center nav-actions-right">
                        <Nav.Link as={Link} to='/cart' className="nav-item-custom cart-link me-3">
                            🛒 장바구니
                            {cartCount > 0 && !isCartPage && ( 
                                <Badge bg="danger" pill className="ms-1 cart-badge">{cartCount}</Badge>
                            )}
                        </Nav.Link>
                        
                        {isAuthenticated ? (
                            <div className="d-flex align-items-center auth-container">
                                <span className="user-name-tag me-3 fw-bold" style={{ cursor: 'pointer' }} onClick={() => navigate('/mypage')}>
                                    {user?.name || '회원'}님
                                </span>
                                <Button variant="outline-danger" size="sm" className="action-btn" onClick={handleLogout}>로그아웃</Button>
                            </div>
                        ) : (
                            <div className="d-flex align-items-center auth-container gap-2">
                                <Button as={Link} to='/login' variant="outline-primary" size="sm" className="action-btn">로그인</Button>
                                <Button as={Link} to='/register' variant="primary" size="sm" className="action-btn">회원가입</Button>
                            </div>
                        )}
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
};

export default NavbarComponent;