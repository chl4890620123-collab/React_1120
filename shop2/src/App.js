import { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from "./db/fruit";

import Slider from "./components/Slider"; 
import Products from "./components/Products"; 
import Detail from "./components/Detail"; 
import NotFound from "./components/NotFound"; 
import About from "./components/About"; 
import Member from "./components/Member"; 
import Location from "./components/Location"; 
import Title from "./components/Title"; 
import Footer from "./components/Footer"; 
import ImgMap from "./components/Imgmap";
import NavbarComponent from './components/Navbar'; 
import Cart from "./components/Cart"; 
import Board from "./components/Board"; 
import Login from "./components/Login"; 
import Register from "./components/Register"; 
import ResetPassword from "./components/ResetPassword"; 
import FindAccount from "./components/FindAccount"; 
import MyPage from "./components/MyPage"; // ✅ 추가: 회원 상세정보 수정 페이지
import Checkout from "./pages/Checkout"; 
import OrderHistory from "./pages/OrderHistory"; 
import AddProduct from "./pages/AddProduct"; 

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CartProvider } from './contexts/CartContext'; 

function App() {
  const [fruit, setFruit] = useState(data); 
  let [input, setInput] = useState(""); 

  const sortByName = () => {
    let sortedFruit = [...fruit].sort((a, b) => (a.title > b.title ? 1 : -1));
    setFruit(sortedFruit);
  };

  const sortByPriceLowToHigh = () => {
    let sortedFruit = [...fruit].sort((a, b) => a.price - b.price);
    setFruit(sortedFruit); 
  };

  const sortByPriceHighToLow = () => {
    let sortedFruit = [...fruit].sort((a, b) => b.price - a.price);
    setFruit(sortedFruit); 
  };

  return (
    <AuthProvider> 
      <CartProvider>
        <div className="App">
          <NavbarComponent /> 
          <Routes>
            <Route path="/" element={
                <>
                    <Slider /> 
                    <Title className="clearfix" /> 
                    <div className="container mt-4 mb-4">
                        <div className="row align-items-center">
                            <div className="col-md-6" style={{textAlign:"left"}}>
                                <input
                                    placeholder="상품명을 입력하세요"
                                    onChange={(e) => setInput(e.target.value)}
                                    value={input}
                                    className="form-control"
                                    style={{ width:"250px", display: "inline-block" }}
                                />
                            </div>
                            <div className="col-md-6" style={{textAlign:"right"}}>
                                <select 
                                    onChange={(e) => {
                                        if (e.target.value === "low") sortByPriceLowToHigh();
                                        if (e.target.value === "high") sortByPriceHighToLow();
                                        if (e.target.value === "name") sortByName();
                                    }}
                                    className="form-select"
                                    style={{ width:"150px", display: "inline-block" }}
                                >
                                    <option value="">정렬 선택</option>
                                    <option value="low">낮은 가격순</option>
                                    <option value="high">높은 가격순</option>
                                    <option value="name">이름순</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="container" style={{ marginTop: "30px" }}>
                        <div className="row">
                            {fruit
                                .filter((item) => item.title.toLowerCase().includes(input.toLowerCase()))
                                .map((f) => ( 
                                    <Products {...f} key={f.id} fruit={fruit} setFruit={setFruit} /> 
                                ))}
                        </div>
                    </div>
                    <Footer />
                </>
            } />
            <Route path="/fruit/detail/:paramId" element={<Detail fruit={fruit} setFruit={setFruit} />} />
            <Route path="/detail/:paramId" element={<Detail fruit={fruit} setFruit={setFruit} />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/fruit/order-history" element={<OrderHistory />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/add" element={<AddProductWrapper fruit={fruit} setFruit={setFruit} />} />
            <Route path="/imgmap" element={<ImgMap />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/find-account" element={<FindAccount />} />
            <Route path="/mypage" element={<MyPage />} /> {/* ✅ 추가: 아이디/이름/비밀번호 변경 창 */}
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/board" element={<Board />} />
            <Route path="/about" element={<About />}>
              <Route path="member" element={<Member />} />
              <Route path="location" element={<Location />} />
            </Route>
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

function AddProductWrapper({ fruit, setFruit }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AddProduct fruit={fruit} setFruit={setFruit} /> : <Navigate to="/login" />;
}

export default App;