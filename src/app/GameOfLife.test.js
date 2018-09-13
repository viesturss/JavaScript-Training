import GameOfLife from "./GameOfLife";
import { TestProvider } from "./../providers";
import fixtures from "./../fixtures";

describe("GameOfLife", () => {
  const copySetInterval = window.setInterval;
  beforeEach(() => {
    window.setInterval = copySetInterval;
  });

  it("should initialize", () => {
    const provider = new TestProvider(fixtures.onIteration.given);
    const life = new GameOfLife({ provider });

    expect(life).toBeInstanceOf(GameOfLife);
    expect(life.sizeX).toBe(7);
    expect(life.sizeY).toBe(7);
    expect(life.grid).toEqual(fixtures.onIteration.given);
    expect(life.provider).toEqual(provider);
  });

  it("#onIteration", () => {
    window.setInterval = callback => {
      for (let i = 0; i < 4; i++) {
        callback();
      }
    };

    const provider = new TestProvider(fixtures.onIteration.given);
    const life = new GameOfLife({ provider });
    life.start();

    expect(provider.onIteration).toHaveBeenCalledTimes(5);
    expect(provider.onIteration).toHaveBeenNthCalledWith(1, fixtures.onIteration.iter1);
    expect(provider.onIteration).toHaveBeenNthCalledWith(2, fixtures.onIteration.iter2);
    expect(provider.onIteration).toHaveBeenNthCalledWith(3, fixtures.onIteration.iter3);
    expect(provider.onIteration).toHaveBeenNthCalledWith(4, fixtures.onIteration.iter4);
    expect(provider.onIteration).toHaveBeenNthCalledWith(5, fixtures.onIteration.iter5);
  });

  it("#onIsolation", () => {
    const provider = new TestProvider(fixtures.onIsolation.given);
    const life = new GameOfLife({ provider });
    life.start();

    expect(provider.onIsolation).toHaveBeenCalledTimes(1);
    expect(provider.onIsolation).toHaveBeenNthCalledWith(1, 2, 2);
    expect(provider.onIteration).toBeCalledWith(fixtures.onIsolation.expected);
  });

  it("#onLive", () => {
    const provider = new TestProvider(fixtures.onLive.given);
    const life = new GameOfLife({ provider });
    life.start();

    expect(provider.onLive).toHaveBeenCalledTimes(3);
    expect(provider.onLive).toHaveBeenNthCalledWith(1, 1, 2);
    expect(provider.onLive).toHaveBeenNthCalledWith(2, 2, 2);
    expect(provider.onLive).toHaveBeenNthCalledWith(3, 2, 3);
    expect(provider.onIteration).toBeCalledWith(fixtures.onLive.expected);
  });

  it("#onOverPopulation", () => {
    const provider = new TestProvider(fixtures.onOverPopulation.given);
    const life = new GameOfLife({ provider });
    life.start();

    expect(provider.onOverPopulation).toHaveBeenCalledTimes(1);
    expect(provider.onOverPopulation).toHaveBeenNthCalledWith(1, 2, 2);
    expect(provider.onIteration).toBeCalledWith(fixtures.onOverPopulation.expected);
  });

  it("#onReproduction", () => {
    const provider = new TestProvider(fixtures.onReproduction.given);
    const life = new GameOfLife({ provider });
    life.start();

    expect(provider.onReproduction).toHaveBeenCalledTimes(1);
    expect(provider.onReproduction).toHaveBeenNthCalledWith(1, 1, 1);
    expect(provider.onIteration).toBeCalledWith(fixtures.onReproduction.expected);
  });
});
