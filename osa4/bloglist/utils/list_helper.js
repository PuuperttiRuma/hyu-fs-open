// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

/**
test('of empty list is zero')
test('when list has only one blog equals the likes of that')
test('of a bigger list are calculated correctly')
 */
const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((favorite, blog) =>
      (blog.likes > favorite.likes)
        ? blog
        : favorite
    )
}

const mostBlogs = () => {
  /*
  Metodi käy läpi blogilistan ja nappaa sieltä kirjoittajat
  laskee kirjoittajien kirjoittamien blogien määrät
  palauttaa sen jolla eniten blogeja
  lodashin countBy näyttää hyvältä
  */
  const answer =  
  {
    author: "author",
    blogs: 9999
  }
  return answer
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }