import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { stockProduct } from "./../store.js";
import { useDispatch } from "react-redux";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Cart from "./Cart.js"


class Detail2 extends React.Component {
    componentDidMount() {
        // 컴포넌트가 마운트 할때 코드 실행

    }
    componentDidUpdate() {
        // 컴포넌트가 업데이트 할때 코드 실행
    }

    componentWillUnmount() {
        // 컴포넌트가 unmount 할때 코드 실행
    }
}

// styled-components를 install해서 사용
let YellowBtn = styled.button`
    background : yellow;
    color:block;
    padding : 10px;
`
let GreyDiv = styled.div`
    background : white;
    align-items: center;
    padding :20px;
`
function Detail(props) {

    let [count, setCount] = useState(0)
    let [timeOut, setTimeOut] = useState(false)

    let [flag, setFlag] = useState(false)
    let [textValue, setTextValue] = useState(1)

    //redux
    let dispatch = useDispatch()

    let navigate = useNavigate()

    useEffect(() => {
        // 렌더링이 다 끝나고 실행됨
        // 무겁고 느린 연산(서버에서 데이터를 가져온다거나),타이머 때 사용 
        // mount, update시에 코드 실행 시켜줌
        let time = setTimeout(() => {
            // 실행할 코드
            setTimeOut(true)
        }, 2000)

        // ↓ return 을 사용하면 useEffect가 실행되기전에 실행됨
        // ↓ 기존 코드 정리할때 많이 사용 함
        return () => {
            console.log("useEffect -> return")
            clearTimeout(time)
            setTimeOut(false)
        }
    }, [])
    // []안에 useEffect 조건을 넣음
    // []안에 아무것도 안 넣으면 마운트 될때 1회만 코드 실행됨
    // []안에 스테이트를 넣으면 스테이트가 변경될 때  useEffect가 실행됨

    useEffect(() => {
        console.log("useEffect : ", textValue)
        if (!isFinite(textValue)) {
            console.log("TRUE")
            setFlag(true)
        } else {
            setFlag(false)
            console.log("FALSE")
        }
    }, [textValue])

    // url의 파라미터를 가져와줌
    let { id } = useParams();
    let findShoes = props.shoes.find((x) => {
        return x.id == id
    })
    let [tab, setTab] = useState(0)


    return (
        <GreyDiv className='col-md-4' >
            {
                timeOut == true ? <div className="alert alert-warning">"2초 이내 구매시 할인"</div> : null
            }
            <img src="https://img.goldii.com/goods/kyh10216/big/W1500H1000_418531_201910242111364224.jpg" width="100%" />
            <YellowBtn bg="red" onClick={() => {
                setCount(count + 1)
            }}>버튼</YellowBtn>
            <br />
            <br />
            <button onClick={() => {
                navigate("../../cart")
            }}>Go to Cart</button>
            <br />
            {
                flag == true ?
                    <div className="alert alert-warning">
                        <h3>
                            경고 : 숫자만 입력하세요.
                        </h3>
                    </div> : null
            }
            <input type="text" placeholder="숫자만 입력하세요" onChange={(e) => {
                setTextValue(e.target.value)
                console.log(textValue)
            }}>
            </input>
            <h4>{findShoes.title}</h4>
            <p>{findShoes.content}</p>
            <p>{findShoes.price}</p>
            <button className="btn btn-danger" onClick={() => {
                console.log(" on Click Product")
                dispatch(
                    stockProduct(
                        { id: 1, name: "hoge", count: 1 }
                    )
                )
            }}
            >주문하기
            </button>
            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={() => {
                        setTab(0)
                        console.log("Click 0 :", tab)
                    }}>버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={() => {
                        setTab(1)
                        console.log("Click 1 :", tab)
                    }}>버튼1

                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={() => {
                        setTab(2)
                    }}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <Tab tab={tab} shoes={props.shoes}
            />
        </GreyDiv >
    )
}

function Tab({ tab, shoes }) {
    console.log("shoes:", shoes[0])
    let [fade, setFade] = useState('')

    useEffect(() => {
        let time = setTimeout(() => {
            setFade('end')
        }, 200)

        return () => {
            clearTimeout(time)
            setFade('')
        }
    }, [tab])

    return (
        < div className={'start ' + fade} >
            {
                [<div>{shoes[0].title}</div>,
                <div>page1</div>,
                <div>page2</div>
                ][tab]
            }
        </div >
    )
    // if문을 좀 더 간결하게
    // if (tab == 0) {
    //     return <div className={'start ' + fade}>page1</div>
    // } else if (tab == 1) {
    //     return <div className={'start ' + fade}>page2</div>
    // } else if (tab == 2) {
    //     return <div className={'start ' + fade}>page3</div>
    // }
}

export default Detail;