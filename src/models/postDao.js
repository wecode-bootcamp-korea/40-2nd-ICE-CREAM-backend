const appDataSource = require('./data-source');

const getPostByFilter = async (filterBy) => {

  let orderby = ''
  if (filterBy = 'trending') {
    orderby = 'order by p.likes DESC'
  } else if (filterBy = 'newest') {
    orderby = 'order by p.created_at DESC'
  }
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
      ${orderby}
      `,
    )};

  module.exports = {
    getPostByFilter
   };