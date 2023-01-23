import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Article from "./pages/Article";
import Intro from "./pages/Intro";
import Life from "./pages/Life";
import List from "./pages/List";
import SingleArticle from "./pages/SingleArticle";


function App() {
  return (
    <>
      <Navbar />
      <div className="mainContent">
      <Routes>
        <Route path="intro" element={<Intro />}/>
        <Route path="article" element={<Article />}/>
        <Route path="list" element={<List />}/>
        <Route path="life" element={<Life />}/>
        <Route path="article/:articleId" element={<SingleArticle />}/>
      </Routes>
      </div>
    </>
  );
}

export default App;
