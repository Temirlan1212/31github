import { IRouteProps } from "@/models/routes";

export enum AppRoutes {
  MAIN = "dashboard",
  PRODUCTS = "products",
  PRODUCTS_CREATE = "products-create",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "dashboard",
  [AppRoutes.PRODUCTS]: "dashboard/products",
  [AppRoutes.PRODUCTS_CREATE]: "dashboard/products/create",
};

export const routesList: Partial<Record<AppRoutes, IRouteProps>> = {
  [AppRoutes.MAIN]: {
    title: "Dashboard",
    path: RoutePath.dashboard,
    type: "link",
    role: "admin",
  },
  [AppRoutes.PRODUCTS]: {
    title: "Products",
    path: RoutePath.products,
    type: "link",
    role: "admin",
    activeRoutes: [RoutePath.products, RoutePath["products-create"]].map((route) => `/${route}/*`),
  },
};

export const routes = Object.values(routesList);
