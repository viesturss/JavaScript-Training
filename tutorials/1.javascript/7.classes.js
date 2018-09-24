{
  // Old style, prototype approach:
  function Pet(age, name, selfy) {
    this.age = age;
    this.name = name;
    this.selfy = selfy;
  }

  // You use `prototype` property to modify to object constructors
  Pet.prototype.description = function () {
    return `${this.selfy} - ${this.name}, age: ${this.age}`;
  };

  const puss = new Pet(2, "Puss", "🐱");
  console.warn(puss.description());
}

// Every object in JavaScript has `prototype` property.
console.warn(Array.prototype);
// However, it is bad idea to modify standard library prototypes. See #SmooshGate.




{
  // Alternative to prototypes (purely syntatic sugur), is to use classes:
  class Pet {
    constructor(age, name, selfy) {
      this.age = age;
      this.name = name;
      this.selfy = selfy;
    }

    description() {
      return `${this.selfy} - ${this.name}, age: ${this.age}`;
    }
  }

  const puss = new Pet(2, "Puss", "🐱");
  console.warn(puss.description());
}




// `this` keyword refers to current(scoped) parent context.
// In classes, `this` is the instance of current object.




{
  // Functions are dumb (so to say):
  const puss = {
    age: 2,
    name: "Puss",
    selfy: "🐱",
    description: () => {
      return `${this.selfy} - ${this.name}, age: ${this.age}`;
    },
    description: function () {
      return `${this.selfy} - ${this.name}, age: ${this.age}`;
    }
  };
  puss.description();

  // const description = puss.description;
  // description();
}
