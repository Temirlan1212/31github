import { signIn } from "next-auth/react";
import { IUserFormSchema } from "@/app/validator-shema/user";
import { UseFormReset, UseFormSetError } from "react-hook-form";
import { getServerMessage } from "./server-messages";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface IAuthProps {
  credentials: IUserFormSchema;
  options: {
    setError: UseFormSetError<any>;
    reset: UseFormReset<any>;
    router: AppRouterInstance;
  };
}

export const authentication = async (props: IAuthProps) => {
  const { email, username, password } = props.credentials;
  const { setError, reset, router } = props.options;

  const credentials = { email, username, password };
  const res = await signIn("credentials", { ...credentials, redirect: false });

  if (!res?.ok && res?.error) {
    const errors = JSON?.parse(res?.error ?? "");
    Object.keys(errors)?.map((key) => {
      const message = getServerMessage(errors?.[key]);
      setError(key, { message: message ?? "" });
    });
  } else {
    reset();
    router.push("/");
    router.refresh();
  }
};
