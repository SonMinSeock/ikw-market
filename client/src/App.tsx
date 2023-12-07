import Login from "./pages/Login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import Profile from "./pages/Profile/Profile";
import Chat from "./pages/Chat/Chat";
import Upload from "./pages/Upload/Upload";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import ProductEdit from "./pages/ProductEdit/ProductEdit";
import ChatList from "./pages/ChatList/ChatList";
import { useEffect } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import ProfileUpdate from "./pages/Profile/ProfileUpdate/ProfileUpdate";
import PrivateLayout from "./components/Layout/PrivateLayout";
import PublicLayout from "./components/Layout/PublicLayout";
import Layout from "./components/Layout/Layout";
import Header from "./components/Header/Header";

function App() {
  // 모바일ver. 채팅페이지에서 스크롤 막기
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  return (
    <>
      <Router>
        <Routes>
          <Route path="/test" element={<></>} />
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Main />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Route>
            <Route element={<PrivateLayout />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/update" element={<ProfileUpdate />} />
              <Route path="/chatlist" element={<ChatList />} />
              <Route path="/chat/:id" element={<Chat />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/product/:id/edit" element={<ProductEdit />} />
            </Route>
          </Route>
        </Routes>
      </Router>
      <ReactQueryDevtools />
    </>
  );
}

export default App;
