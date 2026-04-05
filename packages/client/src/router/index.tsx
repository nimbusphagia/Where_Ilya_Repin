import { createBrowserRouter } from "react-router"
import { RootLayout } from "../layouts/RootLayout";
import { Menu } from "../pages/Menu/Menu";
import { MenuLoader } from "../pages/Menu/Menu.loader";
import { MenuAction } from "../pages/Menu/Menu.action";
import { GameLoader } from "../pages/Game/Game.loader";
import { GameAction } from "../pages/Game/Game.action";
import { ErrorPage } from "../pages/Error/Error";
import { GameWrapper } from "../pages/Game/GameWrapper";

export const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: RootLayout,
      ErrorBoundary: ErrorPage,
      children: [
        {
          index: true,
          Component: Menu,
          loader: MenuLoader,
          action: MenuAction,
        },
        {
          path: 'game/:id',
          loader: GameLoader,
          action: GameAction,
          Component: GameWrapper,
        },
      ]
    }
  ]
);
