import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice"; // alias işləmirsə: ../features/auth/authSlice
import { api } from "@/features/api/auth"; // alias işləmirsə: ../features/api/auth

// Testlər üçün "fresh store" yaratmaq daha yaxşıdır:
export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
