import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCheckout, deleteProduct } from "../store.js"; 
import { useAuth } from "../contexts/AuthContext"; 

const Products = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useAuth(); 

    const rawImg = props.imgUrl || props.imgurl;
    let imageSrc = "";
    if (rawImg) {
        if (rawImg.startsWith('data:')) {
            imageSrc = rawImg;
        } else {
            const needsImgPath = !rawImg.startsWith('img/');
            imageSrc = process.env.PUBLIC_URL + (needsImgPath ? "/img/" : "/") + rawImg;
        }
    }

    const handleDelete = (e) => {
        e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
        if(window.confirm("상품을 삭제하시겠습니까?")) {
            dispatch(deleteProduct(props.id));
            if (props.setFruit) {
                props.setFruit(props.fruit.filter(item => item.id !== props.id));
            }
        }
    };

    return (
        <div className="col-md-4 mb-4 position-relative">
            {/* 메인 화면 삭제 버튼 */}
            {isAuthenticated && (props.author === user.name || user.name === 'admin') && (
                <button 
                    onClick={handleDelete}
                    style={{
                        position: 'absolute', right: '25px', top: '15px', zIndex: '10',
                        border: 'none', background: '#e74c3c', color: 'white',
                        borderRadius: '50%', width: '30px', height: '30px', fontWeight: 'bold'
                    }}
                >✕</button>
            )}

            <div className="card h-100 shadow-sm border-0" 
                 onClick={() => navigate(`/detail/${props.id}`)} 
                 style={{ cursor: 'pointer', borderRadius: '20px', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
                    <img src={imageSrc} className="card-img-top" alt={props.title} 
                         style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                         onError={(e) => { e.target.src = process.env.PUBLIC_URL + "/img/fruit1.jpg"; }} />
                </div>
                <div className="card-body text-center">
                    <h5 className="fw-bold">{props.title}</h5>
                    <p className="fw-bold text-success">₩ {props.price?.toLocaleString()}</p>
                    <button className="btn btn-success w-100 fw-bold rounded-pill" onClick={(e) => {
                        e.stopPropagation();
                        dispatch(setCheckout([{ id: props.id, name: props.title, price: props.price, count: 1 }]));
                        navigate('/checkout');
                    }}>즉시 구매</button>
                </div>
            </div>
        </div>
    );
};
export default Products;