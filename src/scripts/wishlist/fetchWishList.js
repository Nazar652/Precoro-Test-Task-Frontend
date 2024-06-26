import axios from "axios";
import { host } from "../global/globalVariables.js";

export const fetchWishList = async () => {
    const url = `${host}/api/wishlist/`;
    const response = await axios.get(url,
        {
            withCredentials: true
        });
    return response.data;
}