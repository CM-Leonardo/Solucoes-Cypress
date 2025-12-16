import { preparaAmbienteAPI } from "../tratandoCodigo.cy"


describe('Deve excluir Lojas, Fornecedores e Laboratorios vinculados no usuário, para garantir um ambiente limpo.', () => {
    it('Excluir as lojas, fornecedores e laboratorios setados', () => {
        preparaAmbienteAPI(
             DADOS.LOJA,
            [DADOS.FORNECEDOR, DADOS.FORNECEDOR, DADOS.FORNECEDOR],
            DADOS.LABORATORIO
        )
    })
})