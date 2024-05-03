import { METHOD } from "../constants/enums";

export const callApi = async (
  apiRoute: string,
  method: METHOD,
  contentType: string,
  body?: any
) => {
  return await fetch(`${process.env.API_BASE}${apiRoute}`, {
    method: method,
    headers: {
      "Content-Type": contentType,
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
};
