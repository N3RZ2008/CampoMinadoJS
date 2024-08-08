bombas = []
quantidadeDeLinhas = 9
quantidadeDeColunas = 9
quantidadeDeBombas = 10

function criaGrid() {
    bg = document.createElement("div")
    bg.className = "bg"
    bg.id = "bg"
    document.body.appendChild(bg)
    colunaStyle = ""

    for (let i = 0; i <= quantidadeDeLinhas; i++) {
        colunaStyle += "auto "
        for (let j = 0; j <= quantidadeDeColunas; j++) {
            celula = document.createElement("div")
            celula.className = "celula"
            celula.id = `d%${i}&${j}`
            document.getElementById("bg").appendChild(celula)

            celula = document.createElement("img")
            celula.src = "https://minesweeper.online/img/skins/hd/closed.svg?v=3"
            celula.className = "celulaImg"
            celula.id = `c%${i}&${j}`
            document.getElementById(`d%${i}&${j}`).appendChild(celula)

            document.getElementById(`c%${i}&${j}`).addEventListener("click", function () {
                clique(this.id)
            })
        }
    }

    document.getElementById("bg").style.gridTemplateColumns = colunaStyle

    for (let i = 0; i <= quantidadeDeBombas - 1; i++) {
        bombas.push(null)
    }
    count = 0

    while (count < quantidadeDeBombas) {
        bombaPos = `c%${Math.floor(Math.random() * quantidadeDeLinhas) + 1}&${Math.floor(Math.random() * quantidadeDeColunas) + 1}`
        for (let i = 0; i <= quantidadeDeBombas; i++) {
            if (bombas[i] != bombaPos) {
                verify = true
            } else {
                verify = false
                break
            }
        }
        if (verify) {
            bombas[count] = bombaPos
            count += 1
        }
    }
}

function clique(id) {
    if (verificarSeCelulaEstaFechada(id)) {

        if (verificarSeClicouEmUmaBomba(id)){
            //faz alguma coisa mano kkk, o cara se cagou...
            document.getElementById(`${id}`).src = "https://minesweeper.online/img/skins/hd/mine_red.svg?v=3"
            return
        }

        atualizarCelulaSemBomba(id)
    }
}

function verificarSeCelulaEstaFechada(id) {
    celula = document.getElementById(`${id}`)

    if (celula) {
        return document.getElementById(`${id}`).src.includes("closed")
    }

    return undefined
}

function verificarSeClicouEmUmaBomba(id) {
    return bombas.findIndex(b => b == id) > -1
}

function atualizarCelulaSemBomba(id) {
    
    if (!verificarSeCelulaEstaFechada(id)){
        return
    }

    const numero = determinarNumeroCelula(id)

    document.getElementById(`${id}`).src = `https://minesweeper.online/img/skins/hd/type${numero}.svg?v=3`

    if (numero == 0) {
        let coordenadas = obterCoordenada(id)

        const esquerda = `c%${coordenadas[0]}&${coordenadas[1]-1}`
        atualizarCelulaSemBomba(esquerda)
        
        const direita = `c%${coordenadas[0]}&${coordenadas[1]+1}`
        atualizarCelulaSemBomba(direita)
    
        const acima = `c%${coordenadas[0]-1}&${coordenadas[1]}`
        atualizarCelulaSemBomba(acima)
        
        const abaixo = `c%${coordenadas[0]+1}&${coordenadas[1]}`
        atualizarCelulaSemBomba(abaixo)

        const cantoDireitoSuperior = `c%${coordenadas[0]-1}&${coordenadas[1]+1}`
        atualizarCelulaSemBomba(cantoDireitoSuperior)

        const cantoDireitoInferior = `c%${coordenadas[0]+1}&${coordenadas[1]+1}`
        atualizarCelulaSemBomba(cantoDireitoInferior)

        const cantoEsquerdoSuperior = `c%${coordenadas[0]-1}&${coordenadas[1]-1}`
        atualizarCelulaSemBomba(cantoEsquerdoSuperior)

        const cantoEsquerdoInferior = `c%${coordenadas[0]+1}&${coordenadas[1]-1}`
        atualizarCelulaSemBomba(cantoEsquerdoInferior)
    }
}

function determinarNumeroCelula(id) {
    const coordenadas = obterCoordenada(id)

    let numero = 0
    for (i = coordenadas[0] - 1; i <= coordenadas[0] + 1; i++) {
        for (j = coordenadas[1] - 1; j <= coordenadas[1] + 1; j++) {
            for (k = 0; k < quantidadeDeBombas; k++) {
                if (`c%${i}&${j}` == bombas[k]) {
                    numero = numero + 1
                    break
                }
            }
        }
    }

    return numero
}

function obterCoordenada(id) {
    linha = parseInt(id.slice(id.search("%") + 1))
    coluna = parseInt(id.slice(id.search("&") + 1))

    return [linha, coluna]
}
