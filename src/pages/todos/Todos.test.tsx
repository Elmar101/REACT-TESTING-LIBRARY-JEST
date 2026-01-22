import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test-utils/renderWithProviders";
import { Todos } from "./Todos";

test("createTodo -> invalidates -> todos list yenilənir", async () => {
  const user = userEvent.setup();
  const { cleanupRtkQuery } = renderWithProviders(<Todos />, { token: "fake-token" });

  // İlk list gəlir
  expect(await screen.findByText("Learn RTK Query")).toBeInTheDocument();

  // Yeni todo əlavə et
  await user.type(screen.getByLabelText(/title/i), "New todo");
  await user.click(screen.getByRole("button", { name: /add/i }));

  // invalidation səbəbi ilə getTodos refetch olacaq, yeni item görünməlidir
  expect(await screen.findByText("New todo")).toBeInTheDocument();
  await cleanupRtkQuery();
});
