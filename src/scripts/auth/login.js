import axios from 'axios';
import { host } from '../global/globalVariables.js';

export const login = async (userData) => {
    const url = `${host}/auth/login/`;
    const response = await axios.post(
        url,
        userData,
        {
            withCredentials: true
        }
    );
    return response.data;
}