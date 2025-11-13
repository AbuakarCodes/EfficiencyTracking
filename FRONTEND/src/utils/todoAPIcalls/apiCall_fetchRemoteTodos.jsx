import axios from "axios"
import { Credentials } from "../axios_Credentials"
import { specificDateTodos_URL } from "../../../API_EndPoints"

export async function apiCall_fetchRemoteTodos(
  API_dateID,
  setisTodoLoding,
  setspecificDateEfficiency
) {
  try {
    setisTodoLoding(true)
    const response = await axios.post(
      specificDateTodos_URL,
      { date_id: API_dateID.current },
      Credentials
    )

    const RemoteTodo = response?.data?.data?.goals || []

    setspecificDateEfficiency(response?.data?.data?.efficiency || 0)

    setisTodoLoding(false)
    return RemoteTodo
  } catch (error) {
    setspecificDateEfficiency(0)
    setisTodoLoding(false)
    return []
  }
}
