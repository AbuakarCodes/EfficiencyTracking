import dotenv from "dotenv";
dotenv.config();

import { dbConnection } from "../src/db/dbConection.js";
import { app } from "../src/app.js";
import { Route } from "../src/Router/userRouter.js";
import { TodoRoute } from "../src/Router/TodoRouter.js";
import { EfficiencyRoute } from "../src/Router/EfficiencyRouter.js";

(async function () {
  try {
    await dbConnection();
    if (String(process.env?.IS_LOCAL_HOST) === "true") {
      app.listen(8000)
      console.log("server is runing on localhost 👍 : 8000")
    }
  } catch (error) {
       console.log("❌ MongoDB connection failed:", error?.message)
  }
})()


app.use("/users", Route);
app.use("/todos", TodoRoute);
app.use("/eficiency", EfficiencyRoute);

app.get("/", (req, res) => {
  res.send("ok", response);
});



export default app;
