import axios from "axios";
import { host } from "../global/globalVariables.js";

export const fetchCategories = async () => {
    const url = `${host}/api/categories/`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}