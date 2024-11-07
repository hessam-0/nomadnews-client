import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nomad-news.onrender.com/api'
});

const getArticles = (topic) => {
  return api.get('/articles', { params: { topic }})
    .then((response) => {
      return response.data.articles;
    })
};

const getArticleById = (article_id) => {
  return api.get(`/articles/${article_id}`)
    .then((response) => {
      return response.data.article;
    })
};

const getComments = (article_id) => {
  return api.get(`/articles/${article_id}/comments`)
    .then((response) => {
      return response.data.comments;
    })
};

const patchArticleVotes = (article_id, inc_votes) => {
  return api.patch(`/articles/${article_id}`, { inc_votes})
    .then((response) => {
      return response.data.article;
    })
};

const patchCommentVotes = (comment_id, inc_votes) => {
  return api.patch(`/comments/${comment_id}`, {inc_votes})
    .then((response) => {
      return response.data.comment;
    })
};

const postComment = (article_id, username, body) => {
  return api.post(`/articles/${article_id}/comments`, {
    username,
    body
  })
  .then((response) => {
    return response.data.comment;
  });
};

const deleteComment = (comment_id) => {
  return api.delete(`/comments/${comment_id}`)
    .then((response) => {
      return response.data.comment;
    });
};

export const getTopics = () => {
  return api.get(`/topics`)
    .then((response) => {
      return response.data.topics;
    })
}

export { getArticles, getArticleById, getComments, patchArticleVotes, patchCommentVotes, postComment, deleteComment };