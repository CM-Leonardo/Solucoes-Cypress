// Verifica se a linha possui quantidade mínima
export function possuiQuantidadeMin($linha) {
    return $linha.find('.css-al5mt5').length > 0
}

// Extrai número da quantidade mínima
export function extrairQuantidadeMinima(texto) {
    return texto.match(/\d+/)[0]
}

// Normaliza texto removendo espaços invisíveis
export function normalizarTexto(texto) {
    return texto.replace(/\u00a0/g, ' ').replace(/\s+/g, '').trim()
}

// Verifica erro de caixa
export function possuiErroCaixa($linha) {
    return $linha.find('[class="problemaEmbalagem inputZero css-wjypcb"]').length > 0
}

// Verifica erro de quantidade mínima
export function possuiErroMinimo($linha) {
    return $linha.find('[class="problemaMinimo inputZero css-wjypcb"]').length > 0
}

// Verifica se linha é normal
export function possuiQuantidadeNormal($linha) {
    return $linha.find('[class="normal css-wjypcb"]').length > 0
}
