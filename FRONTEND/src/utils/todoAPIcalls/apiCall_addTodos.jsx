import axios from "axios";
import { Credentials } from "../axios_Credentials";

export async function apiCall_addTodos(url, data, setspecificDateEfficiency) {
    try {
        const response = await axios.post(url, data, Credentials)
        setspecificDateEfficiency(response?.data?.data?.dayEfficiency|| 0)
        return response
    } catch (error) {
        return []
    }
}