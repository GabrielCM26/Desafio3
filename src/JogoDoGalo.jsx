import { useJogoDoGalo } from "./useJogoDoGalo";
import "./JogoDoGalo.css";

const casaVazia = " ";

export default function JogoDoGalo() {

     const { jogo, verificarFimDoJogo, adicionarJogada, verificarVencedor, reiniciarJogo } = useJogoDoGalo();

    const fimDoJogo = verificarFimDoJogo(jogo);
    const vencedor = verificarVencedor(jogo);

    return (
        <div className="jogo-container">
            <h2>Jogador atual: {jogo.jogadorAtual}</h2>

            <div className="tabuleiro">
                {jogo.tabuleiro.map((linha, i) => (
                    <div key={i} className="linha">
                        {linha.map((casa, j) => (
                            <button
                                key={j}
                                className="casa"
                                onClick={() => adicionarJogada(jogo, jogo.jogadorAtual, i, j)}
                            >
                                {casa === "X" && <img src="/chorax.jpeg" alt="X" />}
                                {casa === "O" && <img src="/bananex.png" alt="O" />}
                            </button>
                        ))}
                    </div>
                ))}
            </div>

            {/* Game result message */}
            {fimDoJogo && (
                <h3>
                    {vencedor ? `Vencedor: ${vencedor}` : "Não existe um vencedor!"}
                </h3>
            )}

            {/* Reiniciar button always visible under the board */}
            <button id="reiniciar" onClick={() => reiniciarJogo()}>
            </button>
        </div>
    );
}

