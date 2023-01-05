const postDao = require('../models/postDao')

const getPostByFilter = async (filterBy) => {
  return postDao.getPostByFilter(filterBy)
}

module.exports = { 
  getPostByFilter
 };