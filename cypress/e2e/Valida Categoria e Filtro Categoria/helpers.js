export function validaExibicaoBotoesCategoria() {

    const mapaEsperado = { 
        "RESPONDIDA": "Respondida",
        "USUARIO_SENHA": "Usuário e/ou senha inválido.",
        "NAO_ATENDE": "Verificar resposta",
        "ESTOQUE": "Não possui os itens em estoque",
        "AGUARDANDO": "Aguardando",
        "VENCIDA": "Vencida",
        "ATRASADA": "Atrasada"
    }

    cy.getBotoesCategoria()
        .should('be.visible')
        .each(($el) => {

            const testid = $el.attr('data-testid')
            const categoria = testid.replace('container-button-', '')
            const textoEsperado = mapaEsperado[categoria]

            expect(textoEsperado, `Categoria mapeada para ${categoria}`)
                .to.not.be.undefined

            cy.wrap($el)
                .find('[aria-label]')
                .invoke('attr', 'aria-label')
                .then((textoTooltip) => {
                    expect(textoTooltip.trim()).to.eq(textoEsperado)
                })
        })
}

/* 
================
FILTRO CATEGORIA
================
*/

export function validaFiltroCategoria() {

    cy.getBotoesCategoria()
        .each(($value, index) => {

            const value = $value.text().trim()
            const valor = Number(value)

            const testid = $value.attr('data-testid')
            const categoria = testid.replace('container-button-', '')

            if (valor > 0) {
                checagemDeRespostasCategoria(index)
            } else {
                cy.log(`Categoria ${categoria} não possui registro`)
            }
        })
}


function checagemDeRespostasCategoria(index) {

    const map = {
        "RESPONDIDA": "success",
        "USUARIO_SENHA": "integration",
        "NAO_ATENDE": "error",
        "ESTOQUE": "estoque",
        "AGUARDANDO": "information",
        "VENCIDA": "warning",
        "ATRASADA": "delayed"
    }

    cy.get('[data-testid^="container-button-"]')
        .eq(index)
        .then(($el) => {

            const testid = $el.attr('data-testid')
            const categoria = testid.replace('container-button-', '')
            const tipoEsperado = map[categoria]

            cy.clicarBotaoCategoriaPorIndice(index)

            cy.getTipoSinalizador().then((sinalizadorTipo) => {

                if (sinalizadorTipo === tipoEsperado) {
                    cy.log(`Categoria ${categoria} validada (${tipoEsperado})`)
                    expect(sinalizadorTipo).to.equal(tipoEsperado)
                } else {
                    cy.fail(
                        `Categoria ${categoria} incorreta: esperava ${tipoEsperado}, recebeu ${sinalizadorTipo}`
                    )
                }
            })

            cy.clicarBotaoCategoriaPorIndice(index)
        })
}
