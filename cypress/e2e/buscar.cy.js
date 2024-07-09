/// <reference types="cypress"/>

describe('US-001- Funcionalidade: Buscar filmes', () => {
    beforeEach(() => {
        cy.visit('/')
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Validar buscar de filmes com sucesso', () => {
        cy.get('#search-input').type('Matrix')
        cy.get('#search-button').click()
        cy.get('#results-section').should('contain', 'Matrix')
    });

    it('Validar buscar de filmes com sucesso de toda a lista', () => {
        cy.fixture('filmes').each((filmes) => {
            cy.get('#search-input').clear().type(filmes.titulo)
            cy.get('#search-button').click({force: true})
            cy.get('#results-section').should('contain', filmes.titulo)
        })
    });

    it('Validar buscar de filmes sem resultados', () => {
        cy.get('#search-input').type('Filme invalido')
        cy.get('#search-button').click()
        cy.get('#results-section > p').should('contain', 'Filme não encontrado.')
    });

    it('Validar Limpar busca de filme', () => {
        cy.get('#search-input').type('Harry Potter')
        cy.get('#search-button').click()
        cy.wait(1000)
        cy.get('#clear-button').click()
        cy.get('#results-section').should('not.contain', 'Harry Potter')
    });

    
});