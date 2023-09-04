import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Posts from "./pages/Posts";
import Profiles from "./components/Profiles";
import Login from "./pages/Login";
import PostForm from "./components/Post/PostForm";
import Post from "./pages/Post";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/posts" Component={Posts} />
        <Route path="/posts/create" Component={PostForm} />
        <Route path="/posts/:id" Component={Post} />
        <Route path="/profiles" Component={Profiles} />
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
      </Routes>
    </Router>
  );
}

export default App;
