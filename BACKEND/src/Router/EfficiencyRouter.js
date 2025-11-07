import express from "express"
import { monthEfficiencyController } from "../Controllers/EfficiencyControllers/perMonthEfficiency.js"
import { auth } from "../middleware/Auth.middleware.js"

const EfficiencyRoute = express.Router()

EfficiencyRoute.post("/perMonth",auth ,monthEfficiencyController)



export { EfficiencyRoute }