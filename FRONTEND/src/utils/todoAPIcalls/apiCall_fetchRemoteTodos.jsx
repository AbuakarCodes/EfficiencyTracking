import axios from "axios"
import { Credentials } from "../axios_Credentials"
import { specificDateTodos_URL } from "../../../API_EndPoints"

export async function apiCall_fetchRemoteTodos(setspecificDateEfficiency) {
  try {
    const response = await axios.post(
      specificDateTodos_URL,
      { date_id: "2025/10/29" },
      Credentials
    )
    const RemoteTodo = response?.data?.data?.goals || []
    setspecificDateEfficiency(response?.data?.data?.dayEfficiency || 0)
    return { RemoteTodo }
  } catch (error) {
    console.log(error?.message || "something went wrong on fetch todo")

    return []
  }
}
