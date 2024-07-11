import { createStore, combineReducers, applyMiddleware } from 'redux';
import { toolReducer } from './reducers/toolReducer';
import { userReducer } from './reducers/userReducer';
import { imagesReducer } from './reducers/imageReducer';

const rootReducer = combineReducers({
  tool: toolReducer,
  user: userReducer,
  images: imagesReducer,
});

const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
