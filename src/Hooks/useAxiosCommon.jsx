import axios from "axios"

export const axiosCommon = axios.create({
  baseURL: "https://listings-hub-server.vercel.app",
});

export default function useAxiosCommon() {
 return axiosCommon;
}
