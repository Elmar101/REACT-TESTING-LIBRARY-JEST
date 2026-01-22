import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/test-utils/renderWithProviders";
import { LoginForm } from "./Login";
import { Profile } from "../profil/Profile";

function Page() {
  return (
    <div>
      <LoginForm />
      <Profile />
    </div>
  );
}

test("login edəndən sonra profile name görünür", async () => {
  const user = userEvent.setup();
  const { cleanupRtkQuery } = renderWithProviders(<Page />);

  // əvvəl token yoxdur -> Unauthorized
  expect(await screen.findByText(/unauthorized/i)).toBeInTheDocument();

  // login et
  await user.type(screen.getByLabelText(/email/i), "a@b.com");
  await user.type(screen.getByLabelText(/password/i), "123");
  await user.click(screen.getByRole("button", { name: /sign in/i }));

  // token set olundu, Profile query təzədən işləyəcək və ad görünəcək
  expect(await screen.findByRole("heading", { name: "Elmar" })).toBeInTheDocument();
  await cleanupRtkQuery();
});
