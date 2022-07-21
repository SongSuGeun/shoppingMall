import { createSlice } from "@reduxjs/toolkit"

let user = createSlice({
    // useState랑 비슷한 용도로 쓰임
    name: "user",
    initialState: { name: 'kim', age: 20 },
    // 1. 함수를 만듬 -> state를 수정해주는 함수
    reducers: {
        changeName(state) {
            // state는 기존 state
            console.log("changeName:", state)
            state.name = 'PARK'
        },
        increaseAge(state, action) {
            // state변경해주는 파라미터 이름을 보통 action이라고 함
            // payload : 파라미터 자리에 입력했던 값이 그대로 반영됨
            state.age += action.payload
        },
        sliceName(state) {
            // state는 기존 state
            return 'john' + state
        }
    }
})

//2 reducers로 만든 함수 changeName를 다른곳에서 사용할수있게 export해야함
export let { changeName, increaseAge, sliceName } = user.actions

export default user;