const GameOfLife = require("./GameOfLife");
const fixtures = require("./../fixtures");

class TestProvider {
  constructor(grid) {
    this.onIteration = jest.fn();
    this.onIsolation = jest.fn();
    this.onLive = jest.fn();
    this.onOverPopulation = jest.fn();
    this.onReproduction = jest.fn();
    this.grid = () => grid;
  }
}

describe("Game of life", () => {
  const originalSetInterval = window.setInterval;

  beforeEach(() => {
    window.setInterval = originalSetInterval;
  });

  it("should initialize", () => {
    const provider = new TestProvider(fixtures.onIteration.given);
    const game = new GameOfLife({ provider });
    expect(game).toBeInstanceOf(GameOfLife);
    expect(game.provider).toEqual(provider);
    expect(game.grid).toEqual(fixtures.onIteration.given);
    expect(game.sizeX).toEqual(7);
    expect(game.sizeY).toEqual(7);
    expect(game.speed).toEqual(1000);
  });

  it("#onIteration", () => {
    const provider = new TestProvider(fixtures.onIteration.given);
    const game = new GameOfLife({ provider });

    window.setInterval = callback => {
      for (let index = 0; index < 4; index++) {
        callback();
      }
    };

    game.start();
    expect(provider.onIteration).toHaveBeenCalledTimes(5);
    expect(provider.onIteration).toHaveBeenNthCalledWith(1, fixtures.onIteration.iter1);
    expect(provider.onIteration).toHaveBeenNthCalledWith(2, fixtures.onIteration.iter2);
    expect(provider.onIteration).toHaveBeenNthCalledWith(3, fixtures.onIteration.iter3);
    expect(provider.onIteration).toHaveBeenNthCalledWith(4, fixtures.onIteration.iter4);
    expect(provider.onIteration).toHaveBeenNthCalledWith(5, fixtures.onIteration.iter5);
  });

  it("#onIsolation", () => {
    const provider = new TestProvider(fixtures.onIsolation.given);
    const game = new GameOfLife({ provider });
    game.start();
    expect(provider.onIsolation).toHaveBeenCalledTimes(1);
    expect(provider.onIsolation).toHaveBeenNthCalledWith(1, 2, 2);
    expect(provider.onIteration).toHaveBeenCalledWith(fixtures.onIsolation.expected);
  });

  it("#onLive", () => {
    const provider = new TestProvider(fixtures.onLive.given);
    const game = new GameOfLife({ provider });
    game.start();
    expect(provider.onLive).toHaveBeenCalledTimes(3);
    expect(provider.onLive).toHaveBeenNthCalledWith(1, 1, 2);
    expect(provider.onLive).toHaveBeenNthCalledWith(2, 2, 2);
    expect(provider.onLive).toHaveBeenNthCalledWith(3, 2, 3);
    expect(provider.onIteration).toHaveBeenCalledWith(fixtures.onLive.expected);
  });

  it("#onOverPopulation", () => {
    const provider = new TestProvider(fixtures.onOverPopulation.given);
    const game = new GameOfLife({ provider });
    game.start();
    expect(provider.onOverPopulation).toHaveBeenCalledTimes(1);
    expect(provider.onOverPopulation).toHaveBeenNthCalledWith(1, 2, 2);
    expect(provider.onIteration).toHaveBeenCalledWith(fixtures.onOverPopulation.expected);
  });

  it("#onReproduction", () => {
    const provider = new TestProvider(fixtures.onReproduction.given);
    const game = new GameOfLife({ provider });
    game.start();
    expect(provider.onReproduction).toHaveBeenCalledTimes(1);
    expect(provider.onReproduction).toHaveBeenNthCalledWith(1, 1, 1);
    expect(provider.onIteration).toHaveBeenCalledWith(fixtures.onReproduction.expected);
  });
});
