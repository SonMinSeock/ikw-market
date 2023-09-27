import Login from "./pages/Login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import Profile from "./pages/Profile/Profile";
import Chat from "./pages/Chat/Chat";
import Upload from "./pages/Upload/Upload";
import Layout from "./components/Layout/Layout";
import Products from "./components/ProductList/Products";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Main />} />
          <Route path="profile" element={<Profile />} />
          <Route path="Products" element={<Products />} />
          <Route path="chat" element={<Chat />} />
          <Route path="upload" element={<Upload />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
