import Articles from "./components/Articles";
import Article from "./Pages/Article";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ArticleProvider } from "./context/ArticleContext";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <ArticleProvider>
        <h1>Auth0 Login</h1>
        <LoginButton />
        <LogoutButton />
        <Router>
          <Routes>
            {/* <Route exact path="/:pageNumber" element={<Articles />} /> */}
            <Route path="/user" element={<Profile />} />
            <Route path="/:category/:pageNumber" element={<Articles />} />
            <Route exact path="articles/:articleId" element={<Article />} />
          </Routes>
        </Router>
      </ArticleProvider>
    </>
  );
}

export default App;
