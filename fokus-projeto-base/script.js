const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iconePlayPause = document.querySelector('.app__card-primary-button-icon');
const tempoNaTela = document.querySelector('#timer');


const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('./sons/play.wav');
const audioPause = new Audio('./sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;
let contextoAtual = 'foco';

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    contextoAtual = 'descanso-curto';
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    contextoAtual = 'descanso-longo';
    longoBt.classList.add('active');
})

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = ` 
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície. <br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play();
        alert('Tempo encerrado!');
        zerar();
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo(); // Chamando a função mostrarTempo na contagem regressiva

}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        audioPause.play();
        zerar();
        return
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = 'Pausar'; // Alterar o texto para "Pausar"
    iconePlayPause.setAttribute('src', './imagens/pause.png'); // Alterar para o ícone de pause
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = 'Começar'; // Alterar o texto para "Começar"
    iconePlayPause.setAttribute('src', './imagens/play_arrow.png') // Alterar para o ícone de play
    intervaloId = null
}

function mostrarTempo() {       // Criando uma função para mostrar o tempo na tela
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' })
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

function reiniciar() {
    zerar();
    audioTempoFinalizado.pause();
    audioTempoFinalizado.currentTime = 0;

    // Reiniciar para o contexto que estava ativo
    switch (contextoAtual) {
        case 'foco':
            tempoDecorridoEmSegundos = 1500;
            break
        case 'descanso-curto':
            tempoDecorridoEmSegundos = 300;
            break
        case 'descanso-longo':
            tempoDecorridoEmSegundos = 900;
            break;
    }
    alterarContexto(contextoAtual);
    botoes.forEach(function (botao) {
        if (botao.classList.contains(`app__card-button--${contextoAtual}`)) {
            botao.classList.add('active');
        }
    });
}

mostrarTempo();


