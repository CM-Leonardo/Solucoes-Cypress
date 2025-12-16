import { loginAPI } from "./loginApi"

//método de login para quando a função cy.session não funciona no ambiente de teste
describe('Deve gerar um jwtToken e injetar-lo no localStorage para executar o login sem a necessidade de passar pelo front-end', () => {
    beforeEach(() => {
        loginAPI
    })
    it('Deve cair diretamente na pagina e logado', () => {
        cy.visit('/')
    })
})