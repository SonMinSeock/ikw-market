import Login from "./pages/Login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import Profile from "./pages/Profile/Profile";
import Product from "./pages/Product/Product";
import Chat from "./pages/Chat/Chat";
import Upload from "./pages/Upload/Upload";
import Nav from "./components/Nav/Nav";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route path="main" element={<Main />} />
          <Route path="profile" element={<Profile />} />
          <Route path="product" element={<Product />} />
          <Route path="chat" element={<Chat />} />
          <Route path="upload" element={<Upload />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
