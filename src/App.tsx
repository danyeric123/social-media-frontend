import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Posts from "./components/Posts";
import Profiles from "./components/Profiles";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/posts" Component={Posts} />
        <Route path="/profiles" Component={Profiles} />
        <Route path="/" Component={Home} />
        <Route path="/login" Component={Login} />
      </Routes>
    </Router>
  );
}

export default App;
