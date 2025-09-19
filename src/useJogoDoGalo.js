import { useState } from "react";

const casaVazia = " ";
const jogoVazio = {
    tabuleiro: [
        [casaVazia, casaVazia, casaVazia],
        [casaVazia, casaVazia, casaVazia],
        [casaVazia, casaVazia, casaVazia],
    ],
    jogadorAtual: "X"
};

export function useJogoDoGalo() {

    const [state, setState] = useState(jogoVazio);

    function adicionarJogada(jogo, jogador, linha, coluna) {
        setState(estadoAnterior => {
            // Verificar se a casa está vazia
            if (estadoAnterior.tabuleiro[linha][coluna] !== casaVazia) {
                return estadoAnterior; // Não fazer nada se casa ocupada
            }

            // Criar novo tabuleiro com cópia profunda
            const novoTabuleiro = estadoAnterior.tabuleiro.map(linhaArray => [...linhaArray]);
            novoTabuleiro[linha][coluna] = estadoAnterior.jogadorAtual;

            const novoEstado = {
                tabuleiro: novoTabuleiro,
                jogadorAtual: estadoAnterior.jogadorAtual === "X" ? "O" : "X"
        };

        // Tocar som do jogador
        new Audio(estadoAnterior.jogadorAtual === "X" ? "/x.mp3" : "/bananex.mp3").play();

        // Verificar fim do jogo (qualquer resultado)
        if (verificarFimDoJogo(novoEstado)) {
            new Audio("/tremeliques.mp3").play(); // Toca independente de quem ganhou
        }

        return novoEstado;
    });
}

function verificarVencedor(jogo) {
    const sequencias = obtemSequencias(jogo);
    if (sequencias.includes("XXX")) return "X";
    if (sequencias.includes("OOO")) return "O";
    return undefined;
}

function obtemSequencias(jogo) {
    // [XXX", "___", "___", "___", "___", "___", "___", "___"]
    return obtemLinhas(jogo)
        .concat(obtemColunas(jogo))
        .concat(obtemDiagonais(jogo));
}

function obtemLinhas(jogo) {
    let linhas = [];

    for (let i = 0; i < jogo.tabuleiro.length; i++) {
        linhas.push(jogo.tabuleiro[i].join(""));
    }
    return linhas;
}

function obtemColunas(jogo) {
    let colunas = [];

    for (let i = 0; i < jogo.tabuleiro.length; i++) {
        let coluna = "";
        for (let j = 0; j < jogo.tabuleiro.length; j++) {
            coluna += jogo.tabuleiro[j][i];
        }
        colunas.push(coluna);
    }
    return colunas;
}

function obtemDiagonais(jogo) {
    let diagonais = ["", ""];

    for (let i = 0; i < jogo.tabuleiro.length; i++) {
        diagonais[0] += jogo.tabuleiro[i][i];
        diagonais[1] += jogo.tabuleiro[i][jogo.tabuleiro.length - 1 - i];
    }
    return diagonais;
}

function obterJogadasPossiveis(jogo) {
    let jogadasPossiveis = [];

    for (let linha = 0; linha < jogo.tabuleiro.length; linha++) {
        for (let coluna = 0; coluna < jogo.tabuleiro[linha].length; coluna++) {
            if (jogo.tabuleiro[linha][coluna] === casaVazia) {
                jogadasPossiveis.push({ linha: linha, coluna: coluna });
            }
        }
    }

    return jogadasPossiveis;
}

function verificarFimDoJogo(jogo) {
    return obterJogadasPossiveis(jogo).length === 0
        || verificarVencedor(jogo) !== undefined;
}

function reiniciarJogo() {
    setState(jogoVazio);
}

return {
    jogo: state,
    verificarFimDoJogo,
    adicionarJogada,
    verificarVencedor,
    reiniciarJogo
};
}