// client/src/contexts/AuthContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
// axios는 이 Context 내부에서 사용하지 않으므로 제거

// 1. Context 객체 생성
const AuthContext = createContext();

// 2. Context Provider 컴포넌트 정의
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { name: '이름' } 형태 또는 null
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // 로그인 처리 함수: 서버에서 받은 사용자 이름 저장
    const login = (userData) => {
        setUser({ name: userData.name });
        setIsAuthenticated(true);
        // 로컬 스토리지에 저장 (새로고침 시 상태 유지)
        localStorage.setItem('user', JSON.stringify({ name: userData.name }));
    };

    // 로그아웃  함수
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
    };
    
    // 페이지 상태 복구
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch (e) {
                // 파싱 오류 발생 시 (데이터 손상)
                localStorage.removeItem('user');
            }
        }
    }, []);


    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Context 사용을 위한 커스텀 Hook
export const useAuth = () => {
    return useContext(AuthContext);
};