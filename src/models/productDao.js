const { appDataSource } = require('./data-source');

/*
1. style page 메인 -> 인기 필터링
/social/trending
2. 최신 필터링
/social/newest
3. post data
(1)pic_url (2)profile_image_url (3)nickname (4)likes
*/
const getPostsByTrending = async (user_Id) => {
  if(!filterBy && !method) {
    const posts = await appDataSource.manager.query(
      `
      SELECT
        pic_url,
        profile_image_url,
        nickname,
        likes,
        feedText
      `
    )
  }

}
