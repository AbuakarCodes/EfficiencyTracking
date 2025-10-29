import dotenv from "dotenv";
dotenv.config();
import { dbConnection } from "./db/dbConection.js";
import { app } from "./app.js";
import { Route } from "./Router/userRouter.js"
import { TodoRoute } from "./Router/TodoRouter.js";

dbConnection()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => { console.log(`server has started sucessfull at port ${process.env.PORT}`) })
    })
    .catch((err) => {
        console.log("error while starting the server", err.message)
    })


app.use("/users", Route)
app.use("/todos", TodoRoute)