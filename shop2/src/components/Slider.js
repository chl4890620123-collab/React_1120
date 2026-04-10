import React from 'react';
import { Carousel } from 'react-bootstrap'; 
import { Link } from 'react-router-dom'; 
import '../components/Slider.css'; 

const onlineImageUrls = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY_PVR-o0o1qESnoI5k_rDUulv68GQUcGxPNiY9StBSVXZEYzmW1KLQFWjVDsljnxs7708yuubjBWGgs0weB6r4Y1OhKH8CJwXI7UM9-WL&s=10', // 딸기 이미지 
    'https://cdn.mkhealth.co.kr/news/photo/202010/50970_51164_4758.jpg', // 사과 이미지
    'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQCv7Ma7hko-pJqE07iWiV3DmcOHCHpsVGamqnsmtk1GDUeyOyMC8TwmeCBIj8Q0B9Eiw1hjQp5YhvNuEnC1DFBeOCU-cq6Q05f9w-CUOk&usqp=CAc', // 수박 이미지 
];

const detailPaths = [
    '/fruit/detail/5', 
    '/fruit/detail/3', 
    '/fruit/detail/1', 
];

function Slider() {
    
    const captions = [
        { title: 'FRESH & VIBRANT', subtitle: '🍓 달콤한 딸기 특가 행사! 지금 바로 확인하세요.', button: '딸기 보러가기' },
        { title: 'BEST QUALITY', subtitle: '🍎 아삭한 사과 할인 이벤트! 지금 바로 확인하세요.', button: '사과 보러가기' },
        { title: 'SEASON SALE', subtitle: '🍉 시원한 수박 시즌 세일! 지금 바로 확인하세요.', button: '수박 보러가기' },
    ];
    
    return (
       
        <div className="slider-container"> 
            <Carousel 
                interval={4000}
                fade={true} 
                controls={true}
                indicators={true}
            >
                {onlineImageUrls.map((imageUrl, index) => (
                    <Carousel.Item key={index}>
                        
                        <Link to={detailPaths[index]}>
                            <div 
                                className="d-block w-100 carousel-img"
                                style={{ backgroundImage: `url(${imageUrl})` }}
                                aria-label={captions[index].title}
                            >
                            </div>
                        </Link>

                        <Carousel.Caption className="carousel-caption-custom">
                            <h1 className="modern-title">{captions[index].title}</h1>
                            <p className="slider-subtitle">{captions[index].subtitle}</p>
                            <Link to={detailPaths[index]} className="btn btn-lg slider-button mt-3">
                                {captions[index].button}
                            </Link>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default Slider;