descibre('Deve validar as linhas e colunas da tabela, cada uma com situações diferentes', () => {
    it('Validando situação', () => {
        cy.abrirModalItens()
        cy.validaQuantidadesMinimo()
        cy.validaQuantidadeErroEmbalagem()
        cy.validaQuantidade(true)
        cy.validaQuantidadeErroMinimo()

    })
})