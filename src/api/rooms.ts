import axios from "./axios";

export const getRooms = () => {
  return axios.get("http://localhost:5281/api/ruangan");
};
