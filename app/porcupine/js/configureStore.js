import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createReducer } from 'redux-orm';
import { createLogger } from 'redux-logger';
// import { throttle } from 'lodash/throttle';

// import { loadState, saveState } from './localStorage';
import bootstrap from './bootstrap';
import orm from './orm';
import porcupineApp from './reducers/index';

console.log(orm);
const rootReducer = combineReducers({
    orm: createReducer(orm), // database components
    porcupineApp,  // non-database components
});

const configureStore = () => {

  const createStoreWithMiddleware = applyMiddleware(createLogger())(createStore);
  const store = createStoreWithMiddleware(rootReducer, bootstrap(orm));

  return store;
}

// const configureStore = () => {
//   const persistedState = loadState();
//   const store = createStore(
//     porcupineApp,
//     persistedState
//   );
//   store.subscribe(() => {
//     saveState(
//       store.getState()
//     );
//   });
//   // store.subscribe(throttle(() => {
//   //   saveState(
//   //     store.getState()
//   //   );
//   // }, 1000));
//
//   return store;
// };

export default configureStore;
