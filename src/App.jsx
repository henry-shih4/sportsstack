import Articles from "./components/Articles";
import Article from "./Pages/Article";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ArticleProvider } from "./context/ArticleContext";
import Header from "./components/Header";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <ArticleProvider>
        <Header />
        <Router>
          <Routes>
            {/* <Route exact path="/:pageNumber" element={<Articles />} /> */}
            <Route path="/user" element={<Profile />} />
            <Route path="/:category/:pageNumber" element={<Articles />} />
            <Route exact path="articles/:articleId" element={<Article />} />
            <Route path="*" element={<Navigate to="/all/1" replace />} />
            <Route path="/not-found" element={<NotFound />} />
          </Routes>
        </Router>
      </ArticleProvider>
    </>
  );
}

export default App;
