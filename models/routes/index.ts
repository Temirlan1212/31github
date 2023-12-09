export type IRoles = "user" | "admin" | "visitor";

export interface IChildRouteData {
  icon: string;
  activeRoutes: string[];
}

export interface IChildRoute extends Partial<IChildRouteData> {
  title: string;
  path: string;
  role: IRoles;
}

export interface IChildRouteDefault extends IChildRoute {
  type: "link";
}

export interface IChildRouteGroup extends IChildRoute {
  type: "group";
  children: IChildRoute[];
  bottomDivider?: boolean;
}

export type IRouteProps = IChildRouteDefault | IChildRouteGroup;
