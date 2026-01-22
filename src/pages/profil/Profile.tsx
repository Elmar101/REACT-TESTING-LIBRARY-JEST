import { useGetUserQuery } from "@/features/api/auth";
import { useAppSelector } from "@/features/hooks";


export function Profile() {
  const token = useAppSelector((s) => s.auth.token);

  const { data, isLoading, isError, error } = useGetUserQuery(undefined, {
    skip: !token, // ✅ token yoxdursa request atma
  });

  if (!token) return <p>Unauthorized</p>;
  if (isLoading) return <p>Loading...</p>;
  if (isError) {
    const status = (error as any)?.status;
    return <p>{status === 401 ? "Unauthorized" : "Something went wrong"}</p>;
  }

  return <h1>{data?.name}</h1>;
}
