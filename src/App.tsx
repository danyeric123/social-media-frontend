import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import PostForm from "./components/Post/PostForm";
import Profile from "./components/Profile/Profile";
import Profiles from "./components/Profile/Profiles";
import Signup from "./components/Signup";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Posts from "./pages/Posts";
import ProfileList from "./components/Profile/ProfileList";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/posts" Component={Posts} />
        <Route path="/posts/create" Component={PostForm} />
        <Route path="/posts/:id" Component={Post} />
        <Route path="/profiles" Component={Profiles} />
        <Route path="/profiles/:username" Component={Profile} />
        <Route path="/profiles/:username/followers" Component={ProfileList} />
        <Route path="/profiles/:username/following" Component={ProfileList} />
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
      </Routes>
    </Router>
  );
}

export default App;
