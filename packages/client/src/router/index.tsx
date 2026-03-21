import { createBrowserRouter } from "react-router"
import { RootLayout } from "../layouts/RootLayout";
import { Menu } from "../pages/Menu/Menu";
import { MenuLoader } from "../pages/Menu/Menu.loader";
import { MenuAction } from "../pages/Menu/Menu.action";
import { Game } from "../pages/Game/Game";
import { GameLoader } from "../pages/Game/Game.loader";
import { GameAction } from "../pages/Game/Game.action";

export const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: RootLayout,
      children: [
        {
          index: true,
          Component: Menu,
          loader: MenuLoader,
          action: MenuAction,
        },
        {
          path: 'game/:mapId',
          Component: Game,
          loader: GameLoader,
          action: GameAction,
        }
      ],
    }
  ]
);
