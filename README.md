# SOLUÇÕES CYPRESS

## 🎯 Objetivo do repositório

Este repositório foi criado como um **acervo de soluções reais para problemas reais em automação com Cypress**.

Os códigos aqui **não fazem parte de um único sistema nem dependem entre si**. Cada pasta e cada conjunto de testes representam **uma solução independente** encontrada para um tipo específico de problema enfrentado no dia a dia.

A proposta **não é mostrar um projeto Cypress completo**, mas sim documentar **estratégias, abordagens e decisões técnicas** que funcionaram em cenários onde abordagens mais simples ou “padrão de curso” não foram suficientes.

---

## 🧠 Filosofia do repositório

* Cada solução nasce de um problema concreto
* Não há dependência entre módulos
* O foco é **lógica, estratégia e estrutura**, não apenas sintaxe
* O código prioriza legibilidade e previsibilidade de teste

Este repositório existe porque muitos cursos ensinam *como usar o Cypress*, mas não ensinam *como pensar testes em cenários reais*.

---

## 📁 Estrutura geral

```text
cypress/
 ├─ e2e/
 │   ├─ Limpando Ambiente/
 │   │   ├─ limpaAmbiente.js          # Preparação de ambiente via API
 │   │   └─ limpandoAmbiente.cy.js    # Spec que consome a limpeza
 │   │
 │   ├─ LoginAPI/
 │   │   ├─ loginApi.js               # Login via API e retorno do JWT
 │   │   └─ logando.cy.js              # Spec de uso do login via API
 │   │
 │   ├─ Valida Categoria e Filtro/
 │   │   ├─ commands.js               # Ações de alto nível (UI / comportamento)
 │   │   ├─ helpers.js                # Mapas e regras de validação
 │   │   └─ validandoCategoria.cy.js  # Spec de validação de categorias
 │   │
 │   ├─ Valida Linha x Coluna/
 │   │   ├─ commands.js               # Ações de validação da tabela
 │   │   ├─ helpers.js                # Lógica para identificar tipo de linha
 │   │   └─ validandoTabela.cy.js     # Spec de validação da tabela
 │ 
 ├─ fixtures/
 │   └─ example.json
 │
 ├─ support/
 │   ├─ Estrutura de dados para teste/
 │   │   └─ envVariaveis.js            # Centralização de dados e variáveis
 │   ├─ commands.js                   # Registro global de Cypress.Commands
 │   └─ e2e.js
 │
 └─ cypress.config.js
```

Cada pasta dentro de `e2e` representa **uma solução independente**, criada a partir de um problema específico.

---

## 🔹 Limpando Ambiente

### Problema

Em alguns testes de vínculo (ex: loja, fornecedor, laboratório), o cenário exige que **não exista nenhum vínculo prévio**. Caso o vínculo já exista, o teste falha — mesmo que a funcionalidade esteja correta.

Isso torna o teste:

* Frágil
* Dependente de estado
* Difícil de reexecutar

---

### Solução adotada

Foi criado um comando de **preparação de ambiente via API**, responsável por:

* Verificar se já existem vínculos
* Excluir vínculos existentes quando necessário
* Garantir que o teste sempre comece em um estado conhecido

A função recebe como parâmetro:

* Loja
* Fornecedores
* Laboratório

E valida cada um antes da execução do teste principal.

---

### Arquivos

#### `limpaAmbiente.js`

Contém toda a lógica de:

* Login via API
* Busca de vínculos
* Exclusão condicional

Não valida UI. Atua apenas como **preparação de cenário**.

---

#### `limpandoAmbiente.cy.js`

Spec que consome a limpeza de ambiente como pré-condição do teste.

O teste em si não precisa saber **como** o ambiente foi limpo — apenas que ele está pronto.

---

## 🔹 Login via API

### Problema

No ambiente onde os testes foram executados:

* `cy.session()` não funcionava de forma confiável
* O login via UI era lento
* Repetir login a cada teste aumentava drasticamente o tempo de execução

---

### Solução adotada

Foi implementado um login **100% via API**, com captura do `jwtToken` e injeção direta no contexto da aplicação.

Isso permite:

* Redução significativa do tempo de execução
* Independência da UI de login
* Maior estabilidade dos testes

---

### Arquivos

#### `loginApi.js`

Responsável por:

* Realizar login via API
* Retornar o JWT Token
* Centralizar autenticação

---

#### `logando.cy.js`

Spec de validação e uso do login via API.

Aqui fica apenas o fluxo de teste, não a lógica de autenticação.

---

## 🔹 Validação de Categorias e Filtro

### Problema

Validações envolvendo:

* Múltiplos botões de categoria
* Tooltips dinâmicos
* Filtros condicionais
* Relação entre categoria e sinalizador visual

Esses cenários rapidamente geram código repetido e difícil de manter.

---

### Solução adotada

Separação clara entre:

* **Commands** → ações de alto nível (ex: validar categorias, aplicar filtro)
* **Helpers** → mapas, regras e lógica de validação

Uso intensivo de:

* Mapas de categoria → texto esperado
* Mapas de categoria → tipo de sinalizador

---

### Arquivos

#### `helpers.js`

Contém:

* Mapas de categoria
* Regras de correspondência
* Lógica pura de validação

Não executa ações na UI.

---

#### `commands.js`

Define comandos Cypress como:

* Validação dos botões de categoria
* Aplicação de filtros
* Validação dos resultados filtrados

Esses comandos representam **comportamentos**, não regras internas.

---

#### `validandoCategoria.cy.js`

Spec que descreve o cenário de negócio:

* Exibição das categorias
* Aplicação do filtro
* Validação do resultado

A leitura do teste deve ser autoexplicativa.

---

## 🔹 Validação Linha x Coluna (Tabelas Complexas)

### Problema

Tabelas com regras complexas:

* Quantidade mínima
* Erro de embalagem
* Erro de mínimo
* Comportamento diferente para pedido automático

Misturar tudo isso em um único teste torna o código ilegível.

---

### Solução adotada

* Múltiplas varreduras da tabela
* Separação por tipo de linha
* Uso de índices para garantir alinhamento linha × input × embalagem

A lógica foi separada para permitir manutenção sem quebrar outros cenários.

---

### Arquivos

#### `helpers.js`

Responsável por:

* Identificação do tipo da linha
* Extração de valores
* Normalização de texto

---

#### `commands.js`

Encapsula ações como:

* Abrir modal
* Percorrer linhas
* Executar validações conforme o tipo identificado

---

#### `validandoTabela.cy.js`

Spec que apenas descreve **o cenário a ser validado**, sem lógica interna.

---

## 🔹 Estrutura de dados para testes

Para facilitar a escrita, leitura e manutenção dos testes, foi criada uma **estrutura centralizada de dados**, responsável por abstrair variáveis sensíveis e dados de negócio.

Essa estrutura evita:

* Uso direto de `Cypress.env()` espalhado pelo código
* Strings mágicas
* Duplicação de dados entre testes

---

### Arquivo: `envVariaveis.js`

```js
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
```

### Objetivo dessa estrutura

* Centralizar variáveis de ambiente
* Facilitar troca de ambiente (DEV, QA, etc.)
* Tornar os testes mais legíveis
* Evitar dependência direta de valores sensíveis no código

Os testes consomem apenas `USER`, `URL` e `DADOS`, sem precisar conhecer a origem das variáveis.

---

## 📌 Considerações finais

Este repositório não pretende ser:

* Um template oficial
* Um framework
* Um curso

Ele é um **registro prático de decisões técnicas**, com foco em:

* Estabilidade de testes
* Clareza de leitura
* Separação de responsabilidades

Se você já passou por testes frágeis, lentos ou difíceis de manter, as soluções aqui existem exatamente por isso.
