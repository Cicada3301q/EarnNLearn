import { useEffect, useState } from "react";
import { METHOD } from "../constants/enums";

export const useQuery = (route: string) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
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
      setError(true);
      console.error(`FETCH ERROR: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, error, loading };
};
