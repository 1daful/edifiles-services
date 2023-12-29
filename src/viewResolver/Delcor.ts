// A method decorator that takes a callback function as an argument and adds it to an array of listeners
function on(callback: Function, context: any) {
  // Return a function that receives the target, property key, and descriptor of the decorated method
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // Get or create the array of listeners for the target method
    let listeners = target[propertyKey + "_listeners"] || [];
    // Add the callback function to the array
    listeners.push(callback);
    // Assign the array to the target method
    target[propertyKey + "_listeners"] = listeners;
  };
}

// A class decorator that overrides the original methods with new ones that invoke all the listeners
function triggerable(target: Function, context: any) {
  // Loop through all the properties of the target class
  for (let propertyKey in target.prototype) {
    // Get the array of listeners for the current property
    let listeners = target.prototype[propertyKey + "_listeners"];
    // If the array exists and is not empty
    if (listeners && listeners.length > 0) {
      // Get the original method
      let originalMethod = target.prototype[propertyKey];
      // Define a new method that invokes all the listeners
      let newMethod = function (...args: any[]) {
        // Invoke the original method with the given arguments
        originalMethod.apply(this, args);
        // Loop through all the listeners
        for (let listener of listeners) {
          // Invoke each listener with the given arguments
          listener.apply(this, args);
        }
      };
      // Override the original method with the new one
      target.prototype[propertyKey] = newMethod;
    }
  }
}

// A class with a method decorated with @triggerable and some methods decorated with @on
@triggerable
class ExampleClass {
  whenSomething() {
    console.log("When something");
  }

  @on(function () {
    console.log("Do something");
  })
  doSomething() {}

  @on(function () {
    console.log("Do something else");
  })
  doSomethingElse() {}
}

// Create an instance of the class and call the decorated method
let example = new ExampleClass();
example.whenSomething(); // Prints "When something", "Do something", and "Do something else"
