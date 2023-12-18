import { User } from "@firebase/auth";
import { PhoneRegistration } from "@/components/PhoneRegistration";
import { verifyPhoneNumber } from "@/firebase/authentication";
import { notify } from "@/utils/notify";
import { useState } from "react";
import { useRecaptcha } from "@/hooks/useRecatcha";
import { CodeSignup } from "./CodeSignup";

type Props = {
  currentUser: User | null;
};
export default function CreateMultiFactorAuthentication({
  currentUser,
}: Props) {
  const recaptcha = useRecaptcha("sign-up");
  const [verificationCodeId, setVerificationCodeId] = useState<string | null>(
    null
  );

  async function getPhoneNumber(phoneNumber: string) {
    if (!currentUser || !recaptcha) {
      return;
    }

    console.log(currentUser, "currentUser");
    console.log(phoneNumber, "phoneNumber");
    console.log(recaptcha, "recaptcha");

    const verificationId = await verifyPhoneNumber(
      currentUser,
      phoneNumber,
      recaptcha
    );

    console.log(recaptcha, "verificationId");

    if (!verificationId) {
      notify("Something went wrong.");
    } else {
      setVerificationCodeId(verificationId);
    }
  }

  return (
    <>
      {!verificationCodeId && (
        <PhoneRegistration getPhoneNumber={getPhoneNumber} />
      )}
      {verificationCodeId && currentUser && (
        <CodeSignup
          currentUser={currentUser}
          verificationCodeId={verificationCodeId}
        />
      )}
      <div id="sign-up"></div>
    </>
  );
}
