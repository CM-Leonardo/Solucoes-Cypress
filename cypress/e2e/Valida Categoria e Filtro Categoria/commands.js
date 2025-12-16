Cypress.Commands.add('getBotoesCategoria', () => {
    return cy.get('[data-testid="container-buttons-categorias-pedido-resumo"]')
        .find('[data-testid^="container-button-"]')
})

Cypress.Commands.add('clicarBotaoCategoriaPorIndice', (index) => {
    cy.get('[data-testid^="container-button-"]')
        .eq(index)
        .click()
        .wait(1500)
})

Cypress.Commands.add('getTipoSinalizador', () => {
    return cy.get('[data-testid^=sinalizadores-bloco-]')
        .first()
        .then(($sinalizador) => {
            const span = $sinalizador.get(0).querySelector('span')
            return span.getAttribute('type')
        })
})