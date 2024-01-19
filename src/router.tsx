/*
 * @Date: 2024-01-19 17:50:04
 * @Description: description
 */
// ./src/router.tsx
import Home from "@/pages/Home";
import Demo from "@/pages/Demo";

interface IRouter {
  path: string;
  element: JSX.Element;
}

const router: Array<IRouter> = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/demo",
    element: <Demo />,
  },
];

export default router;