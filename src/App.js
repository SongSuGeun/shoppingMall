import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { lazy, Suspense, suspense, useEffect, useState } from 'react';
import data from './data.js'
// import Shoes from './shoes.js'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios'


// import Detail from './routes/Detail.js';
// import Cart from './routes/Cart.js'
// 이 컴포넌트가 필요할때 다운함
const Detail = lazy(() => import('./routes/Detail.js'));
const Cart = lazy(() => import('./routes/Cart.js'));

function App() {
  let [shoes, setShoes] = useState(data);
  let [image, setImage] = useState([
    "https://img.goldii.com/goods/kyh10216/big/W1500H1000_418531_201910242111364224.jpg",
    "https://img.goldii.com/goods/aford/big/W700H700_95717_202206201717005011.jpg",
    "https://img.goldii.com/goods/chdc2022/big/W870H1305_158231_20220617183458660.jpg",
    "https://assets.supremenewyork.com/184091/zo/EOrhD_yAcY4.jpg",
    "https://images.stockx.com/images/Supreme-Shure-SM58-Vocal-Microphone-Red.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1606321889",
    "https://cdn-images.farfetch-contents.com/17/75/97/72/17759772_37390075_300.jpg"
  ]);

  let navigate = useNavigate();
  let [axiosShoes, setAxiosShoes] = useState([])

  return (
    < div className="App" >
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={() => {
            navigate("/event")
          }}>EVENT
          </Navbar.Brand>
          <Nav className="me-auto">
            <Navbar.Brand onClick={() => {
              navigate("/")
            }}>HOME</Navbar.Brand>
            <Nav.Link onClick={() => {
              navigate("/detail")
            }}>상세페이지</Nav.Link>
            <Nav.Link onClick={() => {
              navigate("/about")
            }}>어바웃</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* // 1이면 앞으로, -1이면 뒤로가기 구현
      navigate(1)
      navigate(-1) 
      */}
      <Suspense fallback={<div> Roustes안에 있는 모든 컴포넌트를 로딩중입니다.</div>}>
        <Routes>
          <Route path="/" element={
            <>
              <div className='main-bg'></div>
              <button onClick={() => {
                let copy = [...shoes];
                copy.sort((a, b) =>
                  a.title < b.title ? -1 : 1
                );
                setShoes(copy);
              }}>정렬</button>
              <div className='container' >
                <div className="row">
                  {
                    shoes.map((shoes) => {
                      return (
                        <Card shoes={shoes} image={image} />
                      )
                    })
                  }
                </div>
                <button onClick={() => {
                  // npm install axios
                  axios.get('https://codingapple1.github.io/shop/data2.json').then((result) => {
                    let copyAxiosShoes = [...shoes, ...result.data]
                    setShoes(copyAxiosShoes)
                  })
                    .catch(() => {
                      console.log("서버 전송 실패")
                    })

                  // post 요청
                  // axios.post('/', { name: "song" })

                  // 서버에 요청을 2회이상 할 경우 
                  // Promise.all([GET],[GET]).then((결과)=>{})

                  // js문법 fetch() 로도 서버에서 데이터 받을수있는데 json으로 받기떄문에 따로 array로 변환해줘야함

                }}>Ajax요청 버튼</button>
              </div>
            </>
          } />

          <Route path="/detail/:id" element={
            <div>
              <Detail shoes={shoes} />
            </div>
          } />

          < Route path="/about" element={
            < About />
          } >
            <Route path="hoge" element={
              <div>HOGE</div>
            } />
            <Route path="location" element={
              <div>FUGA</div>
            } />
          </Route >

          <Route path="*" element={
            <div> 없는 페이지 입니다</div>
          }>
          </Route>
          <Route path="/event" element={
            <>
              <Event />
            </>
          }>
            <Route path="one" element={
              <div>첫 주문시 양배추즙 서비스</div>
            }></Route>
            <Route path="two" element={
              <div>생일 기념 쿠폰 받기</div>
            }></Route>
          </Route>
          <Route path="/cart" element={
            <Suspense fallback={<div> Cart컴포넌트를 로딩중입니다.</div>}>
              <div><Cart /></div>
            </Suspense>
          } />
        </Routes >
      </Suspense>
    </div >
  );
}

function Card(props) {
  // console.log("CARD :", props.axiosShoes)
  return (
    <div className='col-md-4' key={props.shoes.id} >
      <img src={props.image[props.shoes.id]} width="80%" onClick={() => {
        console.log("Click")
      }} />
      <h4>{props.shoes.title}</h4>
      <h4>{props.shoes.price}</h4>
      {/* <h4>{props.shoes.price}</h4> */}
    </div >
  )
};

function About() {
  return (
    <div>
      <h4>회사정보</h4>
      {/* // ROUTE안에 있는 또 다른 Route를 Outlet위치에 넣겠다 */}
      <Outlet></Outlet>
    </div>
  )
}

function Event() {
  return (
    <div>
      Event의 탑 타이틀
      <Outlet></Outlet>
    </div>
  )
}

export default App;