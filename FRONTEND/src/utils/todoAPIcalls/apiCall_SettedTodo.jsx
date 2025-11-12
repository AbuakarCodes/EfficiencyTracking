import axios from "axios"
import { settedTodoDates_URL } from "../../../API_EndPoints"
import { Credentials } from "../axios_Credentials"

export async function apiCall_SettedTodo() {
  try {
    const response = await axios.get(settedTodoDates_URL, Credentials)
    return response
  } catch (error) {
    throw error
  }
}
