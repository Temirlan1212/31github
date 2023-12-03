import * as React from "react";
import { UserAuthForm } from "./RegisterForm";
import { UserCreateForm } from "./components/user-create-form";

interface RegisterProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Register({ className, ...props }: RegisterProps) {
  return (
    <div className="container max-w-[600px] h-[100vh] flex items-center">
      <UserCreateForm />
    </div>
  );
}
