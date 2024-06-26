import axios from "axios";
import { host } from "../global/globalVariables.js";

export const fetchReplies = async (commentId) => {
    const url = `${host}/api/replies/?comment_id=${commentId}`;
    const response = await axios.get(url);
    return response.data;
}