/// <reference types="cypress"/>
import faker from 'faker';
const nomeAleatorio = faker.name.findName();
const emailAleatoria = faker.internet.email();
const sobrenomeAleatoria = faker.name.lastName();

describe('US-012- Funcionalidade: Cadastro de membros', () => {
  it('Deve fazer o cadastro de campos obrigatorios', () => {
    cy.visit('http://127.0.0.1:8080/')
    cy.get('#signup-firstname').type(nomeAleatorio )
    cy.get('#signup-lastname').type(sobrenomeAleatoria)
    cy.get('#signup-email').type(emailAleatoria)
    cy.get('#signup-phone').type("123546585")
    cy.get('#signup-password').type("Senha@12345")
    cy.get('#signup-button').click()
    cy.get('#signup-response').should('contain' , 'Cadastro realizado com sucesso!')
  })

  it('Validar nome em branco', () => {
    cy.visit('http://127.0.0.1:8080/')
    cy.get('#signup-lastname').type(sobrenomeAleatoria)
    cy.get('#signup-email').type(emailAleatoria)
    cy.get('#signup-phone').type("123546585")
    cy.get('#signup-password').type("Senha@12345")
    cy.get('#signup-button').click()
    cy.get('#signup-response').should('contain' , 'Nome não pode estar vazio')
  })

  it('Validar sobrenome em branco', () => {
    cy.visit('http://127.0.0.1:8080/')
    cy.get('#signup-firstname').type(nomeAleatorio )
    cy.get('#signup-email').type(emailAleatoria)
    cy.get('#signup-phone').type("123546585")
    cy.get('#signup-password').type("Senha@12345")
    cy.get('#signup-button').click()
    cy.get('#signup-response').should('contain' , 'Sobrenome não pode estar vazio')
  })

  it('Validar email duplicado', () => {
    cy.visit('http://127.0.0.1:8080/')
    cy.get('#signup-firstname').type(nomeAleatorio)
    cy.get('#signup-lastname').type(sobrenomeAleatoria)
    cy.get('#signup-email').type("email.duplicado@gmail.com")
    cy.get('#signup-phone').type("123546585")
    cy.get('#signup-password').type("Senha@12345")
    cy.get('#signup-button').click()
    cy.get('#signup-response').should('contain' , 'Este email já está cadastrado.')
  })

  it('Validar email invalido ', () => {
    cy.visit('http://127.0.0.1:8080/')
    cy.get('#signup-firstname').type(nomeAleatorio)
    cy.get('#signup-lastname').type(sobrenomeAleatoria)
    cy.get('#signup-email').type("emailinvalido.com")
    cy.get('#signup-phone').type("123546585")
    cy.get('#signup-password').type("Senha@12345")
    cy.get('#signup-button').click()
    cy.get('#signup-response').should('contain' , 'E-mail deve ser um email válido')
  })

  it('Validar senha fraca', () => {
    cy.visit('http://127.0.0.1:8080/')
    cy.get('#signup-firstname').type(nomeAleatorio)
    cy.get('#signup-lastname').type(sobrenomeAleatoria)
    cy.get('#signup-email').type(emailAleatoria)
    cy.get('#signup-phone').type("123546585")
    cy.get('#signup-password').type("senha123")
    cy.get('#signup-button').click()
    cy.get('#signup-response').should('contain' , 'Senha deve ter pelo menos 8 caracteres, incluir uma letra maiúscula, um número e um caractere especial (!@#$&*)')
  })

  it('Validar telefone invalido', () => {
    cy.visit('http://127.0.0.1:8080/')
    cy.get('#signup-firstname').type(nomeAleatorio )
    cy.get('#signup-lastname').type(sobrenomeAleatoria)
    cy.get('#signup-email').type(emailAleatoria)
    cy.get('#signup-phone').type("AABBCCDDEE")
    cy.get('#signup-password').type("Senha@12345")
    cy.get('#signup-button').click()
    cy.get('#signup-response').should('contain' , 'Telefone deve conter apenas números')
  })
})