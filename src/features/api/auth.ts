import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export type User = { id: number; name: string };
export type LoginReq = { email: string; password: string };
export type LoginRes = { token: string };

export type Todo = { id: number; title: string };
export type CreateTodoReq = { title: string };

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    // auth
    login: builder.mutation<LoginRes, LoginReq>({
      query: (body) => ({ url: "/api/login", method: "POST", body }),
    }),

    // profile
    getUser: builder.query<User, void>({
      query: () => "/api/user",
    }),

    // todos
    getTodos: builder.query<Todo[], void>({
      query: () => "/api/todos",
      providesTags: ["Todos"],
    }),

    createTodo: builder.mutation<Todo, CreateTodoReq>({
      query: (body) => ({ url: "/api/todos", method: "POST", body }),
      invalidatesTags: ["Todos"], // ✅ mutation-dan sonra list refetch olur
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserQuery,
  useGetTodosQuery,
  useCreateTodoMutation,
} = api;
