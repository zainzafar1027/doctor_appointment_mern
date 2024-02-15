import { useEffect, useState } from "react";
import { token } from "../config";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const modifiedToken = token.replace(/[\/"]/g, "");

        const res = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${modifiedToken}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            // Handle unauthorized error (e.g., redirect to login)
            throw new Error("Unauthorized");
          }
          const result = await res.json();
          throw new Error(result.message || "Request failed");
        }

        const result = await res.json();

        setData(result.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    };
    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetchData;
