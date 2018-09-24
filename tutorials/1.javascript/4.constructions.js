// if, else if, else:
if (false) {
  console.log("I'm false");
} else if (false && false) {
  console.log("I'm double false");
} else {
  console.log("In case I'm actually true 🤔");
}




// Switch case:
let value = "👽";
switch (value) {
  case "👽":
    console.log("alien");
  case "💩":
    console.log("poop");
    break;
  case "👻":
    return console.log("ghost");

  default:
    console.log("nobody likes me");
}




{
  // Functions:
  // old:
  function imHiding(name) {
    console.log(`You found me, ${name}!`);
  }
  // anonymous function
  const imHiding = function (name) {
    console.log(`You found me, ${name}!`);
  };
}

{
  // new:
  const imHiding = name => console.log(`You found me, ${name}!`);
  imHiding("John");
}




// Loops:
while (true) {
  console.log("Infinite loop", "😱");
}

do {
  console.log("Infinite loop", "😱");
} while (true);

for (let index = 0; index < 3; index++) {
  console.log(index);
  if (index > 1) break;
}
