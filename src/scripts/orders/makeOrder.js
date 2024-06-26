import axios from "axios";
import { host } from "../global/globalVariables.js";
import eventBus from "@/scripts/global/eventBus.js";
import getCsrf from "@/scripts/auth/getCsrf.js";

export const makeOrder = async () => {
    const url = `${host}/api/make-order/`;
    console.log(document.cookie)
    console.log(getCsrf)
    const response = await axios.post(url,
        {},
        {
            withCredentials: true,
            headers: {
                ...getCsrf
            },
        })
    eventBus.eventName = "order-made";
    return response.data;
}