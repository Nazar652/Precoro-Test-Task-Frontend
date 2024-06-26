import axios from "axios";
import { host } from "../global/globalVariables.js";
import getCsrf from "../auth/getCsrf.js";

export const fetchOrders = async () => {
    const url = `${host}/api/orders/`;
    const response = await axios.get(
        url,
        {
            headers: {
                ...getCsrf
            },
            withCredentials: true
        }
    );
    return response.data;
}