// 声明文件
// 可以自定义一些变量，或者，为那些第三方库没有提供TS声明的库，进行变量类型声明,
// 比如HTML 中使用了 jquery，但是jQuery没有ts，因此可以全局声明jquery

declare var SR: number;

declare module "test" {
  export function log(...args: Array<number>) :void;
}

declare var jQuery: (selector: string) => any;
declare module "jQuery" {
  export function eq(index: number): any
}
