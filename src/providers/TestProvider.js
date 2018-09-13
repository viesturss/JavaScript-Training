export default class TestProvider {
  constructor(grid) {
    this.onIteration = jest.fn();
    this.onIsolation = jest.fn();
    this.onLive = jest.fn();
    this.onOverPopulation = jest.fn();
    this.onReproduction = jest.fn();
    this.grid = () => grid;
  }
}
