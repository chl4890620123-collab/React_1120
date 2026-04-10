// client/src/components/Footer.js 

import React from 'react';
import '../components/Footer.css'; // ⭐ CSS 임포트

const Footer = () => {
    return (
        // ⭐ custom-footer 클래스 적용 ⭐
        <footer className="custom-footer">
            <div className="container">
                <p className="copyright-text">
                    COPYRIGHT(C) 2025 과일농장, Inc. All Rights Reserved
                </p>
            </div>
        </footer>
    );
};
export default Footer;