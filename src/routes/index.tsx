import { RouteObject } from "react-router-dom";
import Home from "../pages/home";
import SaleTarget from "../pages/sale-target";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sale-target",
    element: <SaleTarget />,
  },
];

export default routes;
