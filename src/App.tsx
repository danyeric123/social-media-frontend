import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Posts from "./components/Posts";
import Profiles from "./components/Profiles";
import { AuthContextProvider } from "./contexts/AuthContext";
import Login from "./components/Login";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/posts" Component={Posts} />
          <Route path="/profiles" Component={Profiles} />
          <Route path="/" Component={Home} />
          <Route path="/login" Component={Login} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
