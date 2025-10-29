import axios from "axios"
import { Credentials } from "../axios_Credentials"
import { DeleteTodo_URL } from "../../../API_EndPoints"

export async function apiCall_deleteTodo(API_dateID, id) {
  try {
    const data = { date_id: API_dateID.current[0], goal_id: id }
    const response = await axios.post(DeleteTodo_URL, data, Credentials)
  } catch (error) {
    console.log(error?.message || "something went wrong on delete todo")
  }
}
