const postService = require('../services/postService');
const { catchAsync } = require('../utils/error');

const getPostByFilter = catchAsync(async (req, res) => {
    const filterBy = req.query.filterBy;

      if (!filterBy) throw new Error('keyErr')

    const posts = await postService.getPostByFilter(filterBy);

    res.status(200).json({ posts });
})

const getPostDetail = catchAsync(async (req, res) => {
  const postId = req.params.postId;
  const result = await postService.getPostDetail(postId)
  res.status(200).json({ data : result });
})

module.exports = { 
  getPostByFilter,
  getPostDetail

};