import axios from "axios";
import { host } from "../global/globalVariables.js";
import getCsrf from "../auth/getCsrf.js";

export const newComment = async (productId, text) => {
    const url = `${host}/api/comments/`;
    const response = await axios.post(
        url,
        {
            product_id: productId,
            text: text
        },
        {
            headers: {
                ...getCsrf
            },
            withCredentials: true
        }
    );
    return response.data;
}