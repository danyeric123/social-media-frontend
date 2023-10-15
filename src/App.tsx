import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import PostForm from "./components/Post/PostForm";
import Profile from "./components/Profile/Profile";
import ProfileEdit from "./components/Profile/ProfileEdit";
import ProfileList from "./components/Profile/ProfileList";
import Profiles from "./components/Profile/Profiles";
import Signup from "./components/Signup";
import Login from "./pages/Login";
import Post from "./pages/Post";
import PostByCategory from "./pages/PostByCategory";
import Posts from "./pages/Posts";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/posts" Component={Posts} />
        <Route path="/posts/create" Component={PostForm} />
        <Route path="/posts/category/:category" Component={PostByCategory} />
        <Route path="/posts/:id" Component={Post} />
        <Route path="/posts/:id/edit" Component={PostForm} />
        <Route path="/profiles" Component={Profiles} />
        <Route path="/profiles/:username" Component={Profile} />
        <Route path="/profiles/:username/followers" element={<ProfileList />} />
        <Route path="/profiles/:username/following" element={<ProfileList />} />
        <Route path="/profiles/:username/edit" Component={ProfileEdit} />
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
      </Routes>
    </Router>
  );
}

export default App;
