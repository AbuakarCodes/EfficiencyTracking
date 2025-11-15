import express from "express"
import { auth } from "../middleware/Auth.middleware.js"
import { PeriodEfficiencyController } from "../Controllers/EfficiencyControllers/PeriodEfficiencyController.js"
import { ComparePeriodEffiencyController } from "../Controllers/CompareEfficiencyControllers/ComparePeriodEffiencyController.js"
import { AllTimeEfficiency } from "../Controllers/EfficiencyControllers/AllTimeEfficiencyController.js"

const EfficiencyRoute = express.Router()

EfficiencyRoute.post("/periodEfficiency", auth, PeriodEfficiencyController)
EfficiencyRoute.post("/ComparisionPeriodEfficiency", auth, ComparePeriodEffiencyController)
EfficiencyRoute.get("/AllTimeEfficiency", auth, AllTimeEfficiency)



export { EfficiencyRoute }