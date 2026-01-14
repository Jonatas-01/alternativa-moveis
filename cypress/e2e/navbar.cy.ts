Cypress.on('uncaught:exception', (err) => {
  // Ignore hydration errors in development
  if (err.message.includes('Hydration failed')) {
    return false
  }
})

describe('Navbar Links', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display all navigation links', () => {
    cy.get('nav').within(() => {
      cy.contains('Início').should('be.visible')
      cy.contains('Catálogo').should('be.visible')
      cy.contains('Sobre Nós').should('be.visible')
    })
  })

  it('should navigate to home page when clicking "Início"', () => {
    cy.contains('a', 'Início').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('should navigate to catalogo page when clicking "Catálogo"', () => {
    cy.contains('a', 'Catálogo').click()
    cy.url().should('include', '/catalogo')
  })

  it('should navigate to sobre nos page when clicking "Sobre Nós"', () => {
    cy.contains('a', 'Sobre Nós').click()
    cy.url().should('include', '/sobre-nos')
  })

  it('should highlight the active link', () => {
    // On home page, "Início" should be active
    cy.contains('a', 'Início').should('have.class', 'border-b-2')

    // Navigate to catalog and check active state
    cy.contains('a', 'Catálogo').click()
    cy.contains('a', 'Catálogo').should('have.class', 'border-b-2')
    cy.contains('a', 'Início').should('not.have.class', 'border-b-2')

    // Navigate to about us and check active state
    cy.contains('a', 'Sobre Nós').click()
    cy.contains('a', 'Sobre Nós').should('have.class', 'border-b-2')
    cy.contains('a', 'Catálogo').should('not.have.class', 'border-b-2')
  })

  it('should have WhatsApp button with correct link', () => {
    cy.contains('a', 'Solicitar Orçamento')
      .should('have.attr', 'href')
      .and('include', 'api.whatsapp.com')
  })
})