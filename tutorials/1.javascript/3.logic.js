const cat = {
  age: 2,
  name: "Puss",
  selfy: "🐱",
  weight: 1
};

const dog = {
  age: 1,
  name: "Jolo",
  selfy: "🐶",
  weight: "1"
};





cat.age > dog.age || cat.age >= dog.age; // => true
cat.age < dog.age && cat.age <= dog.age; // => false




cat.weight == dog.weight; // => ?
cat.weight === dog.weight; // => ?




const myPets = [];
const yourPets = myPets;
myPets === yourPets; // => ?

yourPets.push(dog);
myPets === yourPets; // => ?
// Why?




// Truthness:
"" || null || undefined || 0 || false;
"yeah" && [] && 1 && true;

// Normalize to boolean with:
Boolean("0"); // => ?
!!"false"; // => ?

// Bullshits:
"" == false; // => ?
1 !== true; // => ?
