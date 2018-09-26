export default class DOMProvider {
  constructor() {
    this._changeLogBodyElement = document.querySelector("#changelog>tbody");
    this.changeLog = [];
    this.iterationChanges = [1, 0, 0, 0, 0];
  }

  onIteration = grid => {
    this.changeLog.push(this.iterationChanges);
    this._renderChangeLog();
    this.iterationChanges = [++this.iterationChanges[0], 0, 0, 0, 0];
  };
  onIsolation = () => {
    this.iterationChanges[1]++;
  };
  onLive = () => {
    this.iterationChanges[2]++;
  };
  onOverPopulation = () => {
    this.iterationChanges[3]++;
  };
  onReproduction = () => {
    this.iterationChanges[4]++;
  };
  grid = (colCount, rowCount) => {
    return [...Array(rowCount)].map(() => {
      return [...Array(colCount)].map(() => Math.random() < 0.3);
    });
  };

  _renderChangeLog() {
    const row = this._changeLogBodyElement.insertRow(0);
    this.iterationChanges.forEach(count => {
      const cell = row.insertCell();
      cell.textContent = count;
    });
  }
}
