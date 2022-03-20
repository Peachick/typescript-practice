/**
 * 重新构造
 *  TypeScript 的 type、infer、类型参数声明的变量都不能修改，
 *  想对类型做各种变换产生新的类型就需要重新构造。
 */

// 数组构造
//- Push
type Push<Arr extends unknown[], Ele = any> = [...Arr, Ele]
type PushResult1 = Push<[1, 2, 3], 4>  // [1,2,3,4]

//- Unshift
type Unshift<Arr extends unknown[], Ele = any> = [Ele, ...Arr]
type Unshift1 = Unshift<[1, 2, 3], 4> // [4, 1,2,3]

//- Zip
type Zip<T extends unknown[], U extends unknown[]> =
  T extends [infer TFirst, ...infer TRest]
  ? U extends [infer UFirst, ...infer URest]
  ? [[TFirst, UFirst], ...Zip<TRest, URest>]
  : []
  : []
type Zip1 = Zip<[1, 2], ['hello']> // [[1, hello]]
type Zip2 = Zip<[1, 2], ['hello', 'world']> // [[1, hello], [2, world]]


// 字符串
//- CapitalizeStr
type CapitalizeStr<str extends string> = str extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : str
type CapitalizeStr1 = CapitalizeStr<'hello'> // Hello

//- CamelCase
type CamelCase<str extends string> = str extends `${infer Left}_${infer Right}${infer Rest}` ? `${Left}${Uppercase<Right>}${CamelCase<Rest>}` : str
type CamelCase1 = CamelCase<'click_item_image'> // clickItemImage

//- DropSubStr
type DropSubStr<str extends string, subStr extends string> = str extends `${infer Prefix}${subStr}${infer Rest}` ? DropSubStr<`${Prefix}${Rest}`, subStr> : str
type DropSubStr1 = DropSubStr<'hello~ world~~~~', '~'> // hello world


// 索引类型
//- Mapping
type Mapping<obj extends Object> = {
  [Key in keyof obj]: [obj[Key], obj[Key]]
}
type Mapping1 = Mapping<{ name: string }> // { name: [string, string]}
type Mapping2 = Mapping<{ name: 2, sex: 3 }> // { name: [2, 2], sex: [3, 3]}

//- UppercaseKey
type UppercaseKey<obj extends Record<string, any>> = {
  [Key in keyof obj as Key extends `${infer First}${infer Rest}` ? `${Uppercase<First & string>}${Rest}` : never]: obj[Key]
}
type UppercaseKey1 = UppercaseKey<{ name: '小明' }> // {Name: '小明}

//- ToReadonly
type ToReadonly<T extends Record<string, any>> = {
  readonly [Key in keyof T]: T[Key]
}
interface IQuery { name: string; readonly sex: number; age?: number }
type ToReadonly1 = ToReadonly<IQuery> // { readonly name: string; readonly sex: number; readonly age?: number | undefined; }

//- ToPartial
type ToPartial<T extends Record<string, any>> = {
  [Key in keyof T]?: T[Key]
}
type ToPartial1 = ToPartial<IQuery> // { name?: string; readonly sex?: number; age?: number; }

//- ToMutable
type ToMutable<T extends Record<string, any>> = {
  -readonly [Key in keyof T]: T[Key]
}
type ToMutable1 = ToMutable<IQuery> // { name: string; sex: number; age: number; }

//- ToRequired
type ToRequired<T extends Record<string, any>> = {
  [Key in keyof T]-?: T[Key]
}
type ToRequired1 = ToRequired<IQuery> // { name: string; readonly sex: number; age: number; }

//- FilterByValueType
type FilterByValueType<
  Obj extends Record<string, any>,
  ValueType
  > = {
    [Key in keyof Obj
    as ValueType extends Obj[Key] ? Key : never]
    : Obj[Key]
  }
type FilterByValueType1 = FilterByValueType<IQuery, string> // {name: string}