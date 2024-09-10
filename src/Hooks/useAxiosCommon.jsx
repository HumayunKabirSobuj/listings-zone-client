import axios from "axios"

export const axiosCommon = axios.create({
  baseURL: "http://localhost:5000",
});

export default function useAxiosCommon() {
 return axiosCommon;
}
