import { HTTP_METHOD } from "../constants/enums";

export const callApi = async (
  apiRoute: string,
  method: HTTP_METHOD,
  body?: any
) => {
  try {
    return await fetch(`${process.env.API_BASE}${apiRoute}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });
  } catch (error) {
    console.error(`FETCH ERROR: ${error}`);
  }
};
