import {
    possuiQuantidadeMin,
    extrairQuantidadeMinima,
    normalizarTexto,
    possuiErroCaixa,
    possuiErroMinimo,
    possuiQuantidadeNormal
} from '../Valida Linha x Coluna/helpers'

Cypress.Commands.add('abrirModalItens', () => {
    cy.get('[data-testid="filial-pedido-automatico"]').eq(1).click()
})

Cypress.Commands.add('validaQuantidadesMinimo', () => {

    cy.abrirModalItens()

    cy.get('.css-35ngmc').as('quantidade')
        .each(($linha, $index) => {

            if (possuiQuantidadeMin($linha)) {

                const campoQuantidadeMin = $linha.find('.css-al5mt5').text()
                const quantidadeMinima = extrairQuantidadeMinima(campoQuantidadeMin)

                cy.get('@quantidade', { log: false })
                    .eq($index)
                    .should('contain', `Mín ${quantidadeMinima} un`)

                cy.get('[class="css-2mwk7f"] input', { log: false })
                    .eq($index)
                    .should('have.value', quantidadeMinima)

                cy.get('[class="css-l04u0o esuxo860"]', { log: false })
                    .eq($index)
                    .invoke('text')
                    .then((text) => {
                        const embalagem = normalizarTexto(text)
                        expect(embalagem).to.eq(quantidadeMinima + 'un')
                    })
            }
        })
})

Cypress.Commands.add('validaQuantidadeErroEmbalagem', () => {

    cy.get('[class="css-2mwk7f"]', { log: false }).each(($linha, $index) => {

        if (possuiErroCaixa($linha)) {

            cy.get('[class="css-2mwk7f"] input', { log: false })
                .eq($index)
                .should('contain.value', '0')
                .and('have.css', 'color', 'rgb(213, 0, 0)')

            cy.get('[class="css-l04u0o esuxo860"]', { log: false })
                .eq($index)
                .invoke('text')
                .then((texto) => {
                    expect(texto.replace(/\u00a0/g, ' ').trim())
                        .to.eq('0 cx c/ 21 un')
                })
        }
    })
})

Cypress.Commands.add('validaQuantidade', (pedidoAutomatico = false) => {

    if (pedidoAutomatico) {

        const indiceCampoSemMinimo = []

        cy.get('.css-35ngmc', { log: false })
            .as('quantidade')
            .each(($linha, $index) => {
                if (!possuiQuantidadeMin($linha)) {
                    indiceCampoSemMinimo.push($index)
                }
            })
            .then(() => {

                const indiceCampoNormal = []

                indiceCampoSemMinimo.forEach((indice) => {
                    cy.get('.css-2mwk7f', { log: false })
                        .eq(indice)
                        .then(($linha) => {
                            if (!possuiErroCaixa($linha)) {
                                indiceCampoNormal.push(indice)
                            }
                        })
                })

                cy.then(() => {
                    cy.wrap(indiceCampoNormal, { log: false }).each((indice) => {

                        cy.get('@quantidade', { log: false })
                            .eq(indice)
                            .invoke('text')
                            .then((text) => {

                                const valor = text.trim()

                                cy.get('@quantidade').eq(indice).should('contain', valor)

                                cy.get('[class="css-2mwk7f"] input')
                                    .eq(indice)
                                    .should('have.value', valor)

                                cy.get('[class="css-l04u0o esuxo860"]')
                                    .eq(indice)
                                    .should('contain', valor)
                            })
                    })
                })
            })
    } else {

        cy.get('.css-2mwk7f').each(($linha, $index) => {

            if (possuiQuantidadeNormal($linha)) {

                cy.get('.css-35ngmc').as('quantidade')
                    .eq($index)
                    .invoke('text')
                    .then((text) => {

                        const valor = text.trim()

                        cy.get('@quantidade').eq($index).should('contain', valor)

                        cy.get('[class="css-2mwk7f"] input')
                            .eq($index)
                            .should('have.value', valor)

                        cy.get('[class="css-l04u0o esuxo860"]')
                            .eq($index)
                            .should('contain', `${valor} un`)
                    })
            }
        })
    }
})

Cypress.Commands.add('validaQuantidadeErroMinimo', () => {

    cy.abrirModalItens()

    cy.get('.css-2mwk7f').each(($linha, $index) => {

        if (possuiErroMinimo($linha)) {

            cy.get('[class="css-2mwk7f"] input', { log: false })
                .eq($index)
                .should('contain.value', '0')

            cy.get('[class="css-l04u0o esuxo860"]', { log: false })
                .eq($index)
                .invoke('text')
                .then((texto) => {
                    expect(texto.replace(/\u00a0/g, ' ').trim()).to.eq('0 un')
                })
        }
    })
})
