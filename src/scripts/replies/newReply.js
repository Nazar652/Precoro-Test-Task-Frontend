import axios from "axios";
import { host } from "../global/globalVariables.js";
import getCsrf from "@/scripts/auth/getCsrf.js";

export const newReply = async (commentId, text) => {
    const url = `${host}/api/replies/`;
    const response = await axios.post(url,
        {
            comment_id: commentId,
            text: text
        },
        {
            headers: {
                ...getCsrf
            },
            withCredentials: true
        });
    return response.data;
}