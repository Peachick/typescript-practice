// function factorial(n) {
//   if(isFinite(n) && n > 0 && n == Math.round(n)) {
//     if (! (n in factorial)) factorial[n] = n * factorial(n - 1)
//     return factorial[n]
//   }
//   else return NaN
// }
// factorial[1] = 1

// 写一个记忆函数
function memorize(fn) {
  const cache = {}
  return function() {
    const key = arguments.length + Array.prototype.join.call(arguments, ',')
    if(key in cache) return cache[key]
    return cache[key] = fn.apply(this, arguments)
  }
}

const factorial = memorize(n => n <= 1 ? 1 : factorial(n - 1) * n)

function notCacheFactorial(n) {
  if (n <= 0) return 1
  if (n == 1) return 1
  return n * notCacheFactorial(n - 1)
}

console.time('factorial')
console.log(factorial(20))
console.timeEnd('factorial')

console.time('notCacheFactorial')
console.log(notCacheFactorial(20))
console.timeEnd('notCacheFactorial')

console.time('factorial')
console.log(factorial(18))
console.timeEnd('factorial')

console.time('notCacheFactorial')
console.log(notCacheFactorial(18))
console.timeEnd('notCacheFactorial')

console.log(factorial)
console.log(notCacheFactorial)

