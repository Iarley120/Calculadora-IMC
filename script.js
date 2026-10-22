var historico = [];

var frases = [
  "Cuidar da saúde é um ato de respeito com você.",
  "Pequenas mudanças de hábito geram grandes resultados.",
  "Conhecer seus números é o primeiro passo.",
  "Saúde é o seu maior patrimônio.",
  "Mais saúde, mais autoestima, uma vida melhor.",
];
document.getElementById("frase").textContent =
  frases[Math.floor(Math.random() * frases.length)];

function calcularIMC() {
  // Captura (DOM)
  var campoPeso = document.getElementById("peso");
  var campoAltura = document.getElementById("altura");
  var areaResultado = document.getElementById("resultado");

  // Conversão para decimal (aceita vírgula)
  var peso = parseFloat(campoPeso.value.replace(",", "."));
  var altura = parseFloat(campoAltura.value.replace(",", "."));

  // Validação: vazio, texto (NaN) ou valor <= 0
  if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
    areaResultado.className = "erro";
    areaResultado.textContent =
      "Preencha peso e altura com números maiores que zero.";
    return;
  }

  // Cálculo: IMC = peso / (altura x altura)
  var imc = peso / (altura * altura);

  // Classificação (tabela da OMS)
  var classificacao, classeCor, emoji, dica;

  if (imc < 18.5) {
    classificacao = "Abaixo do peso";
    classeCor = "abaixo";
    emoji = "🥗";
    dica = "Procure um nutricionista para ganhar peso de forma saudável.";
  } else if (imc < 25) {
    classificacao = "Peso normal";
    classeCor = "normal";
    emoji = "💚";
    dica = "Parabéns! Continue com hábitos saudáveis e check-ups em dia.";
  } else if (imc < 30) {
    classificacao = "Sobrepeso";
    classeCor = "sobrepeso";
    emoji = "🚶";
    dica = "Caminhadas e uma alimentação equilibrada já fazem diferença.";
  } else {
    classificacao = "Obesidade";
    classeCor = "obesidade";
    emoji = "🩺";
    dica = "Procure um médico ou nutricionista para montar um plano seguro.";
  }

  // Faixa de peso ideal para a altura informada (IMC 18.5 a 24.9)
  var minIdeal = 18.5 * altura * altura;
  var maxIdeal = 24.9 * altura * altura;
  var meta = "";
  if (imc < 18.5) {
    meta =
      " Faltam cerca de " +
      (minIdeal - peso).toFixed(1) +
      " kg para a faixa normal.";
  } else if (imc >= 25) {
    meta =
      " Faltam cerca de " +
      (peso - maxIdeal).toFixed(1) +
      " kg para a faixa normal.";
  }

  // Posição do marcador na escala (IMC de 15 a 40)
  var pos = ((Math.min(Math.max(imc, 15), 40) - 15) / 25) * 100;

  // Exibição na área reservada, com cor dinâmica
  areaResultado.className = classeCor;
  areaResultado.innerHTML =
    '<span class="emoji">' +
    emoji +
    "</span>" +
    '<span class="valor">IMC: ' +
    imc.toFixed(2) +
    "</span>" +
    '<span class="classe">' +
    classificacao +
    "</span>" +
    '<div class="escala"><div class="marcador" style="left:' +
    pos +
    '%"></div></div>' +
    '<div class="legenda"><span>15</span><span>18.5</span><span>25</span><span>30</span><span>40</span></div>' +
    '<p class="dica">' +
    dica +
    "</p>" +
    '<p class="ideal">Peso ideal para ' +
    altura.toFixed(2) +
    " m: " +
    minIdeal.toFixed(1) +
    " a " +
    maxIdeal.toFixed(1) +
    " kg." +
    meta +
    "</p>";

  adicionarHistorico(peso, altura, imc, classificacao, classeCor);
}

function adicionarHistorico(peso, altura, imc, classificacao, classeCor) {
  historico.unshift({
    peso: peso,
    altura: altura,
    imc: imc,
    texto: classificacao,
    cor: classeCor,
  });
  if (historico.length > 5) historico.pop();

  var lista = document.getElementById("lista");
  lista.innerHTML = "";
  for (var i = 0; i < historico.length; i++) {
    var h = historico[i];
    var li = document.createElement("li");
    li.className = h.cor;
    li.textContent =
      h.peso +
      " kg / " +
      h.altura +
      " m  =  " +
      h.imc.toFixed(2) +
      " (" +
      h.texto +
      ")";
    lista.appendChild(li);
  }
}

function limpar() {
  document.getElementById("peso").value = "";
  document.getElementById("altura").value = "";
  var area = document.getElementById("resultado");
  area.className = "";
  area.innerHTML = "";
  document.getElementById("peso").focus();
}

// Enter também calcula
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") calcularIMC();
});
