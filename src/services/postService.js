const postDao = require(‘../models/postDao’)
const getPostByFilter = async (filterBy) => {
  return await postDao.getPostByFilter(filterBy)
}
const getPostDetail = async(postId) => {
  return await postDao.getPostDetail(postId)
}
module.exports = {
  getPostByFilter,
  getPostDetail
 };
