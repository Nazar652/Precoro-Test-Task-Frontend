import axios from "axios";
import {host} from "../global/globalVariables.js";
import getCsrf from "@/scripts/auth/getCsrf.js";
import eventBus from "@/scripts/global/eventBus.js";

export const newCart = async (data) => {
    const url = `${host}/api/cart/`;
    const response = await axios.post(
        url,
        data,
        {
            withCredentials: true,
            headers: {
                ...getCsrf,
                'Content-Type': 'application/json'
            }
        }
    );
    eventBus.eventName = "cart-created";
    return response.data;
}