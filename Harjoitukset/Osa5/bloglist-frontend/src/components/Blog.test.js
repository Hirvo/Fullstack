import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    author: 'Kimmo Saarinen',
    title: 'Component testing is cool',
    url: 'www.harri.com',
    likes: 2
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Kimmo Saarinen'
  )
  expect(component.container).toHaveTextContent(
    'Component testing is cool'
  )
  expect(component.container).not.toHaveTextContent(
    'www.harri.com'
  )
})

test('clicking the button calls event handler once', async () => {
  const blog = {
    author: 'Kimmo Saarinen',
    title: 'Component testing is cool',
    url: 'www.harri.com',
    likes: 2
  }

  const component = render(
    <Blog blog={blog} />
  )

  const button = component.getByText('show')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'www.harri.com'
  )
  expect(component.container).toHaveTextContent(
    '2'
  )
})

