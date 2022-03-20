// 泛型

// 类实例
class BeeKeeper {
  name: string
}
class DogKeeper {
  name: string
}
class Animal1{
  say() {}
}
class Bee extends Animal1 {
  keeper: BeeKeeper
}
class Dog extends Animal1 {
  keeper: Dog
}
function createInstance<T>(ins: { new(): T }): T {
  return new ins()
}
const dog = createInstance<Bee>(Bee)
console.log(dog.keeper.name)