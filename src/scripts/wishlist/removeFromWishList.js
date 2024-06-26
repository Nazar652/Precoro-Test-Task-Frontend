import axios from "axios";
import { host } from "../global/globalVariables.js";
import getCsrf from "@/scripts/auth/getCsrf.js";

export const removeFromWishList = async (wishId) => {
    const url = `${host}/api/wishlist/${wishId}/`;
    const response = await axios.delete(url,
        {
            headers: {
                ...getCsrf
            },
            withCredentials: true
        });
    return response.data;
}