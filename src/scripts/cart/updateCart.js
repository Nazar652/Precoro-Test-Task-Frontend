import axios from "axios";
import {host} from "../global/globalVariables.js";
import getCsrf from "@/scripts/auth/getCsrf.js";
import eventBus from "@/scripts/global/eventBus.js";

export const updateCart = async (id, data) => {
    const url = `${host}/api/cart/${id}/`;
    const response = await axios.patch(url, data,
        {
            headers: {
                ...getCsrf,
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });

    eventBus.eventName = "cart-updated";
    return response.data;
}