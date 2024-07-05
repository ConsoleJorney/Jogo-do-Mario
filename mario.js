const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const start = document.querySelector('.start');
const gameOver = document.querySelector('.game-over');

const audioStart = new Audio('./som/start.mp3');
const audioGameOver = new Audio('./som/gameover.mp3');

const startGame = () => {
  pipe.classList.add('pipe-animation');
  start.style.display = 'none';

  audioStart.play();
};

const restartGame = () => {
  gameOver.style.display = 'none';
  pipe.style.left = '';
  mario.src = './imagem/mario.gif';  // Corrigi o caminho da imagem do Mario
  mario.style.width = '150px';
  mario.style.bottom = '0';

  start.style.display = 'none';

  audioGameOver.pause();
  audioGameOver.currentTime = 0;

  audioStart.play();
  audioStart.currentTime = 0;

  pipe.classList.add('pipe-animation');  // Reinicia a animação do tubo
  loop = setInterval(checkCollision, 10);  // Reinicia o loop de colisão
};

const jump = () => {
  if (!mario.classList.contains('jump')) {
    mario.classList.add('jump');
    mario.style.animation = 'jump 800ms ease-out';

    setTimeout(() => {
      mario.classList.remove('jump');
      mario.style.animation = '';  // Remove a animação para permitir novos saltos
    }, 800);
  }
};

let loop = setInterval(checkCollision, 10);

function checkCollision() {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = parseInt(window.getComputedStyle(mario).bottom.replace('px', ''));

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    pipe.classList.remove('pipe-animation');
    pipe.style.left = `${pipePosition}px`;

    mario.classList.remove('jump');
    mario.style.bottom = `${marioPosition}px`;

    mario.src = './imagem/game-over.png';
    mario.style.width = '80px';
    mario.style.marginLeft = '50px';

    audioStart.pause();
    audioGameOver.play();

    setTimeout(() => {
      audioGameOver.pause();
    }, 7000);

    gameOver.style.display = 'flex';

    clearInterval(loop);
  }
}

document.addEventListener('keydown', e => {
  const key = e.key;
  if (key === ' ') {
    jump();
  } else if (key === 'Enter') {
    startGame();
  }
});

document.addEventListener('touchstart', e => {
  if (e.touches.length) {
    jump();
  }
});
