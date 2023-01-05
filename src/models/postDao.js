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
      p.likes,
      p.feed_text,
      p.created_at,
      u.nickname
    FROM posts p
    JOIN users u ON p.user_id = u.id
    ${styleFilterSet.filterBy}
    `,
    )};

const getPostDetail = async (userId, postId) => {
  return await appDataSource.query(
    `
    SELECT
      p.post_image_url,
      u.profile_image_url,
      pr.thumbnail_image_url,
      pr.en_name,
      pr.original_price,
      p.likes,
      p.feed_text,
      p.product_id,
      u.nickname
    FROM posts AS p
    LEFT JOIN products AS pr ON p.product_id = p.id
    LEFT JOIN users AS u ON p.user_id = u.id
    WHERE u.id = ?
    AND p.id = ?
    and pr.id = p.product_id
    `, [userId, postId]
  )};

  module.exports = {
    getPostByFilter,
    getPostDetail
   };