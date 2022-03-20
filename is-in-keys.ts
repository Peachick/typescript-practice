/**
 * 类型守卫：使用`is, in` 关键字进一步缩小类型范围
 *  1. in
 *  2. is
 */

//- 1.is
const isString = (arg: unknown): arg is string => typeof arg === 'string'
function useIt(it: number | string) {
  if (isString(it)) {
    return it.length  // 这里it 推断为 string 类型
  }
  return it
}
// 假值判断
// type Falsy = false | "" | 0 | null | undefined
// const isFalsy = (val: unknown): val is Falsy => !val
// 判断function
type Functional = Function
const isFunction = (val: unknown): val is Functional => typeof val === 'function'


//- 2.in
class A {
  public a() {}
  public useA() { return 'A' }
}
class B {
  public b() {}
  public useB() { return 'B' }
}
function useIt2(arg: A | B): void {
  'a' in arg ? arg.useA() : arg.useB()
}

type TypeName<T> = T extends string
	? "string"
	: T extends number
	? "number"
	: T extends boolean
	? "boolean"
	: T extends undefined
	? "undefined"
	: T extends Function
	? "function"
	: "object";

function getKeyVal<T extends Object, U extends keyof T> (
  origin: T,
  key: U
): T[U] {
  return origin[key]
}

const obj = { name: 'types', age: 10 }
console.log(getKeyVal(obj, 'name'))