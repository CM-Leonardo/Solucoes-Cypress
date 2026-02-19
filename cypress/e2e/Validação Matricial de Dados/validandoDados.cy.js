import * as constants from '../../support/Estrura de dados para teste/constants'
import * as dataTest from '../../support/Estrura de dados para teste/dataTest'
import { validacaoMatricial } from './helpers'


describe('Validação matricial de dados em tabela com estrutura repetida (linha x coluna)', () => {
    it('Deve validar todos os campos da tabela comparando matriz de valores esperados com os seletores das colunas', () => {
        validacaoMatricial(
            constants.tabelaAgrupamentoDadosGenerica,
            dataTest.arrayDataTestTabelaExemplo
        )
    })
})