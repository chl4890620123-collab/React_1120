// client/src/index.js (최종 수정 버전)

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Redux Provider는 최상위에 두는 것이 좋습니다. */}
    <Provider store={store}>
      {/* ⭐ 핵심 수정 사항: basename 추가
          process.env.PUBLIC_URL은 package.json의 homepage에 적힌 '/fruit' 경로를 자동으로 가져옵니다.
      */}
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);