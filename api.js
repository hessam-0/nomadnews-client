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
  return api.get(`/articles/${articleId}`)
    .then((response) => {
      return response.data.article;
    })
};

const getComments = (articleId) => {
  return api.get(`/articles/${articleId}/comments`)
    .then((response) => {
      return response.data.comments;
    })
};

export { getArticles, getArticleById, getComments};