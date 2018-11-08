import GameOfLife from "./GameOfLife";
import { DOMProvider } from "./../providers";

const game = new GameOfLife({
  provider: new DOMProvider(),
  sizeX: 100,
  sizeY: 100,
  speed: 1000
});

game.start();

let configForm = document.querySelector("#config form");
let pauseButton = document.querySelector("#pause");

pauseButton.addEventListener("click", () => {
  if (game.isPaused()) {
    game.start();
    pauseButton.textContent = "Pause";
  } else {
    game.pause();
    pauseButton.textContent = "Continue";
  }
});

configForm.addEventListener("submit", () => {
  const sizeX = parseInt(configForm.sizeX.value);
  const sizeY = parseInt(configForm.sizeY.value);
  const speed = parseInt(configForm.speed.value);

  if (sizeX && sizeY) {
    game.restart({
      provider: new DOMProvider(),
      sizeX,
      sizeY,
      speed
    });
  }

  event.preventDefault();
});
