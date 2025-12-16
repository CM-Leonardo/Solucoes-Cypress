import { URL, USER } from "../utils/envVariaveis";

// Setup de ambiente via API: remove vínculos existentes antes do teste
export function preparaAmbienteAPI(cnpjLoja, fornecedores = [], laboratorio) {
    login().then((resp) => {
        excluirLojaAPI(resp, cnpjLoja)
        excluirFornecedorAPI(resp, fornecedores)
        excluirLaboratorioAPI(resp, laboratorio)
    })
}

// Autentica o usuário e retorna o token JWT
function login() {
    return cy.request({
        method: "POST",
        url: `${URL.API_BASE}`,
        headers: { Platform: "teste" },
        body: {
            email: USER.EMAIL,
            password: USER.PASSWORD
        }
    })
}

// Remove o vínculo da loja informada, caso exista
function excluirLojaAPI(resp, cnpjPontuacao) {
    const acessToken = resp.body.jwtToken
    const cnpjLoja = String(cnpjPontuacao).replace(/\D/g, '')

    cy.request({
        method: "GET",
        url: `${URL.API_BASE}/teste/teste`,
        headers: { Platform: "teste", Authorization: `Bearer ${acessToken}` },
    }).then((resp) => {
        const lojas = resp.body.content.map(item => ({
            id: item.id,
            cnpj: String(item.cnpj).replace(/\D/g, '')
        }))

        const lojaExclusao = lojas.find(l => l.cnpj === cnpjLoja)

        if (lojaExclusao) {
            cy.request({
                method: "DELETE",
                url: `${URL.API_BASE}/teste/${lojas.id}desvincularLoja`,
                headers: { Platform: "teste", Authorization: `Bearer ${acessToken}` }
            })
        }
    })
}

// Remove vínculos dos fornecedores informados
function excluirFornecedorAPI(resp, fornecedores = []) {
    const acessToken = resp.body.jwtToken
    const cnpjsExclusao = fornecedores.map(f =>
        String(f.CNPJ).replace(/\D/g, '')
    )

    cy.request({
        method: "GET",
        url: `${URL.API_BASE}/teste/teste`,
        headers: { Platform: "teste", Authorization: `Bearer ${acessToken}` },
    }).then((resp) => {
        const fornecedoresAPI = resp.body.content.map(item => ({
            id: item.id,
            cnpj: String(item.cnpj).replace(/\D/g, '')
        }))

        const fornecedoresExclusao = fornecedoresAPI.filter(f =>
            cnpjsExclusao.includes(f.cnpj)
        )

        fornecedoresExclusao.forEach(({ id }) => {
            cy.request({
                method: "DELETE",
                url: `${URL.API_BASE}/teste/${id}/desvincularFornecedor`,
                headers: { Platform: "teste", Authorization: `Bearer ${acessToken}` }
            })
        })
    })
}

// Remove o vínculo do laboratório informado
function excluirLaboratorioAPI(resp, laboratorio) {
    const acessToken = resp.body.jwtToken

    cy.request({
        method: "GET",
        url: `${URL.API_BASE}/teste/teste`,
        headers: { Platform: "teste", Authorization: `Bearer ${acessToken}` }
    }).then((resp) => {
        const laboratorioExclusao = resp.body.content.find(
            lab => lab.name === laboratorio.NOME
        )

        if (laboratorioExclusao) {
            cy.request({
                method: "DELETE",
                url: `${URL.API_BASE}teste/${laboratorio.id}/desvincularLaboratorio`,
                headers: { Platform: "pedpreco", Authorization: `Bearer ${acessToken}` }
            })
        }
    })
}
