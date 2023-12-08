import * as React from "react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { HTMLAttributes } from "react";
import { IRoles } from "@/models/routes";

export interface IDefineNavigationProps extends HTMLAttributes<HTMLDivElement> {
  role: IRoles;
}

export async function DefineNavigation(props: IDefineNavigationProps) {
  const session = await getServerSession(options);
  const routesRole = props?.role;
  const serverRole = session?.user?.role?.name;

  if (routesRole === "visitor") {
    return <>{props.children}</>;
  }

  if (serverRole === "admin" && routesRole === "user") {
    return <>{props.children}</>;
  }

  if (routesRole === serverRole) {
    return <>{props.children}</>;
  } else {
    return null;
  }
}
