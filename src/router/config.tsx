import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import MenuColombo from "../pages/menu-colombo/page";
import MenuGalle from "../pages/menu-galle/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/menu-colombo",
    element: <MenuColombo />,
  },
  {
    path: "/menu-galle",
    element: <MenuGalle />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
