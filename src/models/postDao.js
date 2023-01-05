const appDataSource = require('./data-source');

const styleFilterSet = {
  'trending' : 'order by p.likes DESC',
  'newest'   : 'order by p.created_at DESC'
}

const getPostByFilter = async (filterBy) => {
  return await appDataSource.query(
      `
      SELECT
        p.post_image_url,
        u.profile_image_url,
        u.nickname,
        p.likes,
        p.feed_text,
        p.created_at
      FROM posts p
      JOIN users u On p.user_id = u.id
      ${styleFilterSet.filterBy}
      `,
    )};

  module.exports = {
    getPostByFilter
   };