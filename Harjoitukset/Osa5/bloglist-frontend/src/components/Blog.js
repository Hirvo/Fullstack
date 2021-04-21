import React, {useState} from 'react' 

const Blog = ({blog}) => {
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
            {blog.likes}  <button onClick={console.log('like')}>{'like'}</button>
            <br></br> {blog.url}
          </div>
      </div>
    )
  }

}
  
export default Blog