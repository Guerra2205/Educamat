/* ============ 2. "MODELO": árvore de decisão ============ */
// Entrada: número de acertos (0 a 3). Saída: nível de dificuldade.
function classificarDificuldade(acertos) {
  if (acertos === 3) {
    return { nivel: "baixa", rotulo: "Domina o assunto", prioridade: 0 };
  } else if (acertos === 2) {
    return { nivel: "media", rotulo: "Precisa revisar", prioridade: 1 };
  } else {
    return { nivel: "alta", rotulo: "Dificuldade alta", prioridade: 2 };
  }
}
