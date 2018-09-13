// prettier-ignore
const POSITIONS = [
  [-1, -1], [-1, 0], [-1, 1],
  [ 0, -1],          [ 0, 1],
  [ 1, -1], [ 1, 0], [ 1, 1]
];
const DEFAULT_SPEED = 1000;

export default class GameOfLife {
  constructor(config) {
    this._setConfig(config);
  }

  start() {
    this._iterate();
    setInterval(this._iterate, this.speed);
  }
  pause = () => {};
  restart = () => {};

  _iterate = () => {
    this.grid = this._generateNewGrid();
    this.provider.onIteration(this.grid);
  };

  _generateNewGrid = () => {
    return this.grid.map((row, rowIndex) => {
      return row.map((alive, columnIndex) => {
        const neighbours = this._countNeighbours(rowIndex, columnIndex);

        const { action, value } = this._getActionAndValue(alive, neighbours);
        action && this.provider[action](rowIndex, columnIndex);
        return value;
      });
    });
  };

  _getActionAndValue = (alive, neighbours) => {
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
  };

  _isIsolation = neighbours => {
    return neighbours < 2;
  };

  _isLive = neighbours => {
    return [2, 3].includes(neighbours);
  };

  _isOverPopulation = neighbours => {
    return neighbours > 3;
  };

  _isReproduction = neighbours => {
    return neighbours === 3;
  };

  _countNeighbours = (row, column) => {
    return POSITIONS.reduce((sum, [x, y]) => {
      const posY = row + y;
      const posX = column + x;
      if (this._outOfBounds(posX, posY)) return sum;
      return sum + Number(this.grid[posY][posX]);
    }, 0);
  };

  _outOfBounds = (posX, posY) => {
    return posX < 0 || posY < 0 || posX >= this.sizeX || posY >= this.sizeY;
  };

  _setConfig = ({ provider, sizeX, sizeY, speed }) => {
    this.provider = provider;
    this.grid = this.provider.grid(sizeX, sizeY);
    this.sizeX = this.grid[0].length;
    this.sizeY = this.grid.length;
    this.speed = speed || DEFAULT_SPEED;
  };
}
