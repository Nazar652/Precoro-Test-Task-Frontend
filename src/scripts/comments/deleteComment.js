import axios from "axios";
import { host } from "../global/globalVariables.js";
import getCsrf from "@/scripts/auth/getCsrf.js";

export const deleteComment = async (commentId) => {
    const url = `${host}/api/comments/${commentId}/`;
    const response = await axios.delete(url,
        {
            headers: {
                ...getCsrf
            },
            withCredentials: true
        });
    return response.data;
}