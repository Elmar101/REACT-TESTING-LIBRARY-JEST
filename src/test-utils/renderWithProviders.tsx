
import { render, type RenderOptions, act } from "@testing-library/react";
import { setToken } from "../features/auth/authSlice";
import { makeStore, type AppStore } from "@/features/store";
import type { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { api } from "@/features/api/auth";

type ExtendedOptions = RenderOptions & {
  store?: AppStore;
  token?: string | null;
};

export function renderWithProviders(
  ui: React.ReactElement,
  { store = makeStore(), token = null, ...options }: ExtendedOptions = {}
) {
  if (token) store.dispatch(setToken(token));

  function Wrapper({ children }: PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>;
  }

  const result = render(ui, { wrapper: Wrapper, ...options });

  // ✅ RTK Query requestlərini dayandırır, cache-i sıfırlayır
  const cleanupRtkQuery = async () => {
    await act(async () => {
      store.dispatch(api.util.resetApiState());
    });
  };

  return { store, cleanupRtkQuery, ...result };
}

