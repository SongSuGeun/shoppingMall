// npm install @reduxjs/toolkit react-redux
// index.js 에
// import { Provider } from 'react-redux';
// import store from './store.js'
// {/* <Provider store={store}></Provider> */ }
// 작성 필요
import { configureStore, createSlice } from "@reduxjs/toolkit"
import user from "./store/userSlice.js"
// import stock from "./store/stockSlice.js"

let cart = createSlice({
    name: "stock",
    initialState: [
        { id: 0, name: 'White and Black', count: 2 },
        { id: 2, name: 'Grey Yordan', count: 1 }
    ],
    reducers: {
        increaseCount(state, action) {
            // ↓는 let result = state.find(item => item.id === action.payload)와 같다.
            let result = state.find(item => { return item.id === action.payload })
            result.count++
        },
        stockProduct(state, action) {
            console.log("in stockProduct0 :  ", state.values)
            console.log("in stockProduct1 :  ", action.payload)
            console.log("in stockProduct2 :  ", state.length)
            state.push(action.payload)
            console.log("in stockProduct3 :  ", state)
            console.log("in stockProduct4 :  ", state.length)

        }
    }
})
export let { increaseCount, stockProduct } = cart.actions

export default configureStore({
    reducer: {
        // createSlice에 선언한 변수를 등록함
        // .reducer를 붙여야함
        user: user.reducer,
        cart: cart.reducer
    }
})