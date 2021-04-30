import React, { useState } from 'react'

const BlogForm = ({ createBlog, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      user: {
        username: user.username,
        name: user.name
      }
    })

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <h2>create new blog</h2>
      title:
        <input
          id='title'
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
      author:
        <input
          id='author'
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
      url:
        <input
          id='url'
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id="createButton" type="submit">create</button>
    </form>
  )
}

export default BlogForm