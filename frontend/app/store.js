import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// ✅ Persist Config
const persistConfig = {
  key: "root",
  storage,
};

// ✅ Persisted Reducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// ✅ Store
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ✅ Ignore redux-persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// ✅ Persistor
export const persistor = persistStore(store);
