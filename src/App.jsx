import { Routes, Route } from 'react-router-dom';
import './App.css';
import ArticleList from './components/ArticleList';
import ArticlePage from './components/ArticlePage';
import Header from './components/Header';

export default function App() {
  return (
      <main className='app'>
        <Header />
        <Routes>
          <Route path="/" element={<ArticleList/>}/>
          <Route path="/articles/:article_id" element={<ArticlePage/>}/>
        </Routes>
      </main>
  );
};