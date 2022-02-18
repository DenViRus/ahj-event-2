import greenVir from '../img/greenvirus.png';
import violetVir from '../img/violetvirus.png';
import dead from '../img/dead.png';
import death from '../img/death.png';
import knife from '../img/knife.png';
import smile from '../img/smile.png';
import werewolf from '../img/werewolf.png';
import wolf from '../img/wolf.png';
import netology from '../img/netology.svg';
import winner from '../img/winner.jpg';
import looser from '../img/looser.jpg';

export default class GamePlay {
  constructor(container) {
    this.container = container;
    this.scoreTable = null;
    this.hitCell = null;
    this.missCell = null;
    this.gameTable = null;
    this.gameCells = [];
    this.gameCellIndex = 0;
    this.newGameCellIndex = 0;
    this.imageSrc = null;
    this.enemies = [];
    this.randomEnemyIndex = null;
    this.killEnemy = null;
    this.points = null;
    this.gameTableimages = [];
    this.intervalChanging = null;
    this.runInterval = 'run';
    this.startButton = null;
    this.stopButton = null;
    this.finishGamePopup = null;
    this.closeButtonfinish = null;
    this.stopButtonListener1 = null;
    this.finishGameimage = null;
    this.finishGameText = null;
  }

  getData() {
    this.scoreTable = this.container.querySelector('.score-table');
    const miss = this.scoreTable.querySelectorAll('.score-table-data-cell')[0];
    const hit = this.scoreTable.querySelectorAll('.score-table-data-cell')[1];
    this.hitCell = hit;
    this.missCell = miss;
    this.gameTable = this.container.querySelector('.field-table');
    this.gameCells = this.gameTable.querySelectorAll('.field-table-data-cell');
    this.enemies = [dead, death, knife, smile, werewolf, wolf];
    this.startButton = document.getElementById('startButton');
    this.stopButton = document.getElementById('stopButton');
    this.gameTableimages = this.gameTable.querySelectorAll(
      '.field-table-cell-image',
    );
    this.finishGamePopup = this.gameTable.querySelector('.finish-game-popup');
    this.closeButtonfinish = this.finishGamePopup.querySelector(
      '.finish-game-popup-container-close-button',
    );
    this.finishGameimage = this.finishGamePopup.querySelector(
      '.finish-game-popup-container-image',
    );
    this.finishGameText = this.finishGamePopup.querySelector(
      '.finish-game-popup-container-text',
    );
  }

  changeImage() {
    if (this.killEnemy === false) {
      this.missCell.textContent = parseFloat(this.missCell.textContent) - this.points;
    }
    this.finishGame();

    this.newGameCellIndex = Math.floor(Math.random() * this.gameCells.length);
    if (this.newGameCellIndex === this.gameCellIndex) {
      if (this.newGameCellIndex + 1 <= this.gameCells.length) {
        this.newGameCellIndex += 1;
      } else if (this.newGameCellIndex - 1 >= 0) {
        this.newGameCellIndex -= 1;
      }
    }

    this.randomEnemyIndex = Math.floor(Math.random() * this.enemies.length);
    const randomImage = this.gameCells[this.newGameCellIndex].querySelector(
      '.field-table-cell-image',
    );
    this.imageSrc = randomImage.getAttribute('src');
    const image = this.gameCells[this.gameCellIndex].querySelector(
      '.field-table-cell-image',
    );
    randomImage.src = this.enemies[this.randomEnemyIndex];
    image.src = this.imageSrc;
    const enemy = randomImage.getAttribute('src');

    if (enemy === death) {
      this.points = 3;
    } else if (enemy === dead || enemy === werewolf) {
      this.points = 2;
    } else if (enemy === knife || enemy === smile || enemy === wolf) {
      this.points = 1;
    }

    this.killEnemy = false;
    this.gameCellIndex = this.newGameCellIndex;
  }

  renderImage() {
    for (let i = 0, len = this.gameTableimages.length; i < len; i++) {
      if (i % 2 === 0) {
        this.gameTableimages[i].src = greenVir;
      } else {
        this.gameTableimages[i].src = violetVir;
      }
    }
  }

  startStopGame() {
    this.stopButtonListener1 = (event) => {
      event.preventDefault();
      clearInterval(this.intervalChanging);
      this.runInterval = 'run';
      this.renderImage();
      this.hitCell.textContent = 30;
      this.missCell.textContent = 15;
      this.points = null;
    };

    const startButtonListener1 = (event) => {
      event.preventDefault();

      if (this.runInterval === 'run') {
        this.intervalChanging = setInterval(() => {
          this.changeImage();
        }, 1000);

        this.stopButton.addEventListener('click', this.stopButtonListener1);
        this.runInterval = 'stop';
      }
    };
    this.startButton.addEventListener('click', startButtonListener1);
  }

  huntEnemies() {
    const gameTablelistener1 = (event) => {
      event.preventDefault();
      const aim = event.target;
      const enemy = aim.getAttribute('src');

      if (this.enemies.includes(enemy)) {
        this.killEnemy = true;
        clearInterval(this.intervalChanging);
        this.changeImage();
        this.intervalChanging = setInterval(() => {
          this.changeImage();
        }, 1000);
        this.hitCell.textContent = parseFloat(this.hitCell.textContent) - this.points;
        this.finishGame();
      }
    };
    this.gameTable.addEventListener('click', gameTablelistener1);
    const closeButtonListener1 = (event) => {
      this.finishGamePopup.style.display = 'none';
      this.renderImage();
      this.runInterval = 'run';
      this.hitCell.textContent = 30;
      this.missCell.textContent = 15;
      this.points = null;
    };
    this.closeButtonfinish.addEventListener('click', closeButtonListener1);
  }

  finishGame() {
    if (parseFloat(this.missCell.textContent) <= 0) {
      clearInterval(this.intervalChanging);
      this.missCell.textContent = 0;
      this.runInterval = 'stop';
      this.finishGamePopup.style.display = 'block';
      this.finishGameimage.src = looser;
      this.finishGameText.style.color = 'red';
      this.finishGameText.textContent = 'YOU LOOSE!!';
      this.stopButton.removeEventListener('click', this.stopButtonListener1);
    }
    if (parseFloat(this.hitCell.textContent) <= 0) {
      clearInterval(this.intervalChanging);
      this.hitCell.textContent = 0;
      this.runInterval = 'stop';
      this.finishGamePopup.style.display = 'block';
      this.finishGameimage.src = winner;
      this.finishGameText.style.color = 'green';
      this.finishGameText.textContent = 'YOU WIN!!';
      this.stopButton.removeEventListener('click', this.stopButtonListener1);
    }
  }
}
