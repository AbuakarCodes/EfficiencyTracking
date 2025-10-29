import axios from "axios"
import { Credentials } from "../axios_Credentials"
import { changeStatusTodo_URL } from "../../../API_EndPoints"

export async function apiCall_changeTodoState(API_dateID, id, newState) {
  try {
    const data = { date_id: API_dateID.current[0], goal_id: id, newState }
    const response = await axios.post(changeStatusTodo_URL, data, Credentials)
  } catch (error) {
    console.log(
      error?.message || "something went wrong on Change Todo state todo"
    )
  }
}
