import { useDispatch, useSelector } from "react-redux";
// 함수가 있는 곳  export
import { changeName, increaseAge } from "../store/userSlice.js";
import { increaseCount } from "../store.js";

function Cart() {
    // ↓ 아래는 let redux = useSelector((state) => {return state}) 와 같음
    let redux = useSelector((state) => state)
    // console.log("redux :", redux);
    // console.log("sotck:", redux.user);
    console.log("sotck:", redux.cart[0]);
    // console.log("cart:", redux.cart[0].name);

    // 3. store.js한테 요청을 보내주는 함수를 정의
    let dispatch = useDispatch()

    return (
        <>
            {redux.user.name} / {redux.user.age} / {redux.cart.length}
            <button onClick={() => {
                dispatch(increaseAge())
            }}>버튼
            </button>
            <table className="table">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">상품명</th>
                    <th scope="col">수량</th>
                </tr>
                {
                    redux.cart.map((value, i) =>
                        <tr key={i}>
                            <th scope="row">{value.id}</th>
                            <td>{value.name}</td>
                            <td>{value.count}</td>
                            <td>
                                <button onClick={() => {
                                    // store.js에 changeName()을 실행해달라고 보냄
                                    console.log("onClick:", value.id)
                                    dispatch(increaseCount(value.id))
                                }}>+</button>
                            </td>
                        </tr>
                    )
                }
            </table>
        </>
    )
}

export default Cart;