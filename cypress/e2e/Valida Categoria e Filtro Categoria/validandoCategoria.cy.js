import { validaExibicaoBotoesCategoria, validaFiltroCategoria } from "./helpers"

describe('Deve validar as categorias exibidas e aplicar os filtros de categoaria. Depois valida se a filtragem corresponde ao dados', () => {
    it('Valida filtros e categorias', () => {
        validaExibicaoBotoesCategoria()
        validaFiltroCategoria()
    })
})