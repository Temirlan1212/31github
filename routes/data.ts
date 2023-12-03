export interface IChildRoute {
  title: string;
  link: string;
  type: "link" | "menu";
  role?: "user" | "notary";
  icon?: string;
  bottomDivider?: boolean;
}

export interface IRoute extends Omit<IChildRoute, "type"> {
  type: IChildRoute["type"] | "group";
  children?: IChildRoute[];
}

export const isRoutesIncludesPath = (routeList: IRoute[], path: string): boolean => {
  return routeList.filter((r) => r.link.includes(path) || (r.link.length > 1 && path.includes(r.link))).length > 0;
};
