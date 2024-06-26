import axios from 'axios';
import { host } from '../global/globalVariables.js';
import getCsrf from "@/scripts/auth/getCsrf.js";

export const logout= async (userData) => {
    const url = `${host}/auth/logout/`;
    try {
        const response = await axios.post(
            url,
            {},
            {
                withCredentials: true,
                headers: {
                    ...getCsrf,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        return error;
    }
}