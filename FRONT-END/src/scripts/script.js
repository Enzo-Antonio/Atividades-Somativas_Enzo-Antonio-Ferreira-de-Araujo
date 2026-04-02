// Missão 1
const horario = document.querySelector('#saudacao-voluntario')
const timeIs = new Date()
const hora = timeIs.getHours()
 if (hora < 12) {
    alert('Plantão matinal, Protetor!')
 }
 if (hora >= 12 && hora < 18) {
    alert('Plantão da tarde, Protetor!')
 }
 if (hora <= 18 && hora < 22) {
    alert('Plantão noturno, Protetor!')
 }

 // Missão 2
const bannerMouse = document.querySelector('#banner-adocao')
bannerMouse.addEventListener('mouseover', () => {
    bannerMouse.classList.toggle('destaque-pet')
})
bannerMouse.addEventListener('mouseout', () => {
    bannerMouse.classList.toggle('destaque-pet')
})

// Missão 3
const calculo = document.querySelector('#idade-pet')
const total = document.querySelector('#idade-humana')

if (calculo != "") {

}

total.textContent = calcular(calculo)

// Missão 4
const cadastroBtn = document.querySelector('#btn-cadastrar')
const nomePet = document.querySelector('#nome-pet')
const listaAdocao = document.querySelector('#lista-adocao')

nomePet.addEventListener('input', () => {
    const nome = nomePet.value
})

cadastroBtn.addEventListener('click', () => {
    const novoCadastro =  <article class="card-adocao"><h3>nome</h3></article>;
    listaAdocao.innerHTML += novoCadastro
})

// Missão 5
const limpaBtn = document.querySelector('#btn-limpar')

limpaBtn.addEventListener('click', () => {
    listaAdocao.innerHTML = ""
})