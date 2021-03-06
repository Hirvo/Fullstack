import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, owner }) => {
  const [state, setState] = useState(false)

  const handleShow = () => {
    setState(true)
  }

  const handleHide = () => {
    setState(false)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (!state) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title}  {blog.author} <button onClick={handleShow}>{'show'}</button>
        </div>

      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title}  {blog.author} <button onClick={handleHide}>{'hide'}</button>
        </div>
        <div>
          {blog.likes}  <button id="likeButton" onClick={() => updateBlog({ blog })}> like </button>
          <br></br> {blog.url}
          {owner ?
            <div> <button onClick={() => deleteBlog({ blog })}> delete </button> </div>:
            <div></div>
          }
        </div>
      </div>
    )
  }

}

export default Blog
