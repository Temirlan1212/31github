import { IRouteProps } from "@/models/routes";

export enum AppRoutes {
  MAIN = "dashboard",
  CONTACTS = "contacts",
  PRODUCTS = "products",
  PRODUCTS_EDIT = "products-edit",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "dashboard",
  [AppRoutes.CONTACTS]: "dashboard/contacts",
  [AppRoutes.PRODUCTS]: "dashboard/products",
  [AppRoutes.PRODUCTS_EDIT]: "dashboard/products/edit",
};

export const routesList: Partial<Record<AppRoutes, IRouteProps>> = {
  // [AppRoutes.MAIN]: {
  //   title: "Dashboard",
  //   path: RoutePath.dashboard,
  //   type: "link",
  //   role: "admin",
  // },
  [AppRoutes.PRODUCTS]: {
    title: "Products",
    path: RoutePath.products,
    type: "link",
    role: "admin",
    activeRoutes: [
      RoutePath.products,
      RoutePath["products-edit"],
      `${RoutePath["products-edit"]}/*`,
    ].map((route) => `/${route}`),
  },
  [AppRoutes.CONTACTS]: {
    title: "Contacts",
    path: RoutePath.contacts,
    type: "link",
    role: "admin",
  },
};

export const routes = Object.values(routesList);
