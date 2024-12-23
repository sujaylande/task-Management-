import { io } from "socket.io-client";
import { base_url } from "./utils/base_url";

const URL = base_url;

export const socket = io(URL);
