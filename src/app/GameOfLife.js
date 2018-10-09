// prettier-ignore
const POSITIONS = [
  [-1, -1], [-1, 0], [-1, 1],
  [ 0, -1],          [ 0, 1],
  [ 1, -1], [ 1, 0], [ 1, 1]
];

const DEFAULT_SPEED = 1000;

class GameOfLife {
  constructor(config) {
    this._setConfig(config);
  }

  _setConfig({ provider, sizeX, sizeY, speed }) {
    this.grid = provider.grid(sizeX, sizeY);
    this.provider = provider;
    this.sizeY = this.grid.length;
    this.sizeX = this.grid[0].length;
    this.speed = speed || DEFAULT_SPEED;
  }

  isPaused() {
    return this.intervalId == null;
  }

  start() {
    this.intervalId && clearInterval(this.intervalId);
    this._iterate();
    this.intervalId = setInterval(() => this._iterate(), this.speed);
  }

  pause() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  restart(config) {
    this._setConfig(config);
    //this.start();
  }

  _iterate() {
    this.grid = this.grid.map((row, rowIndex) => {
      return row.map((cell, colIndex) => {
        const neighbourCount = this._countNeighbours(rowIndex, colIndex);
        // neighbourCount && console.log(rowIndex, colIndex, neighbourCount);
        if (cell) {
          if (this._isIsolation(neighbourCount)) {
            this.provider.onIsolation(rowIndex, colIndex);
            return false;
          }
          if (this._isLive(neighbourCount)) {
            this.provider.onLive(rowIndex, colIndex);
            return true;
          }
          if (this._isOverPopulation(neighbourCount)) {
            this.provider.onOverPopulation(rowIndex, colIndex);
            return false;
          }
        } else {
          if (this._isReproduction(neighbourCount)) {
            this.provider.onReproduction(rowIndex, colIndex);
            return true;
          }
        }

        return false;
      });
    });

    this.provider.onIteration(this.grid);
  }

  _countNeighbours(rowIndex, colIndex) {
    return POSITIONS.reduce((count, [x, y]) => {
      const col = colIndex + x;
      const row = rowIndex + y;

      return this._isOutOfBounds(col, row) ? count : count + Number(this.grid[row][col]);
    }, 0);
  }

  _isOutOfBounds(col, row) {
    return col < 0 || row < 0 || col >= this.sizeX || row >= this.sizeY;
  }

  _isIsolation(neighbourCount) {
    return neighbourCount < 2;
  }

  _isLive(neighbourCount) {
    return [2, 3].includes(neighbourCount);
  }

  _isOverPopulation(neighbourCount) {
    return neighbourCount > 3;
  }

  _isReproduction(neighbourCount) {
    return neighbourCount === 3;
  }
}

module.exports = GameOfLife;
