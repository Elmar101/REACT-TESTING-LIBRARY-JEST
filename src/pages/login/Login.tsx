import { useState } from "react";
import { setToken } from "@/features/auth/authSlice";
import { useLoginMutation } from "@/features/api/auth";
import { useAppDispatch } from "@/features/hooks";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, isError, data }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async () => {
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setToken(res.token));
    } catch {
      // handled via isError
    }
  };

  return (
    <div>
      <label>
        Email
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>

      <label>
        Password
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>

      <button onClick={onSubmit} disabled={isLoading}>
        Sign in
      </button>

      {data?.token && <p>Logged in</p>}
      {isError && <p>Invalid credentials</p>}
    </div>
  );
}

