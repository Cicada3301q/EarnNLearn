import { useState } from "react";
import { HTTP_METHOD } from "../constants/enums";

interface MutateProps {
  route: string;
  method: HTTP_METHOD;
  body?: any;
  options: {
    onSuccess?: (data: any) => {};
    onError?: (data: any) => {};
    onSettled?: () => {};
  };
}

export const useMutation = () => {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async ({ route, method, body, options = {} }: MutateProps) => {
    const { onSuccess, onError, onSettled } = options;
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.API_BASE}/api/${route}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        if (onSuccess) onSuccess(data);
      } else {
        setIsError(true);
        if (onError) onError(data);
      }
    } catch (error) {
      setIsError(true);
      console.error(`FETCH ERROR: ${error}`);
      if (onError) onError(error);
    } finally {
      setIsLoading(false);
      if (onSettled) onSettled();
    }
  };

  return { mutate, isSuccess, isError, isLoading };
};
