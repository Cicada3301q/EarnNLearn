import { useContext, useEffect, useState } from "react";
import { METHOD } from "../constants/enums";
import { QueryContext } from "../context/QueryContextProvider";

export const useQuery = (key: string, route: string) => {
  const { queryKeys } = useContext(QueryContext);

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
  }, [queryKeys[key]]);

  return { data, isError, isLoading };
};
