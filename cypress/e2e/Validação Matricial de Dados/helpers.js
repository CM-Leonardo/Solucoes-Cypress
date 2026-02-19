 export function validacaoMatricial(array0, array1){

    array0.forEach((valoresDados, indexDados) => {
        array1.forEach((dataTest, indexCampo) => {

            cy.validacaoArrayMatricial(
                valoresDados, indexDados,
                dataTest, indexCampo
            )
        })
    })
}