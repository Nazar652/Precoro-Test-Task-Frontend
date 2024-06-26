import axios from "axios";
import { host } from "../global/globalVariables.js";

export const fetchSingleCategory = async (category) => {
    const url = `${host}/api/categories/${category}/`
    const response = await axios.get(
        url,
    );
    return response.data;
}