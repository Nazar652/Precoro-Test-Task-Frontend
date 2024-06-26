import axios from "axios";
import { host } from "../global/globalVariables.js";

export const checkAuthentication = async () => {
    const url = `${host}/auth/check/`;
    const response = await axios.get(
        url,
        {
            withCredentials: true
        }
    );
    return response.data;
}