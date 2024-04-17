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
      // middleware makes sure to serialize data before storing in localStorage.
      // stops actions from being serialized and persisted to storage.
      serializableCheck: {
        // what to get serialized and stored/persisted in storage
        // ignore these actions i.e. don't serialize and store these in localStorage
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
