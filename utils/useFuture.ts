import { useEffect, useState } from "react";

export default function useFuture(
  service: (value: any | undefined) => Promise<any>
) {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<Boolean>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setIsLoading(true);
    const result = service(undefined);
    result
      .then((res) => setData(res))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [service]);

  return { isLoading, data, error };
}
