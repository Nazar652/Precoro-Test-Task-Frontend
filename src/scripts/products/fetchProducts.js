import axios from "axios";
import { host } from "../global/globalVariables.js";

export const fetchProducts = async (data) => {
    let url = `${host}/api/products/`;
    let query = '';
    let isFirst = true;
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (!isFirst) {
                query += '&';
            } else {
                isFirst = false;
            }
            query += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
        }
    }
    if (query) {
        url += '?' + query;
    }
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}