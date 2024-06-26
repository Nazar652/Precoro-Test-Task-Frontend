import axios from "axios";
import { host } from "../global/globalVariables.js";

export const fetchComments = async (productId) => {
    const url = `${host}/api/comments/?product_id=${productId}`;
    const response = await axios.get(url);
    return response.data;
}