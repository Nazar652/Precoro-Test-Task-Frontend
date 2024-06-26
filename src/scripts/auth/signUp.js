import axios from 'axios';
import { host } from '../global/globalVariables.js';

export const signUp = async (userData) => {
    const url = `${host}/api/users/`;
    const response = await axios.post(url, userData);
    return response.data;
}