import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addNewProduct } from '../store.js';
import { useAuth } from "../contexts/AuthContext"; // ⭐ 작성자 정보를 가져오기 위해 추가

function AddProduct({ fruit, setFruit }) {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const { user } = useAuth(); // ⭐ 현재 로그인한 유저 정보 가져오기

    let [title, setTitle] = useState('');
    let [content, setContent] = useState('');
    let [price, setPrice] = useState('');
    let [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => { setImagePreview(reader.result); };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !price || !imagePreview) return alert('사진을 포함한 모든 정보를 입력해주세요!');

        // ⭐ 중요: Detail.js와 Products.js에서 사용하는 변수명과 일치시켜야 함
        const newFruit = {
            id: Date.now(),
            title: title,
            content: content,
            price: Number(price),
            imgUrl: imagePreview, // 변수명을 imgUrl로 사용 (대문자 U)
            author: user.name,    // ⭐ 등록자 이름을 반드시 저장해야 삭제 버튼이 나옴!
            count: 1
        };

        dispatch(addNewProduct(newFruit));
        setFruit([newFruit, ...fruit]);
        alert('신규 상품이 등록되었습니다!');
        navigate('/');
    };

    return (
        <Container className="py-5" style={{ marginTop: '50px' }}>
            <Card className="border-0 shadow-lg p-4 p-md-5" style={{ borderRadius: '30px' }}>
                <h2 className="text-center fw-bold mb-5" style={{ color: '#2ecc71' }}>🎁 상품 등록</h2>
                <Form onSubmit={handleSubmit}>
                    <Row className="align-items-center">
                        <Col md={5} className="text-center mb-4 mb-md-0">
                            <div className="mb-3" style={{ width:'100%', aspectRatio:'1/1', background:'#f1f3f5', borderRadius:'20px', display:'flex', alignItems:'center', justifyContent:'center', border:'2px dashed #adb5bd', overflow:'hidden' }}>
                                {imagePreview ? <img src={imagePreview} style={{ width:'100%', height:'100%', objectFit:'cover' }} alt="미리보기" /> : <span className="text-muted">사진을 업로드하세요</span>}
                            </div>
                            <Form.Label className="btn btn-outline-success w-100 rounded-pill fw-bold">
                                내 PC에서 사진 찾기 <Form.Control type="file" accept="image/*" hidden onChange={handleImageChange} />
                            </Form.Label>
                        </Col>
                        <Col md={7}>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">상품명</Form.Label>
                                <Form.Control placeholder="과일 이름을 입력하세요" onChange={e => setTitle(e.target.value)} style={{ borderRadius:'12px', padding:'12px' }} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold">판매 가격</Form.Label>
                                <Form.Control type="number" placeholder="단가 입력" onChange={e => setPrice(e.target.value)} style={{ borderRadius:'12px', padding:'12px' }} />
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label className="fw-bold">상품 설명</Form.Label>
                                <Form.Control as="textarea" rows={4} placeholder="상품의 특징을 적어주세요" onChange={e => setContent(e.target.value)} style={{ borderRadius:'12px' }} />
                            </Form.Group>
                            <Button type="submit" style={{ background:'#2ecc71', border:'none', width:'100%', padding:'15px', borderRadius:'50px', fontWeight:'800', fontSize:'1.1rem' }}>
                                과일농장 상품 등록하기
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
}

export default AddProduct;