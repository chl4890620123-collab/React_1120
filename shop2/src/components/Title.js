import React from "react";
import './Title.css'; 

const Title = () => {
    return (
        <div className="container section-title clearfix"> 
            <div className="title-wrapper">
                <p className="sub-title">PREMIUM FRUIT MARKET</p>
                <h2>오늘의 <span>과일</span></h2> 
                <div className="accent-line"></div>
            </div>
        </div>
    );
};
export default Title;