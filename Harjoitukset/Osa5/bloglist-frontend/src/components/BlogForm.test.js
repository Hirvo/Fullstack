import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> has correct props on submit', () => {
  const createBlog = jest.fn()
  const user = {
    username: 'Test',
    name: 'Kimmo'
  }

  const component = render(
    <BlogForm createBlog={createBlog} user={user} />
  )

  const form = component.container.querySelector('form')

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')

  fireEvent.change(author, {
    target: { value: 'Mikko Saarikoski' }
  })
  fireEvent.change(title, {
    target: { value: 'Siniset meret' }
  })
  fireEvent.change(url, {
    target: { value: 'www.jou.com' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].author).toBe('Mikko Saarikoski' )
  expect(createBlog.mock.calls[0][0].title).toBe('Siniset meret' )
  expect(createBlog.mock.calls[0][0].url).toBe('www.jou.com' )
})