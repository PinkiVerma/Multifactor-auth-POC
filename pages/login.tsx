import { CodeSignIn } from "@/components/CodeSignin";
import { Login } from "@/components/Login";
import {
  login,
  signInWithGoogle,
  verifyUserMFA,
} from "@/firebase/authentication";
import { useRecaptcha } from "@/hooks/useRecatcha";
import { notify } from "@/utils/notify";
import { MultiFactorResolver } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const recaptcha = useRecaptcha("sign-in");
  const [verificationId, setVerificationId] = useState<string>();
  const [resolver, setResolver] = useState<MultiFactorResolver>();
  async function loginWithGoogle() {
    const response = await signInWithGoogle();

    if (response === true) {
      await router.push("/user");
    } else {
      await handleMFA(response);
      notify("Something went wrong");
    }
  }

  async function loginWithEmailAndPassword(email: string, password: string) {
    const response = await login(email, password);

    if (response === true) {
      await router.push("/user");
    } else {
      await handleMFA(response);
      // notify("Something went wrong");
    }
  }

  async function handleMFA(response: any) {
    if (response.code === "auth/multi-factor-auth-required" && recaptcha) {
      const data = await verifyUserMFA(response, recaptcha, 0);

      if (!data) {
        notify("Something went wrong.");
      } else {
        const { verificationId, resolver } = data;
        setVerificationId(verificationId);
        setResolver(resolver);
      }
    } else {
      notify("Something went wrong");
    }
  }

  return (
    <>
      {!verificationId && !resolver && (
        <Login
          loginWithGoogle={loginWithGoogle}
          loginWithEmailAndPassword={loginWithEmailAndPassword}
        />
      )}
      {verificationId && resolver && (
        <CodeSignIn verificationId={verificationId} resolver={resolver} />
      )}
      <div id="sign-in"></div>
    </>
  );
};

export default LoginPage;
