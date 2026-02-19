Cypress.Commands.add('validacaoArrayMatricial', (valorDado, indexDado, dataTest, indexCampo) => {
    cy.get(`[data-testid="${dataTest}"]`)
        .eq(indexDado)
        .should('be.visible')
        .invoke('text')
        .then(text => {
            const textoTratado = text
                .replace(/\u00a0/g, ' ')
                .replace(/&nbsp;/g, ' ')
                .replace(/[<>]/g, '')
                .replace(/\s+/g, ' ')
                .trim()

            expect(textoTratado).to.eq(valorDado[indexCampo])
        })
})