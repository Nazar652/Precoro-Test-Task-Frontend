import axios from "axios";
import {host} from "../global/globalVariables.js";
import getCsrf from "@/scripts/auth/getCsrf.js";
import eventBus from "@/scripts/global/eventBus.js";

export const deleteFromCart = async (id) => {
    const url = `${host}/api/cart/${id}/`;
    const response = await axios.delete(url,
        {
            withCredentials: true,
            headers: {
                ...getCsrf
            }
        });

    eventBus.eventName = "cart-deleted";
    return response.data;
}