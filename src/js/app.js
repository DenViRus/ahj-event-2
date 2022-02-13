import GameField from './GameField.js';
import GamePlay from './GamePlay.js';

const container = document.getElementById('mainContainer');
const gameField = new GameField(container, 5, 5);
gameField.drawGameField();

const dataContainer = document.getElementById('mainContainer');
const gamePlay = new GamePlay(dataContainer);
gamePlay.startStopGame();
gamePlay.huntEnemies();
