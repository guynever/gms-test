/// <reference types="cypress"/>

describe('US-015- Funcionalidade: Recomendações', () => {
    beforeEach(() => {
        cy.visit('/')
    });

    it('Exibir lista de recomendações do dia', () => {
        cy.get('.intro-section').should('be.visible')
        cy.get('#recommendations-section > h2').should('contain', 'RECOMENDAÇÕES DO DIA')
        cy.get('#recommendations')
        cy.get('#recommendations').find('div:not([id])').should('have.length', 5)
      })
    })