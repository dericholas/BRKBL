import express from "express";

import mediaRouter from "./api/v1/mediaRouter.js";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import userDataRouter from "./api/v1/userDataRouter.js";
import currentUserRouter from "./api/v1/currentUserRouter.js";
import followRouter from "./api/v1/followRouter.js"

const rootRouter = new express.Router();

rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/media", mediaRouter);
rootRouter.use("/api/v1/user-profile", userDataRouter)
rootRouter.use("/api/v1/current-user", currentUserRouter)
rootRouter.use("/api/v1/follows", followRouter)

// place your server-side routes here

export default rootRouter;
