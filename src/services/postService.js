const postDao = require('../models/postDao')

const getPostByFilter = async (filterBy) => {
  return await postDao.getPostByFilter(filterBy)
}

const getPostDetail = async(userId, postId) => {
  return await postDao.getPostDetail(userId, postId) 
}

module.exports = { 
  getPostByFilter,
  getPostDetail
 };