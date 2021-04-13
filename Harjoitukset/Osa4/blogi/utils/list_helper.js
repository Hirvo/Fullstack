const _ = require('lodash')

const dummy = (blogs) => {
  const test = 1
  return test
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  var most_likes = 0
  var favourite_blog

  if(blogs.length === 0)
    return ([])

  for (var i = 0; i < blogs.length; i++ ) {
    if (blogs[i].likes > most_likes){
      most_likes = blogs[i].likes
      favourite_blog = blogs[i]
    }
  }

  const trimmed_blog = (({ title, author, likes }) =>
    ({ title, author, likes  }))(favourite_blog)

  return trimmed_blog
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0)
    return ([])

  var countedAuthors = []
  _.forIn(_.countBy(blogs, 'author'), function(value, key) {
    countedAuthors.push({ 'author': key, 'blogs': value })
  })

  const maxAuthor = _.sortBy(countedAuthors, ['blogs']).reverse()

  return maxAuthor[0]
}

const mostLikes = (blogs) => {
  if(blogs.length === 0)
    return ([])

  var countedAuthors =
    _(blogs)
      .groupBy('author')
      .map((objs, key) => ({
        'author': key,
        'likes': _.sumBy(objs, 'likes') }))
      .value()

  //const maxAuthor = _.sortBy(countedAuthors, ['blogs']).reverse()

  return countedAuthors[0]
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }