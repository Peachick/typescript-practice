/**
 * 模式匹配:
 *  Typescript 类型的模式匹配是通过 extends 对类型参数做匹配，
 *  结果保存到通过 infer 声明的局部类型变量里，如果匹配就能从该局部变量里拿到提取出的类型。
 */

// 提取Promise值
type GetPromiseValue<T> = T extends Promise<infer Value> ? Value : never
type GetPromiseValueRes1 = GetPromiseValue<Promise<{ name: string; age: number }>> // {name: string; age: number}
type GetPromiseValueRes2 = GetPromiseValue<Promise<true>> // true
type GetPromiseValueRes3 = GetPromiseValue<'string'> // never


// 数组类型
//- First
type GetFirst<Arr extends Array<unknown>> = Arr extends [infer first, ...Array<unknown>] ? first : never
type GetFirstRes1 = GetFirst<[1, 2, 3]> // 1
type GetFirstRes2 = GetFirst<[{ name: 1 }, 2, 3]> // { name: 1}
type GetFirstRes3 = GetFirst<[]> // never
//- Last
type GetLast<Arr extends Array<unknown>> = Arr extends [...Array<unknown>, infer last] ? last : never
type GetLastRes1 = GetLast<[1, 2, 3]> // 3
type GetLastRes2 = GetLast<[]> // never
//- Pop
type PopArr<Arr extends Array<unknown>> = Arr extends []
  ? []
  : Arr extends [...infer Rest, unknown]
  ? Rest
  : never
type PopArr1 = PopArr<[]> // []
type PopArr2 = PopArr<[1, 2, 3]> // [1, 2]
//- Shift
type ShiftArr<Arr extends Array<unknown>> = Arr extends []
  ? []
  : Arr extends [unknown, ...infer Rest]
  ? Rest
  : never
type ShiftArr1 = ShiftArr<[]> // []
type ShiftArr2 = ShiftArr<[1, 2, 3]> // [2, 3]


// 字符串类型
//- StartWith
type StartsWith<str extends string, prefix extends string> = str extends `${prefix}${string}` ? true : false
type StartsWith1 = StartsWith<'hello world', 'hello'> // true
type StartsWith2 = StartsWith<'hello world', 'world'> // false
//-Trim
type TrimRight<str extends string> = str extends `${infer Rest}${' ' | '\n' | '\t'}` ? TrimRight<Rest> : str
type TrimRight1 = TrimRight<'hello    '> // hello
type TrimLeft<str extends string> = str extends `${' ' | '\n' | '\t'}${infer Rest}` ? TrimLeft<Rest> : str
type TrimLeft1 = TrimLeft<'     hello'> // hello
type Trim<str extends string> = TrimLeft<TrimRight<str>>
type Trim1 = Trim<'   hello world   '> // hello world


// 函数
//- GetParameters
type GetParameters<func extends Function> = func extends (...args: infer Args) => unknown ? Args : never
type GetParameters1 = GetParameters<(name: string, age: number) => string> // [name: string, age: number]
type GetParameters2 = GetParameters<({ name: string, age: number }) => string> // [{name: string, age: number}]
//- GetReturnType
type GetReturnType<func extends Function> = func extends (...ars: any[]) => infer returnType ? returnType : never
type GetReturnType1 = GetReturnType<() => 'Animal'> // Animal
type GetReturnType2 = GetReturnType<() => string> // string
//- GetThisParameterType
type GetThisParameterType<T> = T extends (this: infer thisType, ...args: any[]) => any ? thisType : unknown
class Cat {
  constructor(public name: string) { }
  say(this: Cat) {
    return this.name
  }
}
const cat = new Cat('')
// cat.say.call({ name: 1 }) 
type GetThisParameterType1 = GetThisParameterType<typeof cat.say> // Cat
//- GetInstanceType
interface Person {
  name: string;
}
interface PersonConstructor {
  new(name: string): Person;
}
type GetInstanceType<ctor extends new (...args: any) => any> = ctor extends new (...args: any) => infer instanceType ? instanceType : unknown
type GetInstanceType1 = GetInstanceType<PersonConstructor> // Person
//-GetConstructorParameters
type GetConstructorParameters<ctor extends new (...args: any) => any> = ctor extends new (...args: infer Args) => any ? Args : unknown
type GetConstructorParameters1 = GetConstructorParameters<PersonConstructor> // [name: string]
