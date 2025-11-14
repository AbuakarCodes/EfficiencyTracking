import axios from "axios"
import { Credentials } from "../axios_Credentials"

export async function fetch_Efficiency_API(url, data) {
  try {
    const response = await axios.post(url, data, Credentials)
    return response
  } catch (error) {
   throw error
  }
}
