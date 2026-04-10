import React, { useRef, useEffect, useState } from 'react'; 
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ImgMap() {
    const navigate = useNavigate();
    const imageRef = useRef(null); 
    const [imageLoaded, setImageLoaded] = useState(false); 
    const [mapScale, setMapScale] = useState(1); 

    
    const originData = {
        seoul: { title: "서울/경기 (수박)", coords: "150, 50, 420, 200", path: "/fruit/detail/1", shape: "rect" },
        jeju: { title: "제주도 (오렌지)", coords: "250, 560, 430, 620", path: "/fruit/detail/6", shape: "rect" },
        busan: { title: "부산/경남 (사과)", coords: "450, 320, 600, 420", path: "/fruit/detail/3", shape: "rect" },
        melon: { title: "경상북도 (참외)", coords: "480, 180, 580, 320", path: "/fruit/detail/2", shape: "rect" },
        strawberry: { title: "충청남도 (딸기)", coords: "250, 200, 400, 300", path: "/fruit/detail/5", shape: "rect" },
        tomato: { title: "전라북도 (토마토)", coords: "300, 290, 420, 390", path: "/fruit/detail/7", shape: "rect" }
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
        updateMapScale();
    };

    const updateMapScale = () => {
        if (imageRef.current) {
            const currentWidth = imageRef.current.offsetWidth;
            const standardWidth = 900; 
            setMapScale(currentWidth / standardWidth);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', updateMapScale);
        return () => window.removeEventListener('resize', updateMapScale);
    }, []);

    const handleAreaClick = (e, path) => {
        e.preventDefault();
        navigate(path);
    };

   
    const renderOverlays = () => {
        if (!imageLoaded || !imageRef.current) return null;
        
        return Object.entries(originData).map(([key, data]) => {
            const [x1, y1, x2, y2] = data.coords.split(',').map(c => parseFloat(c.trim()));
            
            const scaledX1 = x1 * mapScale;
            const scaledY1 = y1 * mapScale;
            const scaledX2 = x2 * mapScale;
            const scaledY2 = y2 * mapScale;

            return (
                <div
                    key={key}
                    style={{
                        position: 'absolute',
                        top: scaledY1 + 'px',
                        left: scaledX1 + 'px',
                        width: (scaledX2 - scaledX1) + 'px',
                        height: (scaledY2 - scaledY1) + 'px',
                        pointerEvents: 'none', 
                        zIndex: 10,
                    }}
                />
            );
        });
    };

    return (
        <Container className="my-5 py-5">
            <div className="text-center mb-5">
                <h2 className="premium-title" style={{ fontSize: '2.5rem', fontWeight: '800', color: '#2d3436' }}>
                    🗺️ 과일 특산품 지도
                </h2>
                <div style={{ width: '50px', height: '4px', background: '#2ecc71', margin: '20px auto', borderRadius: '10px' }}></div>
                <p className="lead" style={{ color: '#636e72' }}>
                    지도의 지역을 클릭하시면 해당 지역의 <span style={{ color: '#2ecc71', fontWeight: '700' }}>특산품 과일</span> 페이지로 이동합니다.
                </p>
            </div>
            
            <div 
                style={{ 
                    position: 'relative', 
                    display: 'block', 
                    textAlign: 'center',
                    maxWidth: '900px',
                    margin: '0 auto',
                    background: '#ffffff',
                    padding: '20px',
                    borderRadius: '30px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.05)'
                }}
            >
                {renderOverlays()} 
                
                <img 
                    ref={imageRef} 
                    onLoad={handleImageLoad} 
                    src={'https://greenblog.co.kr/wp-content/uploads/2021/07/%ED%81%AC%EA%B8%B0%EB%B3%80%ED%99%98_%EC%9A%B0%EB%A6%AC%EB%82%98%EB%9D%BC-%EC%A7%80%EB%8F%84.jpg'} 
                    alt="대한민국 특산품 지도" 
                    useMap="#koreaMap" 
                    style={{ 
                        width: '100%', 
                        height: 'auto',
                        display: 'block', 
                        borderRadius: '15px'
                    }}
                />
                
                <map name="koreaMap">
                    {Object.entries(originData).map(([key, data]) => (
                        <area 
                            key={key} 
                            shape={data.shape} 
                            coords={data.coords} 
                            alt={data.title} 
                            title={data.title} 
                            href="#" 
                            onClick={(e) => handleAreaClick(e, data.path)}
                            style={{ cursor: 'pointer' }}
                        />
                    ))}
                </map>
            </div>
        </Container>
    );
}

export default ImgMap;