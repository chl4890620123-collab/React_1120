import { useParams, useNavigate } from "react-router-dom"; 
import { Button } from 'react-bootstrap'; 
import { useState } from 'react';
import { addItem, setCheckout, deleteProduct } from '../store.js'; 
import { useDispatch } from 'react-redux';
import { useAuth } from "../contexts/AuthContext"; 
import './Detail.css'; 

function Detail(props) {
    let navigate = useNavigate();
    let {paramId} = useParams();
    let [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch(); 
    const { user, isAuthenticated } = useAuth(); 

    // ID 비교 (타입이 다를 수 있으므로 == 사용)
    let selproduct = props.fruit.find((x) => x.id == paramId);
    
    if (!selproduct) return <div className="container mt-5">상품이 없습니다.</div>;

    const { id, title, content, price, author } = selproduct;

    // 이미지 경로 처리
    const rawImg = selproduct.imgUrl || selproduct.imgurl;
    let imageSrc = "";
    if (rawImg) {
        if (rawImg.startsWith('data:')) {
            imageSrc = rawImg;
        } else {
            const needsImgPath = !rawImg.startsWith('img/');
            imageSrc = process.env.PUBLIC_URL + (needsImgPath ? "/img/" : "/") + rawImg;
        }
    } else {
        imageSrc = process.env.PUBLIC_URL + "/img/fruit1.jpg";
    }

    const handleImmediateBuy = () => {
        dispatch(setCheckout([{ id, name: title, price: price, count: quantity }]));
        navigate('/checkout');
    };

    // 실제 삭제 함수
    const handleDelete = () => {
        if (window.confirm("이 상품을 정말 삭제하시겠습니까?")) {
            // 1. Redux 삭제
            dispatch(deleteProduct(id));
            // 2. App.js State 삭제
            if (props.setFruit) {
                props.setFruit(props.fruit.filter(item => item.id !== id));
                alert("삭제되었습니다.");
                navigate('/');
            }
        }
    };

    return (
        <div className="container detail-page-container">
            <div className="detail-main-section"> 
                <div className="detail-image-area" style={{ width: '50%', flex: '0 0 50%' }}>
                    <img 
                        src={imageSrc} 
                        alt={title} 
                        className="product-main-img" 
                        onError={(e) => { e.target.src = process.env.PUBLIC_URL + "/img/fruit1.jpg"; }}
                    />
                </div>
                <div className="detail-info-area" style={{ width: '50%', flex: '0 0 50%' }}>
                    <div className="info-card product-header">
                        <h1 className="product-title">{title}</h1>
                        <p className="product-content">{content}</p>
                    </div>
                    <div className="info-card price-section">
                        <p className="product-price">₩ {price ? price.toLocaleString() : 0}</p>
                    </div>
                    <div className="action-local-area">
                        <input 
                            type="number" 
                            min="1" 
                            value={quantity} 
                            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} 
                            className="form-control mb-3" 
                        />
                        <div className="button-group d-flex gap-2"> 
                            <Button variant="outline-primary" onClick={() => {
                                dispatch(addItem({ id, imgurl: rawImg, name: title, count: quantity, price }));
                                alert('장바구니 추가!');
                            }}>🛒 장바구니</Button>
                            <Button variant="primary" onClick={handleImmediateBuy}>바로 구매하기</Button>
                            
                            {/* 본인 상품일 때만 삭제 버튼 노출 */}
                            {isAuthenticated && (author === user.name || user.name === 'admin') && (
                                <Button variant="danger" onClick={handleDelete}>삭제하기</Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;