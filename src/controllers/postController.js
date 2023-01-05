const postService = require('../services/postService');
const { catchAsync } = require('../utils/error');

const getPostByFilter = async (req, res) => {
  console.log(req.query);
  try{
    const filterBy = req.query.filterBy;
    if (!filterBy) throw new Error('keyErr')
  const posts = await postService.getPostByFilter(filterBy);
  res.status(200).json({ posts });
  } catch(err) {
    console.log(err);
  }
    
    
};

const getPostDetail = catchAsync(async (req, res) => {
  const {userId, postId} = req.body;
  const result = await postService.getPostDetail(userId, postId)
  res.status(200).json({ data : result });

});

module.exports = { 
  getPostByFilter,
  getPostDetail
};