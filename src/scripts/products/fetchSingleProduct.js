import axios from "axios";
import { host } from "../global/globalVariables.js";

export const fetchSingleProduct = async (id) => {
    const url = `${host}/api/products/${id}/`;
    const response = await axios.get(url);
    return response.data;
}