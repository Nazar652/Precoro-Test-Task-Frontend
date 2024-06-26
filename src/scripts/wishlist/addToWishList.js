import axios from "axios";
import { host } from "../global/globalVariables.js";
import getCsrf from "@/scripts/auth/getCsrf.js";

export const addToWishList = async (product_id) => {
    const url = `${host}/api/wishlist/`;
    const response = await axios.post(url,
        {
            product_id: product_id
        },
        {
            headers: {
                ...getCsrf
            },
            withCredentials: true
        });
    return response.data;
}