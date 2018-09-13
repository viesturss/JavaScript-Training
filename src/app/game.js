import GameOfLife from "./GameOfLife";
import { DOMProvider } from "./../providers";

const game = new GameOfLife({
  provider: new DOMProvider(),
  sizeX: 100,
  sizeY: 50,
  speed: 100
});

game.start();
