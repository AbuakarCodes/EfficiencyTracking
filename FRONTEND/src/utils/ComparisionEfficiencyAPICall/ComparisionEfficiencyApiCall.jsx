import axios from "axios"
import { Credentials } from "../axios_Credentials"

export async function apiCall_getComparisionData(url, data) {
  try {
    const response = await axios.post(url, data, Credentials)
    return response
  } catch (error) {
    console.log(error?.message, "Something went Wrong")
  }
}
