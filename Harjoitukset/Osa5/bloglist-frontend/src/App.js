import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const removeBlog = ( id ) => {
    setBlogs(blogs.filter(n => n.id !== id))
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      }).then(() => {
        setErrorMessage(
          `A new blog '${blogObject.title}' by '${blogObject.author}' added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const updateBlog = ( blogObject ) => {
    const findBlog = blogs.find(n => n.id === blogObject.blog.id)
    const newBlog =  { ...findBlog, likes: blogObject.blog.likes+1 }
    blogService
      .update(newBlog.id, newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id
          !== newBlog.id ? blog : returnedBlog))
      })
  }

  const deleteBlog = ( blogObject ) => {
    if (window.confirm(`Remove blog ${blogObject.blog.title} by ${blogObject.blog.author}?`)){
      blogService
        .remove(blogObject.blog.id)
        .then(() => {
          removeBlog(blogObject.blog.id)
        })
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog} user={user}
      />
    </Togglable>
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <h2>Log in to application</h2>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in
            <button onClick={() => {
              setUser(null)
              window.localStorage.clear()
            }}> logout
            </button>
          </p>
          {blogForm()}
          <div id="blog-list">
            {blogs.sort(function (a, b) {
              return b.likes - a.likes
            }).map(blog =>
              <Blog key={blog.id} blog={blog} updateBlog={updateBlog}
                deleteBlog={deleteBlog} owner={user.username === blog.user.username}/>
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default App
