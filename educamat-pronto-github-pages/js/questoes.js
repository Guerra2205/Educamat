/* ============ 1. DADOS: banco de questões por assunto ============ */
// Em cada questão, a PRIMEIRA opção é a correta. O site embaralha as opções antes de mostrar.
const QUESTOES_POR_ASSUNTO = 3;
const ASSUNTOS_POR_TESTE = 6;

const assuntos = [
  { id: "fracoes", nome: "Frações",
    dica: "Revise como achar o denominador comum e como simplificar frações.",
    banco: [
      { enunciado: "Quanto é 1/2 + 1/4?", opcoes: ["3/4", "2/6", "1/6", "2/4"] },
      { enunciado: "Qual fração é equivalente a 2/3?", opcoes: ["4/6", "3/2", "2/6", "4/9"] },
      { enunciado: "Quanto é 3/5 de 20?", opcoes: ["12", "15", "8", "60"] },
      { enunciado: "Quanto é 5/6 − 1/3?", opcoes: ["1/2", "4/3", "4/6", "1/3"] },
      { enunciado: "Qual é a forma simplificada de 12/18?", opcoes: ["2/3", "3/4", "6/8", "4/5"] },
      { enunciado: "Quanto é 2/3 × 3/4?", opcoes: ["1/2", "5/7", "6/7", "3/4"] }
    ] },
  { id: "equacoes", nome: "Equações",
    dica: "Treine isolar o x: o que está somando passa subtraindo, e o que está multiplicando passa dividindo.",
    banco: [
      { enunciado: "Se x + 7 = 15, quanto vale x?", opcoes: ["8", "22", "7", "9"] },
      { enunciado: "Se 3x = 18, quanto vale x?", opcoes: ["6", "15", "54", "9"] },
      { enunciado: "Se 2x − 5 = 9, quanto vale x?", opcoes: ["7", "2", "4", "14"] },
      { enunciado: "Se x/4 = 5, quanto vale x?", opcoes: ["20", "9", "1,25", "1"] },
      { enunciado: "Se 5x + 3 = 28, quanto vale x?", opcoes: ["5", "6", "25", "31"] },
      { enunciado: "Se 4(x − 1) = 20, quanto vale x?", opcoes: ["6", "4", "5", "21"] }
    ] },
  { id: "porcentagem", nome: "Porcentagem",
    dica: "Lembre que 10% é dividir por 10 e que 25% é a quarta parte. Monte as outras porcentagens a partir delas.",
    banco: [
      { enunciado: "Quanto é 10% de 250?", opcoes: ["25", "2,5", "10", "250"] },
      { enunciado: "Quanto é 25% de 80?", opcoes: ["20", "25", "40", "8"] },
      { enunciado: "Um produto de R$ 200 recebe 15% de desconto. Qual o novo preço?", opcoes: ["R$ 170", "R$ 185", "R$ 30", "R$ 215"] },
      { enunciado: "Quanto é 50% de 90?", opcoes: ["45", "40", "50", "140"] },
      { enunciado: "30 é quantos por cento de 120?", opcoes: ["25%", "30%", "40%", "4%"] },
      { enunciado: "Um produto de R$ 50 sofre aumento de 20%. Qual o novo preço?", opcoes: ["R$ 60", "R$ 70", "R$ 55", "R$ 20"] }
    ] },
  { id: "decimais", nome: "Números decimais",
    dica: "Alinhe as vírgulas nas contas de somar e subtrair, e lembre que multiplicar por 10 desloca a vírgula uma casa para a direita.",
    banco: [
      { enunciado: "Quanto é 0,5 + 0,25?", opcoes: ["0,75", "0,30", "0,525", "0,70"] },
      { enunciado: "Quanto é 2,4 × 10?", opcoes: ["24", "0,24", "240", "2,40"] },
      { enunciado: "Qual é o maior número?", opcoes: ["0,8", "0,75", "0,08", "0,799"] },
      { enunciado: "Quanto é 3,6 ÷ 0,4?", opcoes: ["9", "0,9", "1,44", "90"] },
      { enunciado: "Como se escreve 1/4 em decimal?", opcoes: ["0,25", "0,4", "0,14", "2,5"] },
      { enunciado: "Quanto é 5 − 1,35?", opcoes: ["3,65", "4,65", "3,75", "4,35"] }
    ] },
  { id: "geometria", nome: "Geometria",
    dica: "Monte uma folha com as fórmulas de área e perímetro e pratique desenhando as figuras antes de calcular.",
    banco: [
      { enunciado: "Qual a área de um retângulo de 5 cm por 8 cm?", opcoes: ["40 cm²", "26 cm²", "13 cm²", "80 cm²"] },
      { enunciado: "Quanto soma os ângulos internos de um triângulo?", opcoes: ["180°", "90°", "360°", "270°"] },
      { enunciado: "Qual o perímetro de um quadrado de lado 6 cm?", opcoes: ["24 cm", "36 cm", "12 cm", "18 cm"] },
      { enunciado: "Qual a área de um triângulo de base 10 cm e altura 4 cm?", opcoes: ["20 cm²", "40 cm²", "14 cm²", "28 cm²"] },
      { enunciado: "Quanto soma os ângulos internos de um quadrilátero?", opcoes: ["360°", "180°", "270°", "720°"] },
      { enunciado: "Em um triângulo retângulo com catetos 3 e 4, quanto mede a hipotenusa?", opcoes: ["5", "7", "12", "25"] }
    ] },
  { id: "potencias", nome: "Potências e raízes",
    dica: "Lembre que a potência é uma multiplicação repetida (2³ = 2 × 2 × 2) e que a raiz é a operação inversa.",
    banco: [
      { enunciado: "Quanto é 2⁵?", opcoes: ["32", "10", "25", "16"] },
      { enunciado: "Quanto é √81?", opcoes: ["9", "8", "40,5", "18"] },
      { enunciado: "Quanto é 10³?", opcoes: ["1000", "30", "100", "10000"] },
      { enunciado: "Quanto é 5⁰?", opcoes: ["1", "0", "5", "10"] },
      { enunciado: "Quanto é 3² + 4²?", opcoes: ["25", "49", "14", "7"] },
      { enunciado: "Quanto é √144?", opcoes: ["12", "14", "72", "11"] }
    ] },
  { id: "proporcao", nome: "Razão e proporção",
    dica: "Monte uma regra de três com as grandezas na mesma ordem e confira se uma cresce quando a outra cresce.",
    banco: [
      { enunciado: "3 canetas custam R$ 6. Quanto custam 5 canetas?", opcoes: ["R$ 10", "R$ 12", "R$ 8", "R$ 15"] },
      { enunciado: "Em um mapa de escala 1:100, 5 cm no desenho correspondem a quantos cm reais?", opcoes: ["500 cm", "50 cm", "5 cm", "105 cm"] },
      { enunciado: "Em uma sala há 12 meninos e 8 meninas. Qual a razão simplificada de meninos para meninas?", opcoes: ["3 para 2", "2 para 3", "4 para 3", "6 para 5"] },
      { enunciado: "Se 2/5 = x/20, quanto vale x?", opcoes: ["8", "10", "4", "50"] },
      { enunciado: "Um carro percorre 240 km em 3 horas. Qual a velocidade média?", opcoes: ["80 km/h", "720 km/h", "60 km/h", "237 km/h"] },
      { enunciado: "Uma receita usa 2 xícaras de farinha para 4 pessoas. Quantas xícaras para 10 pessoas?", opcoes: ["5 xícaras", "8 xícaras", "4 xícaras", "6 xícaras"] }
    ] },
  { id: "estatistica", nome: "Média e estatística",
    dica: "Some todos os valores e divida pela quantidade para a média; para a mediana, ordene os números e pegue o do meio.",
    banco: [
      { enunciado: "Qual a média de 4, 6 e 8?", opcoes: ["6", "18", "8", "7"] },
      { enunciado: "Qual a mediana de 3, 9 e 5?", opcoes: ["5", "9", "3", "17/3"] },
      { enunciado: "Qual a moda de 2, 3, 3, 5 e 7?", opcoes: ["3", "5", "2", "4"] },
      { enunciado: "A soma de 5 notas é 35. Qual a média?", opcoes: ["7", "30", "5", "175"] },
      { enunciado: "Qual a mediana de 2, 4, 6 e 10?", opcoes: ["5", "6", "4", "10"] },
      { enunciado: "Qual a moda de 1, 1, 2, 2, 2 e 3?", opcoes: ["2", "1", "3", "1,83"] }
    ] }
];
