import GameOfLife from "./GameOfLife";
import { DOMProvider } from "./../providers";

const game = new GameOfLife({
  provider: new DOMProvider(),
  sizeX: 100,
  sizeY: 50,
  speed: 100
});

game.start();

const form = document.querySelector("form");
Array.from(form.elements)
  .filter(({ localName }) => localName !== "button")
  .forEach(element => element.setAttribute("value", game[element.getAttribute("name")]));

form.addEventListener("submit", event => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Array.from(formData).reduce((acc, [key, value]) => {
    return { ...acc, [key]: parseInt(value, 10) };
  }, {});

  game.restart({ ...data, provider: new DOMProvider() });
});

document.querySelector("#pause").addEventListener("click", event => {
  event.preventDefault();
  if (game.interval) {
    game.pause();
    event.target.textContent = "Continue";
  } else {
    game.start();
    event.target.textContent = "Pause";
  }
});
