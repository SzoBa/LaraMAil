import { useState, useEffect } from "react";
import axios from "axios";

export const useGetData = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState([]);

  const getData = async () => {
    const response = await axios(url);
    setFetchedData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getData().catch((error) => console.error(error));
  }, [url]);

  return [isLoading, fetchedData];
};
