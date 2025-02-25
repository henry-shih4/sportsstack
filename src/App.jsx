import Articles from "./components/Articles";
import Article from "./Pages/Article";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import SearchComponent from "./components/SearchComponent";


function App() {
  return (
    <>
        <Router>
          <Header />
          <Routes>
          

            <Route path="/user" element={<Profile />} />

            <Route exact path="articles/:articleId" element={<Article />} />
        
       <Route path="/search" element={<SearchComponent />} />
        <Route path="/not-found" element={<NotFound />} />
       <Route path="/:category/:page" element={<Articles />} />
       <Route path="*" element={<Navigate to="/all/1" replace />} />
          </Routes>
        </Router>
    </>
  );
}

export default App;
