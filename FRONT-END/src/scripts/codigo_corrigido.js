const saudacaoTexto = document.querySelector('#saudacao-voluntario');
const hora = new Date().getHours();

if (hora < 12) {
    saudacaoTexto.textContent = 'Plantão matinal, Protetor!';
} else if (hora < 18) {
    saudacaoTexto.textContent = 'Plantão da tarde, Protetor!';
} else {
    saudacaoTexto.textContent = 'Plantão noturno, Protetor!';
}

const bannerMouse = document.querySelector('#banner-adocao');

bannerMouse.addEventListener('mouseover', () => {
    bannerMouse.classList.add('destaque-pet');
});

bannerMouse.addEventListener('mouseout', () => {
    bannerMouse.classList.remove('destaque-pet');
});

const inputIdade = document.querySelector('#id-pet');
const resultadoIdade = document.querySelector('#idade-humana');

inputIdade.addEventListener('input', () => {
    const idade = inputIdade.value;
    resultadoIdade.textContent = idade !== "" ? idade * 7 : "";
});

const cadastroBtn = document.querySelector('#btn-cadastrar');
const nomePet = document.querySelector('#nome-pet');
const listaAdocao = document.querySelector('#lista-adocao');

cadastroBtn.addEventListener('click', () => {
    const nome = nomePet.value.trim();

    if (nome !== "") {
        listaAdocao.innerHTML += `<article class="card-adocao"><h3>🐾 ${nome}</h3></article>`;
        nomePet.value = "";
    }
});

const limpaBtn = document.querySelector('#btn-limpar');

limpaBtn.addEventListener('click', () => {
    listaAdocao.innerHTML = "";
    nomePet.value = "";
    inputIdade.value = "";
    resultadoIdade.textContent = "";
});