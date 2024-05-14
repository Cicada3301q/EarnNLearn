import { useEffect, useState } from "react";
import { METHOD } from "../constants/enums";

export const useQuery = (route: string) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.API_BASE}/api/${route}`, {
        method: METHOD.GET,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setData(data);
      }
    } catch (error) {
      setIsError(true);
      console.error(`FETCH ERROR: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, isError, isLoading };
};
