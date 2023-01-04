const postDao = require('../models/postDao')

const getPostByFilter = async (filterBy) => {
  return await postDao.getPostByFilter(filterBy)
}

module.exports = { 
  getPostByFilter
 };