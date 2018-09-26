import GameOfLife from "./GameOfLife";
import { DOMProvider } from "./../providers";

const game = new GameOfLife({
  provider: new DOMProvider(),
  sizeX: 5,
  sizeY: 5,
  speed: 1000
});

game.start();
