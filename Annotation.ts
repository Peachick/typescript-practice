// 注解

class Annotation {

  @f()
  show() :void {
    console.log("show...");
  }
}

function f() {
  return function(target, key) {
    console.log(222)
  }
}

new Annotation().show()
