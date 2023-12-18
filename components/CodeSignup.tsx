// import { Code } from "@/components/Code";
import { User } from "@firebase/auth";
// import { enrollUser } from "@/firebase/authentication";
import { useRouter } from "next/router";
import { notify } from "@/utils/notify";
import { Code } from "./Code";
import { enrollUser } from "@/firebase/authentication";

type Props = {
  currentUser: User;
  verificationCodeId: string;
};

export function CodeSignup({ currentUser, verificationCodeId }: Props) {
  const router = useRouter();

  async function getCode(code: string) {
    const response = await enrollUser(currentUser, verificationCodeId, code);
    console.log(response, "response");
    if (response) {
      await router.push("/user");
    } else {
      notify("Something went wrong.");
    }
  }

  return <Code getCode={getCode} />;
}
