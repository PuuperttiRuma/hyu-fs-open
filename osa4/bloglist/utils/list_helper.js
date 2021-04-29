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
    : blogs.reduce( (total, blog) => total + blog.likes, 0)
}

module.exports = {dummy, totalLikes}