/// <reference types="cypress"/>
import faker from 'faker';



describe('US-012- Funcionalidade: Cadastro de membros', () => {
  const nomeAleatorio = faker.name.firstName();
  const emailAleatorio = faker.internet.email();
  const sobrenomeAleatorio = faker.name.lastName();
  beforeEach(() => {
    cy.visit('/')
    const emailAleatorio = faker.internet.email();

  });

  it('Deve fazer o cadastro de campos obrigatorios', () => {
    cy.preencherCadastro(nomeAleatorio, sobrenomeAleatorio, emailAleatorio, '9988776655', 'Senha@12345')
    cy.get('#signup-response').should('contain', 'Cadastro realizado com sucesso!')
  })
  

  it('Validar nome em branco', () => {
    cy.preencherCadastro('', sobrenomeAleatorio, emailAleatorio, '9988776655', 'Senha@12345')
    cy.get('#signup-response').should('contain', 'Nome não pode estar vazio')
  })

  it('Validar nome invalido', () => {
    cy.preencherCadastro('Teste20', sobrenomeAleatorio, emailAleatorio, '9988776655', 'Senha@12345')
    cy.get('#signup-response').should('contain', 'Nome deve conter apenas caracteres alfabéticos,')
  })

  it('Validar sobrenome em branco', () => {
    cy.preencherCadastro(nomeAleatorio, '', emailAleatorio, '9988776655', 'Senha@12345')
    cy.get('#signup-response').should('contain', 'Sobrenome não pode estar vazio')
  })

  it('Validar sobrenome invalido', () => {
    cy.preencherCadastro(nomeAleatorio, 'Teste20', emailAleatorio, '9988776655', 'Senha@12345')
    cy.get('#signup-response').should('contain', 'Sobrenome deve conter apenas caracteres alfabéticos,')
  })

  it('Validar email duplicado', () => {
    cy.preencherCadastro(nomeAleatorio, sobrenomeAleatorio, 'email.duplicado@gmail.com', '9988776655', 'Senha@12345')
    cy.get('#signup-response').should('contain', 'Este email já está cadastrado.')
  })

  it('Validar email invalido ', () => {
    cy.preencherCadastro(nomeAleatorio, sobrenomeAleatorio, 'emailinvalido.com', '9988776655', 'Senha@12345')
    cy.get('#signup-response').should('contain', 'E-mail deve ser um email válido')
  })

  it('Validar senha fraca', () => {
    cy.preencherCadastro(nomeAleatorio, sobrenomeAleatorio, emailAleatorio, '9988776655', 'Senha12345')
    cy.get('#signup-response').should('contain', 'Senha deve ter pelo menos 8 caracteres, incluir uma letra maiúscula, um número e um caractere especial (!@#$&*)')
  })

  it('Validar telefone invalido', () => {
    cy.preencherCadastro(nomeAleatorio, sobrenomeAleatorio, emailAleatorio, 'aabbccddee', 'Senha@12345')
    cy.get('#signup-response').should('contain', 'Telefone deve conter apenas números')
  })
})