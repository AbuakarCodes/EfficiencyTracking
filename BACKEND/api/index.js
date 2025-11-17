import dotenv from "dotenv";
dotenv.config();

import { dbConnection } from "../src/db/dbConection.js";
import { app } from "../src/app.js";
import { Route } from "../src/Router/userRouter.js";
import { TodoRoute } from "../src/Router/TodoRouter.js";
import { EfficiencyRoute } from "../src/Router/EfficiencyRouter.js";

await dbConnection(); 

app.use("/users", Route);
app.use("/todos", TodoRoute);
app.use("/eficiency", EfficiencyRoute);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});


if (process.env.IS_LOCAL_HOST === "true") {
  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`Server running locally at http://localhost:${port}`));
}

export default app;
