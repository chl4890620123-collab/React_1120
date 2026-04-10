import React, { useState } from 'react';
import { Button, Table, Form, Alert, Container } from 'react-bootstrap';
import './Board.css'; // 파일명을 Board.css로 맞췄습니다.

const Board = () => {
    // 1. 게시물 목록 상태 (기존 데이터 유지)
    const [boardList, setBoardList] = useState([
        { no: "1", title: '사과는 언제 배송이 되나요?', description: '어제부터 기다렸는데 아직 배송이 안됐어요.', viewCount: 1 },
        { no: "2", title: '수박크기가 작아요', description: '수박이 맛있고 달았습니다. 하지만 수박크기는 많이 작았어요. ', viewCount: 2 },
        { no: "3", title: '오렌지 당도가 낮아요', description: '당도가 11birx이상은 아닌것같아요.', viewCount: 1 },
        { no: "4", title: '딸기향이 이상해요', description: '딸기에서 흙냄새가 납니다.', viewCount: 1 }
    ]);

    // 2. UI 및 폼 상태 관리
    const [listOk, setListOk] = useState(true);
    const [readOk, setReadOk] = useState(false);
    const [writeOk, setWriteOk] = useState(false);
    const [editOk, setEditOk] = useState(false);
    const [boardInfo, setBoardInfo] = useState({});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [editNo, setEditNo] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // --- 기능 로직 (100% 보존) ---
    const boardListView = () => {
        setReadOk(false); setWriteOk(false); setEditOk(false); setListOk(true);
    };

    const boardRead = (no) => {
        setListOk(false); setWriteOk(false); setEditOk(false); setReadOk(true);
        const updatedList = boardList.map(b => b.no === no ? { ...b, viewCount: b.viewCount + 1 } : b);
        setBoardList(updatedList); 
        const selectedBoard = updatedList.find(b => b.no === no); 
        setBoardInfo(selectedBoard || {});
    };

    const boardWrite = () => {
        setListOk(false); setWriteOk(true);
        setTitle(''); setDescription(''); setErrorMessage('');
    };

    const boardSave = () => {
        if (title.trim() === '' || description.trim() === '') {
            setErrorMessage('제목과 내용을 모두 입력해주세요!');
            return;
        }
        const maxNo = Math.max(0, ...boardList.map(b => parseInt(b.no) || 0));
        const newBoard = { no: (maxNo + 1).toString(), title: title, description: description, viewCount: 0 };
        setBoardList([...boardList, newBoard]);
        boardListView();
    };

    const boardDelete = (e, no) => {
        e.stopPropagation(); // 행 클릭 이벤트 방지
        const updatedList = boardList.filter(b => b.no !== no.toString()); 
        setBoardList(updatedList); 
        boardListView();
    };

    const boardEdit = (e, no) => {
        e.stopPropagation(); // 행 클릭 이벤트 방지
        setEditOk(true); setListOk(false); setReadOk(false);
        const boardToEdit = boardList.find(b => b.no === no); 
        if (boardToEdit) {
            setEditNo(boardToEdit.no); setEditTitle(boardToEdit.title); setEditDescription(boardToEdit.description); 
        }
    };

    const updateBoard = () => {
        const updatedBoardList = boardList.map(b => b.no === editNo ? { ...b, title: editTitle, description: editDescription } : b);
        setBoardList(updatedBoardList); 
        boardListView(); 
    };

    return (
        <Container className="board-main-container">
            <div className="board-header-text">
                <h3 className="premium-title">과일농장 고객센터</h3>
                <p className="premium-subtitle">신선한 과일만큼 달콤한 답변을 약속드립니다.</p>
                <div className="accent-line"></div>
            </div>
            
            {listOk && (
                <div className="fade-in">
                    <div className="board-card-layout">
                        <Table hover responsive className="magazine-table-core">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>제목</th>
                                    <th>문의글 요약</th>
                                    <th>조회수</th>
                                    <th className="text-center">관리</th>
                                </tr>
                            </thead>
                            <tbody>
                                {boardList.slice().reverse().map((board) => (
                                    <tr key={board.no} onClick={() => boardRead(board.no)}>
                                        <td className="col-no">{board.no}</td>
                                        <td className="col-title">{board.title}</td>
                                        <td className="col-desc">{board.description}</td>
                                        <td className="col-view">{board.viewCount}</td>
                                        <td className="col-action text-center">
                                            <button className="mini-btn edit" onClick={(e) => boardEdit(e, board.no)}>수정</button>
                                            <button className="mini-btn delete" onClick={(e) => boardDelete(e, board.no)}>삭제</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <div className="text-end mt-4">
                        <Button className="btn-premium-action" onClick={boardWrite}>문의하기</Button>
                    </div>
                </div>
            )}

            {readOk && (
                <div className="content-card fade-in">
                    <div className="content-header">
                        <span className="category-tag">Customer Q&A</span>
                        <h4>{boardInfo.title}</h4>
                        <div className="info-meta">방문수 {boardInfo.viewCount}</div>
                    </div>
                    <div className="content-body">{boardInfo.description}</div>
                    <div className="text-center mt-5">
                        <Button className="btn-premium-outline" onClick={boardListView}>목록보기</Button>
                    </div>
                </div>
            )}

            {(writeOk || editOk) && (
                <div className="content-card fade-in">
                    <h4 className="form-title">{writeOk ? "새로운 문의 작성" : "게시물 수정하기"}</h4>
                    {errorMessage && <Alert variant="danger" className="round-alert">{errorMessage}</Alert>}
                    <Form>
                        <Form.Group className="mb-4">
                            <Form.Label className="premium-label">제목</Form.Label>
                            <Form.Control 
                                className="premium-input"
                                type="text" 
                                value={writeOk ? title : editTitle} 
                                onChange={(e) => writeOk ? setTitle(e.target.value) : setEditTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label className="premium-label">내용</Form.Label>
                            <Form.Control 
                                className="premium-input"
                                as="textarea" 
                                rows={8} 
                                value={writeOk ? description : editDescription} 
                                onChange={(e) => writeOk ? setDescription(e.target.value) : setEditDescription(e.target.value)}
                            />
                        </Form.Group>
                        <div className="text-center">
                            <Button className="btn-premium-action me-3" onClick={writeOk ? boardSave : updateBoard}>
                                {writeOk ? "저장하기" : "수정하기"}
                            </Button>
                            <Button className="btn-premium-outline" onClick={boardListView}>돌아가기</Button>
                        </div>
                    </Form>
                </div>
            )}
        </Container>
    );
};

export default Board;