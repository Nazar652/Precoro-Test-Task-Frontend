import axios from "axios";
import { host } from "../global/globalVariables.js";
import eventBus from "@/scripts/global/eventBus.js";
import getCsrf from "@/scripts/auth/getCsrf.js";

export const fetchCart = async () => {
    const url = `${host}/api/cart/`;
    const response = await axios.get(url, {
        headers: {
            ...getCsrf
        },
        withCredentials: true });
    eventBus.eventName = "cart-fetched";
    return response.data;
}