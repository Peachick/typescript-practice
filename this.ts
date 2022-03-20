// this相关

interface Animal {
  name: string;
  age: number;
}
interface Zoom {
  animals: Array<string>;
  gainAnimal(this: Zoom): () => Animal
}

const animal: Zoom = {
  animals: ['Dog', 'Cat', 'Bird', 'Pig'],
  gainAnimal(this: Zoom) {
    return () => {
      const age = Math.floor(Math.random() * 4)
      const name = this.animals[age]
      return {
        name,
        age,
      }
    }
  }
}
const getAnimal = animal.gainAnimal()
console.log(getAnimal())