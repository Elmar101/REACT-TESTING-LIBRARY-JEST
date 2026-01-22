import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test-utils/renderWithProviders";
import { Profile } from "./Profile";

test("token YOXDUR -> Unauthorized görünür", async () => {
  const { cleanupRtkQuery } = renderWithProviders(<Profile />);

  // request gedəcək, MSW 401 qaytaracaq
  expect(await screen.findByText(/unauthorized/i)).toBeInTheDocument();

  await cleanupRtkQuery();
});

test("token VAR -> user name görünür", async () => {
  const { cleanupRtkQuery } = renderWithProviders(<Profile />, { token: "fake-token" });

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  expect(await screen.findByRole("heading", { name: "Elmar" })).toBeInTheDocument();
  await cleanupRtkQuery();
});
