import { configureStore, createSlice } from '@reduxjs/toolkit'
import data from './db/fruit'; 

// 1. 유저 정보
let user = createSlice({
  name: 'user',
  initialState: { name: 'kim', age: 20 },
  reducers: {
    changeName(state) { state.name = 'park' },
    increase(state, action) { state.age += action.payload }
  }
})

// 2. 메인 상품 리스트
let products = createSlice({
  name: 'products',
  initialState: data, 
  reducers: {
    addNewProduct(state, action) {
      state.unshift(action.payload);
    },
    deleteProduct(state, action) {
      return state.filter(item => item.id !== action.payload);
    }
  }
})

// 3. 장바구니 (sortName 포함)
let cart = createSlice({
  name : 'cart',
  initialState : [], 
  reducers : {
    addItem(state, action){
      let index = state.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) {
        state[index].count += 1;
      } else {
        state.push({ ...action.payload, price: Number(action.payload.price) || 0, count: 1 });
      }
    },
    addCount(state, action){
      let index = state.findIndex((a) => a.id === action.payload);
      state[index].count++;
    },
    decreaseCount(state, action){ 
      let index = state.findIndex((a) => a.id === action.payload);
      if (state[index].count > 1) state[index].count--;
    },
    deleteItem(state, action){
      return state.filter((a) => a.id !== action.payload);
    },
    // ⭐ Cart.js에서 사용하는 정렬 기능 복구
    sortName(state){
      state.sort((a, b) => (a.name < b.name ? -1 : 1));
    }
  }
})

// 4. 결제 정보
let checkoutItem = createSlice({
  name: 'checkoutItem',
  initialState: [],
  reducers: {
    setCheckout(state, action) { return action.payload; }
  }
})

// ⭐ 모든 액션을 정확하게 export
export let { changeName, increase } = user.actions;
export let { addItem, addCount, decreaseCount, deleteItem, sortName } = cart.actions;
export let { addNewProduct, deleteProduct } = products.actions;
export let { setCheckout } = checkoutItem.actions; 

export default configureStore({
  reducer: {
    user : user.reducer,
    products : products.reducer,
    cart : cart.reducer,
    checkoutItem : checkoutItem.reducer 
  }
})