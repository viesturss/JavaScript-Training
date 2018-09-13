const MAX_CHANGELOGS = 10;
const TABLE_ELEMENTS = ["iteration", "isolation", "live", "overPopulation", "reproduction"];

export default class DOMProvider {
  constructor() {
    this.game = document.querySelector("#game");
    this.changelog = document.querySelector("#changelog tbody");
    this.counter = this._resetCounter();

    while (this.game.firstChild) {
      this.game.removeChild(this.game.firstChild);
    }
    while (this.changelog.firstChild) {
      this.changelog.removeChild(this.changelog.firstChild);
    }
  }

  onIteration = grid => {
    !this.created && this._createGrid(grid);
    this._changeGrid(grid);
    this._addChangelog();
  };
  onIsolation = () => {
    this.counter.isolation++;
  };
  onLive = () => {
    this.counter.live++;
  };
  onOverPopulation = () => {
    this.counter.overPopulation++;
  };
  onReproduction = () => {
    this.counter.reproduction++;
  };

  grid = (sizeX, sizeY) => {
    return [...Array(sizeY)].map(() => {
      return [...Array(sizeX)].map(() => Boolean(Math.round(Math.random())));
    });
  };

  _changeGrid = grid => {
    grid.forEach((row, rowIndex) => {
      row.forEach((alive, columnIndex) => {
        const classes = this.game.children[rowIndex].children[columnIndex].classList;
        if (alive) {
          classes.add("alive");
          classes.remove("dead");
        } else {
          classes.add("dead");
          classes.remove("alive");
        }
      });
    });
  };

  _addChangelog = () => {
    const tr = document.createElement("tr");
    const length = this.changelog.children.length;
    TABLE_ELEMENTS.forEach(rule => tr.appendChild(this._createTableRow(rule)));

    if (length) {
      this.changelog.insertBefore(tr, this.changelog.children[0]);
    } else {
      this.changelog.appendChild(tr);
    }

    if (length >= MAX_CHANGELOGS) {
      this.changelog.removeChild(this.changelog.lastChild);
    }

    this.counter = { ...this._resetCounter(), iteration: this.counter.iteration + 1 };
  };

  _createGrid = grid => {
    grid.forEach(row => this.game.appendChild(this._createGameRow(row)));
    this.created = true;
  };

  _createGameRow = row => {
    const element = document.createElement("div");
    element.classList.add("row");
    row.forEach(() => element.appendChild(this._createCell()));
    return element;
  };

  _createCell = () => {
    const element = document.createElement("div");
    element.classList.add("cell");
    return element;
  };

  _createTableRow = rule => {
    const td = document.createElement("td");
    td.textContent = this.counter[rule];
    return td;
  };

  _resetCounter = () => {
    return TABLE_ELEMENTS.reduce((acc, rule) => ({ ...acc, [rule]: 0 }), {});
  };
}
