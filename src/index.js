// prettier-ignore
const POSITIONS = [
  [-1, -1],[-1, 0],[-1, 1],
  [ 0, -1],        [ 0, 1],
  [ 1, -1],[ 1, 0],[ 1, 1]
];

class GameOfLife {
  constructor(initialGrid, provider) {
    this.grid = [...initialGrid];
    this.provider = provider;
    this.size = this.grid.length;
  }

  start() {
    this._iterate();
  }

  _iterate() {
    this.provider.onIteration(this._generateNewGrid());
  }

  _generateNewGrid() {
    return this.grid.map((row, rowIndex) => {
      return row.map((alive, columnIndex) => {
        const neighbours = this._countNeighbours(rowIndex, columnIndex);

        const { action, value } = this._getActionAndValue(alive, neighbours);
        action && this.provider[action](rowIndex, columnIndex);
        return value;
      });
    });
  }

  _getActionAndValue(alive, neighbours) {
    if (alive) {
      if (this._isIsolation(neighbours)) {
        return { action: "onIsolation", value: false };
      } else if (this._isLive(neighbours)) {
        return { action: "onLive", value: true };
      } else if (this._isOverPopulation(neighbours)) {
        return { action: "onOverPopulation", value: false };
      }
    } else if (this._isReproduction(neighbours)) {
      return { action: "onReproduction", value: true };
    } else {
      return { value: false };
    }
  }

  _isIsolation(neighbours) {
    return neighbours < 2;
  }

  _isLive(neighbours) {
    return [2, 3].includes(neighbours);
  }

  _isOverPopulation(neighbours) {
    return neighbours > 3;
  }

  _isReproduction(neighbours) {
    return neighbours === 3;
  }

  _countNeighbours(row, column) {
    return POSITIONS.reduce((sum, [x, y]) => {
      const posY = row + y;
      const posX = column + x;
      if (this._outOfBounds(posX, posY)) return sum;
      return sum + Number(this.grid[posY][posX]);
    }, 0);
  }

  _outOfBounds(posX, posY) {
    return posX < 0 || posY < 0 || posX >= this.size || posY >= this.size;
  }
}

module.exports = {
  GameOfLife
};
