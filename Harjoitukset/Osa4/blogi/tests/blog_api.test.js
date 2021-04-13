const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Note = require('../models/blog')

beforeEach(async () => {
  await Note.deleteMany({})
  await Note.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned notes', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(titles).toContain(
    'Canonical string reduction'
  )
})

test('blog identification is "id"', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('a blog can be added ', async () => {
  const newBlog = {
    title: 'blogs are cool',
    author: 'Teemu Selanne',
    url: 'http://www.teemu.selanne.com',
    likes: 66
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAfterAdd = await helper.blogsInDB()

  expect(blogsAfterAdd).toHaveLength(helper.initialBlogs.length + 1)
  const titles = blogsAfterAdd.map(n => n.title)
  expect(titles).toContain('blogs are cool')
})

test('a blog without likes will have 0 likes ', async () => {
  const newBlog = {
    title: 'blogs are not cool',
    author: 'Mika hakkinen',
    url: 'http://www.hakkinen.mika.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAfterAdd = await helper.blogsInDB()

  const addedBlog = blogsAfterAdd.filter(n => n.title === 'blogs are not cool')
  expect(addedBlog[0].likes).toBe(0)
})

test('a blog without a title is not added ', async () => {
  const newBlog = {
    author: 'Mika hakkinen',
    url: 'http://www.hakkinen.mika.com',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAfterAdd = await helper.blogsInDB()

  expect(blogsAfterAdd).toHaveLength(helper.initialBlogs.length)
})

test('a blog without a url is not added ', async () => {
  const newBlog = {
    title: 'Adding blogs',
    author: 'Mika hakkinen',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAfterAdd = await helper.blogsInDB()

  expect(blogsAfterAdd).toHaveLength(helper.initialBlogs.length)
})



afterAll(() => {
  mongoose.connection.close()
})