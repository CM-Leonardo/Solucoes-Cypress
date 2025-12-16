export const USER = {
    EMAIL: Cypress.env("USUARIO")["USER_EMAIL"],
    PASSWORD: Cypress.env("USUARIO")["USER_PASSWORD"]
}

export const URL = {
    DEV: Cypress.env("URL")["DEV"],
    API_BASE: Cypress.env("URL")["API_BASE"],
    API_LOJA: Cypress.env("URL")["API_LOJA"]
}

export const DADOS = {
    LOJA : {
        LOJA1: Cypress.env("DADOS").LOJA.LOJA1,
        LOJA2: Cypress.env("DADOS").LOJA.LOJA2,
        LOJA3: Cypress.env("DADOS").LOJA.LOJA3
    },
    FORNECEDOR : {
        FORNECEDOR1:{
            NOME: 'Fornecedor 1',
            CNPJ: Cypress.env("DADOS").FORNECEDOR.CNPJ
        },
        FORNECEDOR2: {
            NOME: 'Fornecedor 2',
            CNPJ: Cypress.env("DADOS").FORNECEDOR.CNPJ,
            USER: Cypress.env("DADOS").FORNECEDOR.USER,
            PASSWORD: Cypress.env("DADOS").FORNECEDOR.PASSWORD
        },
        FORNECEDOR3: {
            NOME: 'Fornecedor 3',
            CNPJ: Cypress.env("DADOS").FORNECEDOR.CNPJ,
            USER: Cypress.env("DADOS").FORNECEDOR.USER,
            PASSWORD: Cypress.env("DADOS").FORNECEDOR.PASSWORD 
        }
    },
    LAB: {
        LABORATORIO1: {
            NOME : Cypress.env("DADOS").LAB.NOME,
            USER: Cypress.env("DADOS").LAB.USER,
            PASSWORD: Cypress.env("DADOS").LAB.PASSWORD
        }
    }
}
