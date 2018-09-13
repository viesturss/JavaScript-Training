import GameOfLife from "./GameOfLife";
import { TestProvider } from "./../providers";
import fixtures from "./../fixtures";

describe("GameOfLife", () => {
  const data = { setInterval: window.setInterval };
  beforeEach(() => {
    window.setInterval = data.setInterval;
    data.provider = new TestProvider();
  });

  it("should initialize", () => {
    const life = new GameOfLife(fixtures.onIteration.given, data.provider);

    expect(life).toBeInstanceOf(GameOfLife);
    expect(life.size).toBe(7);
    expect(life.grid).toEqual(fixtures.onIteration.given);
    expect(life.provider).toEqual(data.provider);
  });

  it("#onIteration", () => {
    window.setInterval = callback => {
      for (let i = 0; i < 4; i++) {
        callback();
      }
    };

    const life = new GameOfLife(fixtures.onIteration.given, data.provider);
    life.start();

    expect(data.provider.onIteration).toHaveBeenCalledTimes(5);
    expect(data.provider.onIteration).toHaveBeenNthCalledWith(1, fixtures.onIteration.iter1);
    expect(data.provider.onIteration).toHaveBeenNthCalledWith(2, fixtures.onIteration.iter2);
    expect(data.provider.onIteration).toHaveBeenNthCalledWith(3, fixtures.onIteration.iter3);
    expect(data.provider.onIteration).toHaveBeenNthCalledWith(4, fixtures.onIteration.iter4);
    expect(data.provider.onIteration).toHaveBeenNthCalledWith(5, fixtures.onIteration.iter5);
  });

  it("#onIsolation", () => {
    const life = new GameOfLife(fixtures.onIsolation.given, data.provider);
    life.start();

    expect(data.provider.onIsolation).toHaveBeenCalledTimes(1);
    expect(data.provider.onIsolation).toHaveBeenNthCalledWith(1, 2, 2);
    expect(data.provider.onIteration).toBeCalledWith(fixtures.onIsolation.expected);
  });

  it("#onLive", () => {
    const life = new GameOfLife(fixtures.onLive.given, data.provider);
    life.start();

    expect(data.provider.onLive).toHaveBeenCalledTimes(3);
    expect(data.provider.onLive).toHaveBeenNthCalledWith(1, 1, 2);
    expect(data.provider.onLive).toHaveBeenNthCalledWith(2, 2, 2);
    expect(data.provider.onLive).toHaveBeenNthCalledWith(3, 2, 3);
    expect(data.provider.onIteration).toBeCalledWith(fixtures.onLive.expected);
  });

  it("#onOverPopulation", () => {
    const life = new GameOfLife(fixtures.onOverPopulation.given, data.provider);
    life.start();

    expect(data.provider.onOverPopulation).toHaveBeenCalledTimes(1);
    expect(data.provider.onOverPopulation).toHaveBeenNthCalledWith(1, 2, 2);
    expect(data.provider.onIteration).toBeCalledWith(fixtures.onOverPopulation.expected);
  });

  it("#onReproduction", () => {
    const life = new GameOfLife(fixtures.onReproduction.given, data.provider);
    life.start();

    expect(data.provider.onReproduction).toHaveBeenCalledTimes(1);
    expect(data.provider.onReproduction).toHaveBeenNthCalledWith(1, 1, 1);
    expect(data.provider.onIteration).toBeCalledWith(fixtures.onReproduction.expected);
  });
});
