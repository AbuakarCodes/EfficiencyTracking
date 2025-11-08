import express from "express"
import {  PeriodEfficiencyController } from "../Controllers/EfficiencyControllers/PeriodEfficiencyController.js"
import { auth } from "../middleware/Auth.middleware.js"

const EfficiencyRoute = express.Router()

EfficiencyRoute.post("/periodEfficiency",auth ,PeriodEfficiencyController)



export { EfficiencyRoute }