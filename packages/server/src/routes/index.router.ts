import { Router } from "express";
import levelRouter from "./level.router.js";
import gameRouter from "./game.router.js"
import playerRouter from "./player.router.js"
import adminRouter from "./admin.router.js"

const indexRouter = Router();

indexRouter.use("/levels", levelRouter);
indexRouter.use("/game", gameRouter);
indexRouter.use("/player", playerRouter);

indexRouter.use("/admin", adminRouter);

export default indexRouter;
