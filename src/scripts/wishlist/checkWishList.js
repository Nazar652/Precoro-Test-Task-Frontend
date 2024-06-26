import axios from "axios";
import { host } from "../global/globalVariables.js";

export const checkWishList = async (productId) => {
    const url = `${host}/api/wishlist/?product_id=${productId}`;
    const response = await axios.get(url,
        {
            withCredentials: true
        });
    if (response.data.length > 0) {
        return response.data[0].id;
    } else {
        return null;
    }
}