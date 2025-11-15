import axios from "axios"
import { AllTimeEfficiency_URL } from "../../../API_EndPoints"
import { Credentials } from "../axios_Credentials"

export async function fetch_ALLTimeEfficiency(setallTimeEfficiencyVal) {
  try {
    const response = await axios.get(AllTimeEfficiency_URL, Credentials)
    setallTimeEfficiencyVal(response?.data?.data?.avrageEfficiency?.toString() || 0)
    return response
  } catch (error) {
    throw error
  }
}
