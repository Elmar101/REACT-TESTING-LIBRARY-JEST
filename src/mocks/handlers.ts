import { http, HttpResponse, delay } from "msw";

type Todo = { id: number; title: string };

let todos: Todo[] = [
  { id: 1, title: "Learn RTK Query" },
  { id: 2, title: "Write tests" },
];

const BASE = "http://localhost";

export const handlers = [
  // ✅ Login
  http.post(`${BASE}/api/login`, async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };

    if (body.email === "a@b.com" && body.password === "123") {
      return HttpResponse.json({ token: "fake-token" }, { status: 200 });
    }
    return HttpResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }),

  // ✅ Profile (auth tələb edir)
  http.get(`${BASE}/api/user`, async ({ request }) => {
    const auth = request.headers.get("authorization");
    if (auth !== "Bearer fake-token") {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await delay(50);
    return HttpResponse.json({ id: 1, name: "Elmar" }, { status: 200 });
  }),

  // ✅ Todos list (auth tələb edir)
  http.get(`${BASE}/api/todos`, ({ request }) => {
    const auth = request.headers.get("authorization");
    if (auth !== "Bearer fake-token") {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    return HttpResponse.json(todos, { status: 200 });
  }),

  // ✅ Create todo (auth tələb edir)
  http.post(`${BASE}/api/todos`, async ({ request }) => {
    const auth = request.headers.get("authorization");
    if (auth !== "Bearer fake-token") {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as { title: string };
    const newTodo: Todo = { id: Date.now(), title: body.title };
    todos = [newTodo, ...todos];

    return HttpResponse.json(newTodo, { status: 201 });
  }),
];
