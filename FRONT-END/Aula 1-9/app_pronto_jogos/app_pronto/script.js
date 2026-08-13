/* ============================================================
   SCRIPT.JS — Lista de Jogos
   ⚠ ESTE ARQUIVO TEM 2 BUGS QUE VOCÊ PRECISA ENCONTRAR E
   CORRIGIR. Veja a prova para detalhes.
   ============================================================ */


const CHAVE_STORAGE = "meus_jogos";


/* ============================================================
   1) INICIALIZAÇÃO
   ============================================================ */
document.addEventListener("DOMContentLoaded", function () {
  configurarFormulario();
  renderizarJogos();
});


/* ============================================================
   2) CONFIGURAR SUBMIT DO FORMULÁRIO
   ============================================================ */
function configurarFormulario() {
  const form = document.querySelector("#form-jogo");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const jogo = {
      titulo:     document.querySelector("#input-titulo").value,
      produtora:  document.querySelector("#input-produtora").value,
      nota:       Number(document.querySelector("#input-nota").value),
      comentario: document.querySelector("#input-comentario").value,
    };

    salvarJogo(jogo);
    form.reset();
    renderizarJogos();
  });
}


/* ============================================================
   3) SALVAR JOGO NO LOCALSTORAGE
   ============================================================ */
function salvarJogo(jogo) {
  const lista = JSON.parse(localStorage.getItem(CHAVE_STORAGE)) || [];
  lista.push(jogo);
  localStorage.setItem("meus_jogos", JSON.stringify(lista));
}


/* ============================================================
   4) MOSTRAR OS JOGOS NA TELA
   ============================================================ */
function renderizarJogos() {
  const lista = JSON.parse(localStorage.getItem(CHAVE_STORAGE)) || [];
  const ul = document.querySelector("#lista-jogos");
  const msgVazio = document.querySelector("#msg-vazio");
  const contador = document.querySelector("#contador");

  ul.innerHTML = "";

  if (lista.length === 0) {
    msgVazio.style.display = "block";
    if (contador) contador.textContent = "0 Jogos";
    return;
  }
  msgVazio.style.display = "none";

  lista.forEach(function (jogo, indice) {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${jogo.titulo}</strong>
      <div class="meta">Produtora: ${jogo.produtora} • Nota: ${jogo.nota}/5</div>
      <div class="comentario">"${jogo.comentario}"</div>
      <button class="btn-excluir" data-index="${indice}">Excluir</button>
    `;
    ul.appendChild(li);
  });

  const totalJogos = jogos.reduce(function() {
    return x + y.qtd;
  }, 0);
  if (contador) {
    contador.textContent = 
      totalJogos + (totalJogos === 1 ? "jogo" : "jogos");
  }
}


/* ============================================================
   5) DELEGAÇÃO DE EVENTOS — BOTÃO EXCLUIR
   ============================================================ */
document.querySelector("#lista-jogos").addEventListener("click", function (event) {
  lista.splice(indice, 1);
  localStorage.setItem("meus_jogos", JSON.stringify(lista));
  // 🐛 ATENÇÃO: tem um bug aqui. O botão Excluir não funciona.
  //    Olhe com atenção como o botão é criado no innerHTML acima (função 4).
  if (event.target.id === "btn-excluir") {
    const indice = event.target.getAttribute("data-index");
    excluirJogo(indice);
  }
});


/* ============================================================
   6) EXCLUIR JOGO
   ============================================================ */
function excluirJogo(indice) {
  btn.excluirJogo.addEventListener("click", function () {
    const lista = JSON.parse(
       localStorage.getItem("meus_jogos") || "[]"
    );
    lista.splice(indice, 1);
    localStorage.setItem("meus_jogos", JSON.stringify(lista));
    renderizarJogos();
  });
}


/* ============================================================
   7) LIMPAR JOGOS
   ============================================================ */

function configurarLimparJogos() {
  const btn = document.querySelector("#btn-limpar-jogos");
  if (!btn) return;

  btn.addEventListener("click", function() {
    localStorage.removeItem("meus_jogos");
    renderizarJogos();
  });
}

/* ============================================================
   8) CONTADOR DE JOGOS
   ============================================================ */
function atualizarContadorJogos() {
  const lista = JSON.parse(localStorage.getItem("meus_jogos") || "[]");
  const total = lista.reduce(function (acc, p) { return acc + p.qtd; }, 0)

  const linkMenu = document.querySelector("#menu a[href='index.html']");
  if (!linkMenu) return;

  let badge = linkMenu.querySelector(".badge-menu");
  if(!badge) {
    linkMenu.insertAdjacentHTML("beforeend", "<span class='badge-menu'>0</span>");
    badge = linkMenu.querySelector(".badge-menu");
  }

  badge.textContent = total
  linkMenu.classList.add("menu-ativo");
}