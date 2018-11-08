export default class DOMProvider {
  constructor() {
    this._changeLogBodyElement = document.querySelector("#changelog>tbody");
    this._gridContainerElement = document.querySelector("#grid");
    this._gridElement = null;
    this.changeLog = [];
    this.iterationChanges = [1, 0, 0, 0, 0];
    this.cellSize = 10;
  }

  onIteration = grid => {
    this.changeLog.push(this.iterationChanges);
    this._renderChangeLog();
    this.iterationChanges = [++this.iterationChanges[0], 0, 0, 0, 0];
  };

  onIsolation = (rowIndex, colIndex) => {
    this.iterationChanges[1]++;
    this._setCellClass(rowIndex, colIndex, "grid-cell--alive", "grid-cell--dead");
  };

  onLive = () => {
    this.iterationChanges[2]++;
  };

  onOverPopulation = (rowIndex, colIndex) => {
    this.iterationChanges[3]++;
    this._setCellClass(rowIndex, colIndex, "grid-cell--alive", "grid-cell--dead");
  };

  onReproduction = (rowIndex, colIndex) => {
    this.iterationChanges[4]++;
    this._setCellClass(rowIndex, colIndex, "grid-cell--dead", "grid-cell--alive");
  };

  grid = (colCount, rowCount) => {
    const grid = [...Array(rowCount)].map(() => {
      return [...Array(colCount)].map(() => Math.random() < 0.1);
    });

    this._clearChangeLog();
    this._renderGrid(grid);

    return grid;
  };

  _setCellClass(rowIndex, colIndex, remove, add) {
    this._gridElement.childNodes[rowIndex].childNodes[colIndex].classList.remove(remove);
    this._gridElement.childNodes[rowIndex].childNodes[colIndex].classList.add(add);
  }

  _renderChangeLog() {
    if (this._changeLogBodyElement.childElementCount >= 5) {
      this._changeLogBodyElement.lastChild.remove();
    }
    const row = this._changeLogBodyElement.insertRow(0);
    this.iterationChanges.forEach(count => {
      const cell = row.insertCell();
      cell.textContent = count;
    });
  }

  _clearChangeLog() {
    this.changeLog = [];

    while (this._changeLogBodyElement.firstChild) {
      this._changeLogBodyElement.removeChild(this._changeLogBodyElement.firstChild);
    }
  }

  _renderGrid(grid) {
    const gridElement = document.createElement("div");
    gridElement.classList.add("grid");
    gridElement.style.width = this.cellSize * grid[0].length + "px";

    grid.forEach(row => {
      const rowElement = document.createElement("div");
      rowElement.classList.add("grid-row");

      row.forEach(cell => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("grid-cell");
        cell ? cellElement.classList.add("grid-cell--alive") : cellElement.classList.add("grid-cell--dead");
        rowElement.appendChild(cellElement);
      });

      gridElement.appendChild(rowElement);
    });

    while (this._gridContainerElement.firstChild) {
      this._gridContainerElement.removeChild(this._gridContainerElement.firstChild);
    }

    this._gridContainerElement.appendChild(gridElement);
    this._gridElement = gridElement;
  }
}
