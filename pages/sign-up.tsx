import { useCurrentUser } from "@/hooks/useCurrentUser";
import { SignUp } from "../components/Signup";
import { useRouter } from "next/router";
import { Loading } from "@/components/Loading";
import { auth } from "@/firebase/authentication";

export default function SignupPage() {
  const currentUser = useCurrentUser();
  const router = useRouter();

  console.log(auth, "authObj");

  if (currentUser === "loading") {
    return <Loading />;
  }

  if (currentUser) {
    void router.push("/user");
  }
  return <SignUp />;
}
