const fixtures = require("./fixtures");
const { GameOfLife } = require("./");

class TestProvider {
  constructor() {
    this.onIteration = jest.fn();
    this.onIsolation = jest.fn();
    this.onLive = jest.fn();
    this.onOverPopulation = jest.fn();
    this.onReproduction = jest.fn();
  }
}

describe("GameOfLife", () => {
  const copySetInterval = setInterval;
  afterEach(() => {
    setInterval = copySetInterval;
  });

  it("should initialize", () => {
    const provider = new TestProvider();
    const life = new GameOfLife(fixtures.onIteration.given, provider);

    expect(life).toBeInstanceOf(GameOfLife);
    expect(life.size).toBe(7);
    expect(life.grid).toEqual(fixtures.onIteration.given);
    expect(life.provider).toEqual(provider);
  });

  it("#onIteration", () => {
    const { given, iter1, iter2, iter3, iter4, iter5 } = fixtures.onIteration;
    const provider = new TestProvider();
    const life = new GameOfLife(given, provider);

    setInterval = (callback, interval) => {
      for (let i = 0; i < 4; i++) {
        callback();
      }
    };

    life.start();

    expect(provider.onIteration).toHaveBeenCalledTimes(5);
    expect(provider.onIteration).toHaveBeenNthCalledWith(1, iter1);
    expect(provider.onIteration).toHaveBeenNthCalledWith(2, iter2);
    expect(provider.onIteration).toHaveBeenNthCalledWith(3, iter3);
    expect(provider.onIteration).toHaveBeenNthCalledWith(4, iter4);
    expect(provider.onIteration).toHaveBeenNthCalledWith(5, iter5);
  });

  it("#onIsolation", () => {
    const provider = new TestProvider();
    const life = new GameOfLife(fixtures.onIsolation.given, provider);
    life.start();

    expect(provider.onIsolation).toHaveBeenCalledTimes(1);
    expect(provider.onIsolation).toHaveBeenNthCalledWith(1, 2, 2);
    expect(provider.onIteration).toBeCalledWith(fixtures.onIsolation.expected);
  });

  it("#onLive", () => {
    const provider = new TestProvider();
    const life = new GameOfLife(fixtures.onLive.given, provider);
    life.start();

    expect(provider.onLive).toHaveBeenCalledTimes(3);
    expect(provider.onLive).toHaveBeenNthCalledWith(1, 1, 2);
    expect(provider.onLive).toHaveBeenNthCalledWith(2, 2, 2);
    expect(provider.onLive).toHaveBeenNthCalledWith(3, 2, 3);
    expect(provider.onIteration).toBeCalledWith(fixtures.onLive.expected);
  });

  it("#onOverPopulation", () => {
    const provider = new TestProvider();
    const life = new GameOfLife(fixtures.onOverPopulation.given, provider);
    life.start();

    expect(provider.onOverPopulation).toHaveBeenCalledTimes(1);
    expect(provider.onOverPopulation).toHaveBeenNthCalledWith(1, 2, 2);
    expect(provider.onIteration).toBeCalledWith(
      fixtures.onOverPopulation.expected
    );
  });

  it("#onReproduction", () => {
    const provider = new TestProvider();
    const life = new GameOfLife(fixtures.onReproduction.given, provider);
    life.start();

    expect(provider.onReproduction).toHaveBeenCalledTimes(1);
    expect(provider.onReproduction).toHaveBeenNthCalledWith(1, 1, 1);
    expect(provider.onIteration).toBeCalledWith(
      fixtures.onReproduction.expected
    );
  });
});
