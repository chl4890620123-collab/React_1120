const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt'); 
const cors = require('cors'); 

const app = express();
const port = 4000;
const saltRounds = 10; 

app.use(cors()); 
app.use(express.json()); 

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234', 
    database: 'fruit_market'
});

db.connect(err => {
    if (err) console.error('❌ MySQL 연결 실패:', err);
    else console.log('✅ MySQL 연결 성공');
});

// [회원가입] - SQL 타입 에러 방지를 위해 'user' 대신 숫자 1 사용
app.post('/api/register', (req, res) => {
    const { username, password, name, phone } = req.body;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) return res.status(500).json({ message: '비밀번호 암호화 오류' });

        // 현재 DB의 role 컬럼이 INT 타입이므로 숫자 1을 전달합니다.
        // 이렇게 하면 'Incorrect integer value' 에러가 절대 나지 않습니다.
        const sql = "INSERT INTO users (username, password, name, phone, role) VALUES (?, ?, ?, ?, 1)";
        db.query(sql, [username, hash, name, phone], (err, result) => {
            if (err) {
                console.error('SQL 에러 상세:', err);
                return res.status(500).json({ message: '아이디 중복 또는 DB 오류' });
            }
            res.json({ success: true, message: '회원가입 성공!' });
        });
    });
});

// [로그인]
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length > 0) {
            bcrypt.compare(password, results[0].password, (err, isMatch) => {
                if (isMatch) {
                    res.json({ id: results[0].id, name: results[0].name, role: results[0].role });
                } else {
                    res.status(401).json({ message: '비밀번호 불일치' });
                }
            });
        } else {
            res.status(401).json({ message: '아이디 없음' });
        }
    });
});

// [장바구니 추가]
app.post('/api/cart', (req, res) => {
    const { user_id, fruit_id, fruit_name, price, quantity, image_url } = req.body;
    const sql = "INSERT INTO cart (user_id, fruit_id, fruit_name, price, quantity, image_url) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [user_id, fruit_id, fruit_name, price, quantity, image_url], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});

// [장바구니 조회]
app.get('/api/cart/:userId', (req, res) => {
    const { userId } = req.params;
    db.query('SELECT * FROM cart WHERE user_id = ?', [userId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// [주문 처리]
app.post('/api/order', (req, res) => {
    const { user_id, items, totalPrice, address, phone, receiver } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ message: "상품이 없습니다." });

    const orderTitle = items.length > 1 ? `${items[0].fruit_name} 외 ${items.length-1}건` : items[0].fruit_name;
    
    const sql = "INSERT INTO orders (user_id, fruit_name, total_price, address, receiver, status) VALUES (?, ?, ?, ?, ?, '결제완료')";
    db.query(sql, [user_id, orderTitle, totalPrice, address, receiver], (err, result) => {
        if (err) return res.status(500).json(err);
        db.query("DELETE FROM cart WHERE user_id = ?", [user_id], () => {
            res.json({ success: true });
        });
    });
});

app.listen(port, () => console.log(`🚀 서버 실행 중: http://localhost:${port}`));