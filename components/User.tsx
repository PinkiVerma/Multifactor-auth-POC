import {
  logout,
  verifyIfUserIsEnrolled,
  verifyUserEmail,
} from "@/firebase/authentication";
import { User } from "@firebase/auth";
import Link from "next/link";
import { notify } from "@/utils/notify";
import { useEffect, useState } from "react";

type Props = {
  currentUser: User | null;
};

export function User({ currentUser }: Props) {
  const [isVerified, setIsVerified] = useState();
  async function sendEmail() {
    if (currentUser) {
      const response = await verifyUserEmail(currentUser);

      if (response) {
        notify("An Email has been sent to you");
      } else {
        notify("Something went wrong");
      }
    }
  }

  useEffect(() => {
    verifyIfUserIsEnrolled(currentUser!).then((res) => {
      setIsVerified(res);
    });
  }, [currentUser]);

  return (
    <div className="bg-white h-screen w-screen">
      <div className="flex flex-col justify-center items-center px-12 gap-y-12 pt-40">
        <h2 className="mt-20 text-3xl text-center font-bold text-gray-800">
          Hello 👋
        </h2>
        {currentUser && currentUser.emailVerified && !isVerified && (
          <Link
            className="hover:text-black underline text-center w-full"
            href="/mfa"
          >
            Activate the multifactor authentication
          </Link>
        )}
        {currentUser && !currentUser.emailVerified && !isVerified && (
          <button
            onClick={sendEmail}
            className="hover:text-black underline text-center w-full"
          >
            Verify your email
          </button>
        )}
        <button
          onClick={logout}
          className="bg-black rounded-xl flex h-11 items-center justify-center px-6"
        >
          <span className="relative text-base font-light text-white">
            Disconnect
          </span>
        </button>
      </div>
    </div>
  );
}
