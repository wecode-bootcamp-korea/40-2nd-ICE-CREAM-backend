const postService = require('../services/postService');
const { catchAsync } = require('../utils/error');

const getPostByFilter = catchAsync(async (req, res) => {
    const filterBy = req.query.filterBy;

      if (!filterBy) throw new Error('keyErr')

    const posts = await postService.getPostByFilter(filterBy);
    res.json(posts);
});

module.exports = { 
  getPostByFilter
};