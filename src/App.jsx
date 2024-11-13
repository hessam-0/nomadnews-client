import { Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";
import ArticleList from "./components/ArticleList";
import ArticlePage from "./components/ArticlePage";
import Header from "./components/Header";
import NotFound from "./components/NotFound";

export default function App() {
  return (
    <main className="app">
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
        <Route path="/topics" element={<ArticleList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}
