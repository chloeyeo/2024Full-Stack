import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // localstorage for web application
import userReducer from "./userSlice";

const rootReducer = combineReducers({
  // combineReducers??
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

// persistReducer 직접 만들기
const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
// });

export const store = configureStore({
  reducer: persistedReducer,
  // ???
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // middleware는 시간 등 누적되는 값을 제공
      // stops persistor related errors
      serializableCheck: {
        // when getting serialized json data we can get these errors so we prevent these errors by ignoring actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
