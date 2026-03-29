import { Router } from "express";
import levelRouter from "./level.router";
import gameRouter from "./game.router"
import playerRouter from "./player.router"
import adminRouter from "./admin.router"

const indexRouter = Router();

indexRouter.use("/levels", levelRouter);
indexRouter.use("/game", gameRouter);
indexRouter.use("/player", playerRouter);

indexRouter.use("/admin", adminRouter);

export default indexRouter;
