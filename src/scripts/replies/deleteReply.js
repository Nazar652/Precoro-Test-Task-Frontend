import axios from "axios";
import { host } from "../global/globalVariables.js";
import getCsrf from "@/scripts/auth/getCsrf.js";

export const deleteReply = async (replyId) => {
    const url = `${host}/api/replies/${replyId}/`;
    const response = await axios.delete(url,
        {
            headers: {
                ...getCsrf
            },
            withCredentials: true
        });
    return response.data;
}