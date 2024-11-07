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

  // I've put this here to simulate a failure to demonstrate the error.
    if (Math.random() > 0.8) {
    return Promise.reject({ msg: "Random voting error." });
  };

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
  const randomDelay = Math.floor(Math.random() * 2000) + 1000; //1000-3000ms
  const chanceOfFailure = Math.random() < 0.5 // 50%

  if(chanceOfFailure){
    return Promise.reject({msg: "Random posting Error."});
  }

  return api.post(`/articles/${article_id}/comments`, {
    username,
    body
  })
  .then((response)=> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(response.data.comment)
      }, randomDelay);
    });
  });
};

const deleteComment = (comment_id) => {
  return api.delete(`/comments/${comment_id}`)
    .then((response) => {
      return response.data.comment;
    });
};

export { getArticles, getArticleById, getComments, patchArticleVotes, patchCommentVotes, postComment, deleteComment };