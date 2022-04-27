import generateGetMocks from "../../core/utils/generateGetMocks";
import { ENDPOINT_CHARACTER_MORTY } from "../endpoints";
import mockGetMorty from "./mockGetMorty.json";

export const getMocks = generateGetMocks({
  getMorty: {
    method: "get",
    endpoint: ENDPOINT_CHARACTER_MORTY,
    data: {
      status: { ...mockGetMorty?.status },
      data: { ...mockGetMorty?.data },
    },
  },
});

export default getMocks;
