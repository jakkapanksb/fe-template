import { AxiosResponse } from "axios";
import axiosInstance from "../core/axiosInstance";
import { ENDPOINT_CHARACTER_MORTY } from "./endpoints";
import { GetMorty } from "./types/GetMorty";

async function getMorty(): Promise<AxiosResponse<GetMorty>> {
  return axiosInstance.get(ENDPOINT_CHARACTER_MORTY);
}

export default getMorty;
