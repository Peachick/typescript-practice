/**
 * sorts
 * @description: 函数重载
 * @param arr Array<number> | Array<string>
 */

function sort(arr: Array<number>): Array<number>

function sort(arr: Array<string>): Array<string>

function sort(arr: any[]){
  if(!arr || !Array.isArray(arr)) return []
  return arr.sort()
}

console.log(sort([]))


class App {
  private _version: string = "1.0.1"
  age: number
  name: string
  sex: number  // null,0 男, 1 女
  constructor(age: number, name: string, sex: number = 0) {
    this.age = age
    this.name = name
    this.sex = sex
  }

  set version(ver: string) {
    this._version = ver
  }

  get version() {
    return this._version
  }

  public work():void {
    console.log(this.version)
  }
}

const app:App = new App(11, "小明")
app.version = "111"
console.log(app.version)
console.log(app)
app.work()
