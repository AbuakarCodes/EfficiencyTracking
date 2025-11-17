import dotenv from "dotenv";
dotenv.config();

import { dbConnection } from "../src/db/dbConection.js";
import { app } from "../src/app.js";
import { Route } from "../src/Router/userRouter.js";
import { TodoRoute } from "../src/Router/TodoRouter.js";
import { EfficiencyRoute } from "../src/Router/EfficiencyRouter.js";

const response = await dbConnection();

app.use("/users", Route);
app.use("/todos", TodoRoute);
app.use("/eficiency", EfficiencyRoute);

app.get("/", (req, res) => {
  res.send("ok", response);
});

export default app;
