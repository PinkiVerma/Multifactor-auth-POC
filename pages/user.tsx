import { Loading } from "@/components/Loading";
import { User } from "@/components/User";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";

export default function UserPage() {
  const currentUser = useCurrentUser();
  const router = useRouter();

  if (currentUser === "loading") {
    return <Loading />;
  }

  if (!currentUser) {
    void router.push("/login");
  }
  return <User currentUser={currentUser} />;
}
