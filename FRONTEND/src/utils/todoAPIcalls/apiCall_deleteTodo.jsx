import axios from "axios"
import { Credentials } from "../axios_Credentials"
import { DeleteTodo_URL } from "../../../API_EndPoints"

export async function apiCall_deleteTodo(
  API_dateID,
  id,
  setspecificDateEfficiency
) {
  try {
    const data = { date_id: API_dateID.current, goal_id: id }
    const response = await axios.post(DeleteTodo_URL, data, Credentials)
    setspecificDateEfficiency(response?.data?.data?.dayEfficiency || 0)
  } catch (error) {
    console.log(error?.message || "something went wrong on delete todo")
  }
}
