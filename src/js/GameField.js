import greenVir from '../img/greenvirus.png';
import violetVir from '../img/violetvirus.png';
import sword from '../img/sword.png';

export default class GameField {
  constructor(container, row = 5, column = 5) {
    this.container = container;
    this.row = row;
    this.column = column;

    this.gameScoreContainer = null;
    this.gameFieldContainer = null;
  }

  drawGameField() {
    this.gameScoreContainer = document.createElement('div');
    this.gameScoreContainer.className = 'game-score-container';

    const scoreTable = document.createElement('table');
    scoreTable.className = 'score-table';
    scoreTable.style.fontSize = '35px';
    scoreTable.style.fontWeight = 'bold';

    for (let i = 0; i < 2; i++) {
      const scoreTableRow = document.createElement('tr');
      scoreTableRow.className = 'score-table-row';

      const scoreTableHeadingCell = document.createElement('th');
      scoreTableHeadingCell.className = 'score-table-heding-cell';

      const scoreTableDataCell = document.createElement('td');
      scoreTableDataCell.className = 'score-table-data-cell';

      scoreTableRow.append(scoreTableHeadingCell);
      scoreTableRow.append(scoreTableDataCell);
      scoreTable.append(scoreTableRow);
    }

    this.gameScoreContainer.append(scoreTable);
    const scoreHeadingCells = this.gameScoreContainer.querySelectorAll(
      '.score-table-heding-cell',
    );
    scoreHeadingCells[0].textContent = 'YOU:';
    scoreHeadingCells[0].style.color = 'green';
    scoreHeadingCells[0].style.textAlign = 'left';
    scoreHeadingCells[1].textContent = 'ENEMY:';
    scoreHeadingCells[1].style.color = 'red';
    scoreHeadingCells[1].style.textAlign = 'left';

    const scoreDataingCells = this.gameScoreContainer.querySelectorAll(
      '.score-table-data-cell',
    );
    scoreDataingCells.forEach((cell) => {
      const dataCell = cell;
      dataCell.style.width = '60px';
      dataCell.style.textAlign = 'center';
    });
    scoreDataingCells[0].textContent = 30;

    scoreDataingCells[1].textContent = 30;

    this.gameFieldContainer = document.createElement('div');
    this.gameFieldContainer.className = 'game-field-container';
    this.gameFieldContainer.style.width = '100%';
    this.gameFieldContainer.style.maxWidth = '700px';
    this.gameFieldContainer.style.height = '100%';
    this.gameFieldContainer.style.maxHeight = '700px';
    this.gameFieldContainer.style.margin = 'auto';

    const fieldTable = document.createElement('table');
    fieldTable.className = 'field-table';
    fieldTable.style.position = 'relative';
    fieldTable.style.borderSpacing = '5px';
    fieldTable.style.width = '100%';
    fieldTable.style.height = '100%';
    fieldTable.style.cursor = `url(${sword}), auto`;

    for (let i = 0; i < this.row; i++) {
      const fieldTableRow = document.createElement('tr');
      fieldTableRow.className = 'score-table-row';
      for (let j = 0; j < this.column; j++) {
        const fieldTableDataCell = document.createElement('td');
        fieldTableDataCell.className = 'field-table-data-cell';
        fieldTableDataCell.style.backgroundColor = 'black';
        fieldTableDataCell.style.textAlign = 'center';

        const fieldTableCellImage = document.createElement('img');
        fieldTableCellImage.className = 'field-table-cell-image';
        fieldTableCellImage.src = '';
        fieldTableCellImage.alt = 'virus picture';
        fieldTableDataCell.append(fieldTableCellImage);
        fieldTableRow.append(fieldTableDataCell);
      }

      fieldTable.append(fieldTableRow);
    }

    this.gameFieldContainer.append(fieldTable);

    this.container.append(this.gameScoreContainer);
    this.container.append(this.gameFieldContainer);

    const fieldTableCellImages = this.gameFieldContainer.querySelectorAll(
      '.field-table-cell-image',
    );

    for (let i = 0, len = fieldTableCellImages.length; i < len; i++) {
      fieldTableCellImages[i].style.width = `${
        fieldTable.clientWidth / this.column - 25
      }px`;
      fieldTableCellImages[i].style.height = `${
        fieldTable.clientHeight / this.column - 25
      }px`;
      if (i % 2 === 0) {
        fieldTableCellImages[i].src = greenVir;
      } else {
        fieldTableCellImages[i].src = violetVir;
      }
    }

    const finishGamePopup = document.createElement('div');
    finishGamePopup.className = 'finish-game-popup';
    finishGamePopup.style.position = 'absolute';
    finishGamePopup.style.top = 0;
    finishGamePopup.style.right = 0;
    finishGamePopup.style.bottom = 0;
    finishGamePopup.style.left = 0;
    finishGamePopup.style.cursor = 'auto';
    finishGamePopup.style.display = 'none';
    finishGamePopup.style.width = '100%';
    finishGamePopup.style.height = '100%';

    const finishGamePopupContainer = document.createElement('div');
    finishGamePopupContainer.className = 'finish-game-popup-container';
    finishGamePopupContainer.style.backgroundColor = 'black';
    finishGamePopupContainer.style.width = '100%';
    finishGamePopupContainer.style.height = '100%';
    finishGamePopupContainer.style.padding = '10px';

    const finishGamePopupContainerClose = document.createElement('div');
    finishGamePopupContainerClose.className = 'finish-game-popup-container-close';
    finishGamePopupContainerClose.style.textAlign = 'right';
    finishGamePopupContainerClose.style.marginBottom = '10px';

    const finishGamePopupContainerCloseButton = document.createElement('span');
    finishGamePopupContainerCloseButton.className = 'finish-game-popup-container-close-button';
    finishGamePopupContainerCloseButton.textContent = '[X]';
    finishGamePopupContainerCloseButton.style.fontSize = '30px';
    finishGamePopupContainerCloseButton.style.fontWeight = 'bold';
    finishGamePopupContainerCloseButton.style.color = 'gold';
    finishGamePopupContainerCloseButton.style.cursor = 'pointer';

    const finishGamePopupContainerPicture = document.createElement('div');
    finishGamePopupContainerPicture.className = 'finish-game-popup-container-picture';
    finishGamePopupContainerPicture.style.width = '80%';
    finishGamePopupContainerPicture.style.height = '80%';
    finishGamePopupContainerPicture.style.margin = 'auto';

    const finishGamePopupContainerImage = document.createElement('img');
    finishGamePopupContainerImage.className = 'finish-game-popup-container-image';
    finishGamePopupContainerImage.src = '';
    finishGamePopupContainerImage.alt = 'finish picture';
    finishGamePopupContainerImage.style.width = '100%';
    finishGamePopupContainerImage.style.height = '100%';

    const finishGamePopupContainerInscription = document.createElement('div');
    finishGamePopupContainerInscription.className = 'finish-game-popup-container-inscription';
    finishGamePopupContainerInscription.style.textAlign = 'center';
    finishGamePopupContainerInscription.style.marginTop = '10px';

    const finishGamePopupContainerText = document.createElement('span');
    finishGamePopupContainerText.className = 'finish-game-popup-container-text';
    finishGamePopupContainerText.style.fontSize = '40px';
    finishGamePopupContainerText.style.fontWeight = 'bold';
    finishGamePopupContainerText.textContent = '';

    finishGamePopupContainerClose.append(finishGamePopupContainerCloseButton);
    finishGamePopupContainerPicture.append(finishGamePopupContainerImage);
    finishGamePopupContainerInscription.append(finishGamePopupContainerText);

    finishGamePopupContainer.append(finishGamePopupContainerClose);
    finishGamePopupContainer.append(finishGamePopupContainerPicture);
    finishGamePopupContainer.append(finishGamePopupContainerInscription);

    finishGamePopup.append(finishGamePopupContainer);

    fieldTable.append(finishGamePopup);
  }
}
