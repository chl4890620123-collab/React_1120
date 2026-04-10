import React, { useState } from 'react';
import { Container } from 'react-bootstrap'; // 사용하지 않는 Button, Row, Col 제거
import './About.css';

const About = () => {
    const [currentTab, setCurrentTab] = useState('intro'); 
    const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.221594951163!2d127.1265691!3d37.5381014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca4e421e42f1f%3A0xc6c78a0f9689e472!2z7IScontent7Jq47Yq567OE7IucIOqwleuPmeq1rCDstZztuLjshLjroZwxNTfquLggMTQ!5e0!3m2!1sko!2skr!4v1710000000000!5m2!1sko!2skr"; 

    const handleTabChange = (tab) => {
        setCurrentTab(tab);
    };

    const CompanyIntroduction = () => (
        <div className="about-content-card fade-in">
            <h4 className="content-title">🍎 신선한 과일농장 이야기</h4>
            <p className="content-text">
                저희 <strong>[과일농장]</strong>은 매일 아침 해가 뜰 때 수확한 과일이 가장 신선하고 <br/>
                달콤한 과일만을 엄선하여 고객님께 배송하고 있습니다. 
            </p>
            <p className="content-text">
                깔끔한 포장과 달콤한 맛으로 기본에 충실하게 키웠습니다. <br/>
                저희 과일농장을 사랑해주셔서 감사합니다.
            </p>
            <div className="quote-box">
                "고객님의 식탁에 건강과 행복을 올리는 것이 저희의 목표입니다."
            </div>
            <div className="value-icons">
                <div className="v-icon-item"><span>🍎</span> 품질 보증제</div>
                <div className="v-icon-item"><span>🍉</span> 당일 수확 원칙</div>
                <div className="v-icon-item"><span>🍌</span> 친환경 농법</div>
            </div>
            <div className="contact-info">전화 문의 <span className="phone">02-222-2222</span></div>
        </div>
    );

    const MapView = () => (
        <div className="about-content-card fade-in">
            <h4 className="content-title">📍 과일농장 오시는 길</h4>
            <div className="map-responsive">
                <iframe 
                    src={mapSrc} 
                    title="Google Map Location"
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ border: 0, width: '100%', height: '400px', borderRadius: '20px' }}
                ></iframe>
            </div>
            <p className="address-text mt-3 text-center fw-bold">
                서울특별시 강동구 천호대로157길 14 8층 802호
            </p>
        </div>
    );

    return (
        <div className="about-page-wrapper">
            <div className="about-header-banner">
                <div className="banner-overlay">
                    <h2 className="banner-title">🍎 과일농장</h2>
                    <p className="banner-desc">과일농장이 전하는 가장 달콤한 진심</p>
                </div>
            </div>

            <Container className="about-container-main">
                <div className="tab-button-group">
                    <button 
                        className={`custom-tab-btn ${currentTab === 'intro' ? 'active' : ''}`}
                        onClick={() => handleTabChange('intro')}
                    >
                        회사 소개
                    </button>
                    <button 
                        className={`custom-tab-btn ${currentTab === 'map' ? 'active' : ''}`}
                        onClick={() => handleTabChange('map')}
                    >
                        오시는 길
                    </button>
                </div>

                <div className="tab-content-area">
                    {currentTab === 'intro' && <CompanyIntroduction />}
                    {currentTab === 'map' && <MapView />}
                </div>
            </Container>
        </div>
    );
};

export default About;