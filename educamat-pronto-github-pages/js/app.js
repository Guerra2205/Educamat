/* ============ 3. SORTEIO: montar um teste novo ============ */
function embaralhar(lista) {
  const copia = lista.slice();
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const troca = copia[i]; copia[i] = copia[j]; copia[j] = troca;
  }
  return copia;
}

let prova = []; // guarda o teste atual: assuntos sorteados com suas questões

function montarProva() {
  prova = embaralhar(assuntos).slice(0, ASSUNTOS_POR_TESTE).map(function (assunto) {
    const questoes = embaralhar(assunto.banco).slice(0, QUESTOES_POR_ASSUNTO).map(function (q) {
      // marca qual opção é a certa (a primeira do banco) e depois embaralha
      const opcoes = q.opcoes.map(function (texto, i) { return { texto: texto, certa: i === 0 }; });
      return { enunciado: q.enunciado, opcoes: embaralhar(opcoes) };
    });
    return { assunto: assunto, questoes: questoes };
  });
  document.getElementById("total-questoes").textContent = ASSUNTOS_POR_TESTE * QUESTOES_POR_ASSUNTO;
}

/* ============ 4. TELA: desenhar as questões ============ */
function desenharQuestoes() {
  const lista = document.getElementById("lista-topicos");
  lista.innerHTML = prova.map(function (item) {
    const questoes = item.questoes.map(function (q, i) {
      const nome = item.assunto.id + "-" + i;
      const opcoes = q.opcoes.map(function (opcao, j) {
        return '<label><input type="radio" name="' + nome + '" value="' + j + '"> ' + opcao.texto + '</label>';
      }).join("");
      return '<fieldset><legend>' + (i + 1) + '. ' + q.enunciado + '</legend>' + opcoes + '</fieldset>';
    }).join("");
    return '<div class="cartao"><div class="topico-titulo"><h3>' + item.assunto.nome + '</h3><small>' + item.questoes.length + ' questões</small></div>' + questoes + '</div>';
  }).join("");
}

/* ============ 5. ANÁLISE: contar acertos por assunto ============ */
function lerRespostas() {
  const resultados = [];
  for (const item of prova) {
    let acertos = 0;
    for (let i = 0; i < item.questoes.length; i++) {
      const marcada = document.querySelector('input[name="' + item.assunto.id + "-" + i + '"]:checked');
      if (!marcada) return null; // falta responder
      if (item.questoes[i].opcoes[Number(marcada.value)].certa) acertos++;
    }
    const diagnostico = classificarDificuldade(acertos);
    resultados.push({ assunto: item.assunto, acertos: acertos, diagnostico: diagnostico });
  }
  return resultados;
}

/* ============ 6. TELA: mostrar o diagnóstico ============ */
function mostrarResultado(resultados) {
  const total = resultados.reduce(function (soma, r) { return soma + r.acertos; }, 0);
  document.getElementById("resumo").textContent = "Você acertou " + total + " de " + resultados.length * QUESTOES_POR_ASSUNTO + " questões.";

  document.getElementById("painel").innerHTML = resultados.map(function (r) {
    const pct = Math.round((r.acertos / 3) * 100);
    return '<div class="cartao"><div class="topico-titulo"><h3>' + r.assunto.nome + '</h3>' +
      '<span class="selo nivel-' + r.diagnostico.nivel + '">' + r.diagnostico.rotulo + '</span></div>' +
      '<div class="barra" role="img" aria-label="' + pct + '% de acerto"><i style="width:' + pct + '%;background:currentColor" class="nivel-' + r.diagnostico.nivel + '"></i></div>' +
      '<small>' + r.acertos + ' de 3 acertos (' + pct + '%)</small></div>';
  }).join("");

  // Quem tem mais dificuldade vem primeiro
  const ordenados = resultados.slice().sort(function (a, b) {
    return b.diagnostico.prioridade - a.diagnostico.prioridade;
  });
  const fila = document.getElementById("fila");
  if (ordenados[0].diagnostico.prioridade === 0) {
    fila.innerHTML = "<li>Parabéns! Você acertou tudo. Que tal tentar exercícios mais difíceis?</li>";
  } else {
    fila.innerHTML = ordenados.filter(function (r) { return r.diagnostico.prioridade > 0; })
      .map(function (r) { return "<li><strong>" + r.assunto.nome + ":</strong> " + r.assunto.dica + "</li>"; }).join("");
  }

  document.getElementById("arvore").textContent =
    "acertos = 3 ?\n  sim → Domina o assunto\n  não → acertos = 2 ?\n          sim → Precisa revisar\n          não → Dificuldade alta";

  const secao = document.getElementById("resultado");
  secao.hidden = false;
  secao.scrollIntoView({ behavior: "smooth" });

  // Aviso do sistema ao concluir o teste (só funciona se o usuário ativou os avisos)
  const primeiro = ordenados[0].diagnostico.prioridade > 0 ? ordenados[0].assunto.nome : "";
  notificarConclusao(total, resultados.length * QUESTOES_POR_ASSUNTO, primeiro);
}

/* ============ 7. BOTÕES ============ */
document.getElementById("botao-analisar").addEventListener("click", function () {
  const aviso = document.getElementById("aviso");
  const resultados = lerRespostas();
  if (!resultados) {
    aviso.textContent = "Responda todas as questões para ver o diagnóstico.";
    aviso.hidden = false;
    return;
  }
  aviso.hidden = true;
  mostrarResultado(resultados);
});

document.getElementById("botao-refazer").addEventListener("click", function () {
  montarProva();
  desenharQuestoes();
  document.getElementById("resultado").hidden = true;
  window.scrollTo({ top: 0, behavior: "smooth" });
});

montarProva();
desenharQuestoes();
