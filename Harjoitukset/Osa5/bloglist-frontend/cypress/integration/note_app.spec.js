describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Sauli Niinistö',
      username: 'NSaul',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('When logged in',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('NSaul')
      cy.get('#password').type('test')
      cy.get('#login-button').click()

      cy.contains('Sauli Niinistö logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('NSaul')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'NSaul', password: 'test' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()

      cy.get('#title').type('mysteries of the cypress hill')
      cy.get('#author').type('Big T')
      cy.get('#url').type('www.BigAssT.com')
      cy.get('#createButton').click()

      cy.contains('mysteries of the cypress hill Big T')

    })

    it('A blog can be liked', function() {
      cy.createBlog({ title: 'why do anything', author: 'Jhonny Walker', url: 'www.tuni.fi' })
      cy.contains('show').click()
      cy.contains('like').click()

      cy.contains('1')
    })

    it.only('A blog can be deleted', function() {
      cy.createBlog({ title: 'why do anything', author: 'Jhonny Walker', url: 'www.tuni.fi' })
      cy.contains('show').click()
      cy.contains('delete').click()

      cy.get('html').should('not.contain', 'why do anything')
    })
  })
})