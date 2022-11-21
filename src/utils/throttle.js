export const throttle = (fn, delay = 1000) => {
  let flag = false;
  let waitingArgs = null;

  const timeoutFunc = () => {
    if (waitingArgs === null) {
    } else {
      // call the function with waiting args as delay is completed
      fn(...waitingArgs);
      waitingArgs = null;
    }

    // set the flag to false to be able to make new function calls
    flag = false;
  };

  return (...args) => {
    console.log('Inside', flag);
    if (flag) {
      waitingArgs = args;
      return;
    }
    fn(...args);
    flag = true;
    setTimeout(timeoutFunc, delay);
  };
};

// without calling again with waiting arguments (NOT RECOMMENDED)
export const badThrottle = (fn, delay = 1000) => {
  let flag = false;
  return (...args) => {
    if (flag) return;
    fn(...args);
    flag = true;

    setTimeout(() => {
      flag = false;
    }, delay);
  };
};
