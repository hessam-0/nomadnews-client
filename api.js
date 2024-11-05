import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nomad-news.onrender.com/api'
});

const getArticles = () => {
  const url = '/articles';
  return api.get(url)
    .then((response) => {
      return response.data.articles;
    })
};

const getArticleById = (articleId) => {
  const url='/articles/' + articleId;
  return api.get(url)
    .then((response) => {
      return response.data.article;
    })
};

export { getArticles, getArticleById };