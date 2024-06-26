import axios from "axios";
import { host } from "../global/globalVariables.js";

export const fetchCsrf = async () => {
    const url = `${host}/auth/csrf/`;
    const response = await axios.get(
        url,
        {
            withCredentials: true
        }
    );
    return response.data;
}