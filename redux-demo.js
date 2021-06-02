const redux = require("redux");
// 1. create reducer function
// when `redux.createStore` run first time
// this function will get called too
// since for the time invocation, `curState` is null
// `curState.counter` wil throw (can not read .counter of undefined)
// so, we need to pass in default value for `curState`
// *** IMPORTANT ***
// again, when `redux.createStore(counterReducer)` runs first time
// the will run this function
// that means when `store.dispatch()` runs, the current state will be `{ counter: 2 }`
// since that is second time invoked `counterReducer`
const counterReducer = (curState = { counter: 0 }, action) => {
  // with this logic, the state is NOT going increase
  // when `redux.createStore(counterReducer)` runs first time
  if (action.type === "INCREMENT") {
    return {
      counter: curState.counter + 1,
    };
  }

  if (action.type === "DECREMENT") {
    return {
      counter: curState.counter - 1,
    };
  }

  //   return {
  //     counter: curState.counter + 1,
  //   };

  return curState;
};

// 2. create central data store
// `counterReducer` is responsible for changing the state
const store = redux.createStore(counterReducer);

// 3. create subscribers (components)
// this function will get executes when state changes in the contral data store
const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

// subscribe the `counterSubscriber` to the data store
store.subscribe(counterSubscriber);

// 4. create actions
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });
